from __future__ import print_function
import os
import fitz
import re
import time
import nltk
import pandas as pd
import logging
from docx import Document
from datetime import datetime
from prettytable import PrettyTable
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from loguru import logger
from pyresparser import ResumeParser
from billiard import Pool, cpu_count
import cloudmersive_virus_api_client
from cloudmersive_virus_api_client.rest import ApiException

nltk.download('stopwords')
nltk.download('punkt')
nltk.download('wordnet')

# Virus scanning functions
def scan_one_file(input_file, api_key, retry_time):
    configuration = cloudmersive_virus_api_client.Configuration()
    configuration.api_key['Apikey'] = api_key
    api_instance = cloudmersive_virus_api_client.ScanApi(cloudmersive_virus_api_client.ApiClient(configuration))

    restrict_file_types = '.doc,.docx,.pdf'
    allow_executables = False
    allow_invalid_files = False
    allow_scripts = True
    allow_password_protected_files = True
    allow_macros = True
    allow_xml_external_entities = False
    allow_insecure_deserialization = False
    allow_html = False

    try:
        api_response = api_instance.scan_file_advanced(
            input_file,
            allow_executables=allow_executables,
            allow_invalid_files=allow_invalid_files,
            allow_scripts=allow_scripts,
            allow_password_protected_files=allow_password_protected_files,
            allow_macros=allow_macros,
            allow_xml_external_entities=allow_xml_external_entities,
            allow_insecure_deserialization=allow_insecure_deserialization,
            allow_html=allow_html
        )
        return api_response.clean_result

    except ApiException as e:
        logger.info(f"Exception when calling Cloudmersive API -> scan_file_advanced: {e}\n")
        if retry_time < 5:
            time.sleep(1)
            return scan_one_file(input_file, api_key, retry_time + 1)
        else:
            logger.warning(f"Failed to scan file: {input_file}")
            return False

def scan_all_files_in_repository(cv_folder_path, all_valid_files, api_key):
    files_without_problem = []
    for file_name in all_valid_files:
        file_path = os.path.join(cv_folder_path, file_name)
        scan_result = scan_one_file(file_path, api_key, 0)
        if scan_result:
            files_without_problem.append(file_name)
    return files_without_problem

# File reading functions
def read_docx(file_path):
    doc = Document(file_path)
    full_text = [para.text for para in doc.paragraphs]
    return '\n'.join(full_text)

def read_doc(file_path):
    result = os.popen(f'antiword "{file_path}"').read()
    return result

def read_pdf(file_path):
    text = ""
    with fitz.open(file_path) as pdf:
        for page in pdf:
            text += page.get_text()
    return text

# Text processing and extraction functions
def lemmatize(text):
    lemmatizer = WordNetLemmatizer()
    stop_words = set(stopwords.words('english'))
    words = nltk.word_tokenize(text)
    filtered_words = [word.lower() for word in words if word.isalnum() and word.lower() not in stop_words]
    lemmatized_words = [lemmatizer.lemmatize(word) for word in filtered_words]
    return ' '.join(lemmatized_words)

def extract_experience_details(text):
    experience_pattern = re.compile(
        r'(?P<role>[^\n,]+?)\s*[\n-]*\s*(?P<company>[^\n]+?)\s*[\n-]*\s*(?P<start_date>(\w+\s\d{4})|(\d{2}/\d{4}))\s*[-–to]+\s*(?P<end_date>(\w+\s\d{4})|(\d{2}/\d{4})|Present|Current|Summer \d{4})',
        re.IGNORECASE)
    matches = experience_pattern.finditer(text)
    experience_details = []
    total_months = 0
    start_time = time.time()

    for match in matches:
        if time.time() - start_time > 60:
            print("Processing time exceeded 60 seconds.")
            break

        role = match.group('role').strip()
        company = match.group('company').strip()
        start_date = match.group('start_date').strip()
        end_date = match.group('end_date').strip()

        start = parse_date(start_date)
        if not start:
            continue

        end = datetime.now() if end_date.lower() in ['present', 'current', 'summer'] else parse_date(end_date)
        if not end:
            continue

        months = (end.year - start.year) * 12 + (end.month - start.month)
        total_months += months
        years = round(months / 12, 1)
        experience_details.append(f"{role} at {company} - {years} years")

    return experience_details, total_months

def extract_education(text):
    pattern = re.compile(r"(?i)(?:Bsc|\bB\.\w+|\bM\.\w+|\bPh\.D\.\w+|\bBachelor(?:'s)?|\bMaster(?:'s)?|\bPh\.D)\s(?:\w+\s)*\w+")
    matches = pattern.findall(text)
    education = ''
    if matches:
        education = ''.join(matches[0]).strip()
    return education

# Resume processing function
def process_resume(file_path):
    full_text = ''
    name = ''
    designation = ''
    experience = ''
    education = ''
    skills = ''

    cv_file = os.path.basename(file_path)

    try:
        if not file_path.lower().endswith(('.pdf', '.docx', '.doc')):
            return name, designation, experience, skills, education
        else:
            logger.info(f"Processing file: {file_path}")

            # Determine file type and extract text accordingly
            if file_path.lower().endswith('.pdf'):
                full_text = read_pdf(file_path)
            elif file_path.lower().endswith('.docx'):
                full_text = read_docx(file_path)
            elif file_path.lower().endswith('.doc'):
                full_text = read_doc(file_path)

        data = ResumeParser(file_path).get_extracted_data()

        # Extract name, designation, skills, full_experience
        name = data.get('name', 'Unknown')
        education = extract_education(full_text)

        designation = data.get('designation', 'Unknown')
        if designation != 'Unknown' and designation:
            designation = ' '.join(designation)
        elif designation == None:
            designation = ''
        else:
            designation = ''

        skills = data.get('skills', [])
        if skills != []:
            skills = ' '.join(skills)
        else:
            skills = ''

        experience_details, total_months = extract_experience_details(full_text)
        total_years = round(total_months / 12, 1)

        if experience_details:
            experience = ' '.join(experience_details)
        else:
            experience = ''
        total_years =  " Total Years of Experience: " + str(total_years)
        experience = experience + total_years

        # Additional cleanup: Remove bullet points and other unwanted characters
        unwanted_chars = ["•", "●", "▪", "§", "\n", "\r", "○"]
        for char in unwanted_chars:
            name = (name or '').replace(char, "").strip()
            designation = (designation or '').replace(char, "").strip()
            experience = (experience or '').replace(char, "").strip()
            education = (education or '').replace(char, "").strip()
            skills = (skills or '').replace(char, "").strip()

        # Remove 'Email' from the name field if present
        if 'email' in name.lower():
            name = re.split(r'\s+', name, 1)[0]

    except Exception as e:
        logger.error(f"Error processing file {file_path}: {e}")

    finally:
        return cv_file, full_text, name, designation, experience, education, skills

# Processing CVs with multiprocessing
def process_cvs_in_chunks(cv_files, cv_folder_path, chunk_size=100):
    results = []
    for i in range(0, len(cv_files), chunk_size):
        chunk_files = cv_files[i:i + chunk_size]
        file_paths = [os.path.abspath(os.path.join(cv_folder_path, f)) for f in chunk_files]
        with Pool(cpu_count()) as p:
            chunk_results = p.map(process_resume, file_paths)
        results.extend(chunk_results)
    return results

def process_cvs_multiprocess(cv_folder_path):
    nltk.download('punkt')
    nltk.download('averaged_perceptron_tagger')
    nltk.download('wordnet')

    if not os.path.isdir(cv_folder_path):
        logging.warning("Access to the CV folder is invalid. Please check the path.")
        return

    all_files = os.listdir(cv_folder_path)
    valid_files = [f for f in all_files if f.endswith(('.pdf', '.docx', '.doc'))]

    # Virus scan
    cloudmersive_api_key = os.getenv('CLOUDMERSIVE_API_KEY')
    safe_files = scan_all_files_in_repository(cv_folder_path, valid_files, cloudmersive_api_key)

    # Process safe CVs
    logger.info("Start processing CVs...")
    results = process_cvs_in_chunks(safe_files, cv_folder_path)
    
    file_names = []
    cv_texts = []
    names = []
    designations = []
    experiences = []
    educations = []
    skills_list = []

    for result in results:
        file_name, cv_text, name, designation, experience, education, skills = result
        file_names.append(file_name)
        cv_texts.append(cv_text)
        names.append(name)
        designations.append(designation)
        experiences.append(experience)
        educations.append(education)
        skills_list.append(skills)

    # Creating a DataFrame
    cvs_df = pd.DataFrame({
        "File Name": file_names,
        "Text": cv_texts,
        "Name": names,
        "Designation": designations,
        "Experience": experiences,
        "Education": educations,
        "Skills": skills_list
    })

    return cvs_df

# Similarity calculation
def calculate_similarity_scores(cvs, sample_jd):
    vectorizer = TfidfVectorizer()
    corpus = [sample_jd] + cvs
    tfidf_matrix = vectorizer.fit_transform(corpus)
    similarity_scores = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    return similarity_scores
