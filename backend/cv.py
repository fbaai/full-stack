from flask import Blueprint, request, jsonify, current_app
from flask_login import login_required, current_user
from flask_cors import CORS, cross_origin
import os
import logging
from werkzeug.utils import secure_filename
from utils import process_cv_file, calculate_context_score, allowed_file, calculate_skill_score, calculate_experience_score
from models import CVAnalysis
from app import db
from flask_jwt_extended import jwt_required
# Configure logging
logging.basicConfig(level=logging.DEBUG)

cv_bp = Blueprint('cv', __name__)

@cv_bp.route('/upload', methods=['POST'])
@jwt_required()
def upload_cv():
    logging.debug('Entering upload_cv function')

    if 'file' not in request.files:
        logging.debug('No file part in request')
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    job_title = request.form.get('job_title')

    if file.filename == '':
        logging.debug('No selected file')
        return jsonify({"error": "No selected file"}), 400

    if not job_title:
        logging.debug('No job title provided')
        return jsonify({"error": "No job title provided"}), 400

    if file and allowed_file(file.filename, {'pdf', 'docx', 'doc'}):
        filename = secure_filename(file.filename)
        file_path = os.path.join(current_app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        logging.debug(f'File saved at: {file_path}')

        file_name, text, name, designation, experience, education, skills = process_cv_file(file_path, filename)

        if name is None:
            logging.debug('Failed to extract information from CV')
            return jsonify({"error": "Failed to extract information from CV"}), 400

        combined_text = f"{text} {name} {experience} {skills}"
        context_score = calculate_context_score(job_title, combined_text)
        logging.debug(f'Context score calculated: {context_score}')

        if current_user.is_authenticated:
            cv_analysis = CVAnalysis(
                file_name=file_name,
                context_score=context_score * 100,
                user_id=current_user.id,
                name=name or "",
                designation=designation or "",
                experience=experience or "",
                education=education or "",
                skills=skills or "",
                salary_expectation="",
                description="",
                professional_title=job_title,
                years_of_experience=""
            )
            db.session.add(cv_analysis)
            db.session.commit()
            logging.debug('CV analysis saved to database')

        response = {
            "file_name": file_name,
            "context_score": context_score * 100,
            "name": name or "",
            "designation": designation or "",
            "experience": experience or "",
            "education": education or "",
            "skills": skills or "",
            "salary_expectation": "",
            "description": "",
            "professional_title": job_title,
            "years_of_experience": ""
        }
        logging.debug('Returning JSON response')
        return jsonify(response), 200

    else:
        logging.debug('Invalid file type')
        return jsonify({"error": "Invalid file type"}), 400

@cv_bp.route('/add', methods=['POST'])
@jwt_required()
def manual_upload_cv():
    logging.debug('Entering manual_upload_cv function')
    data = request.json
    full_name = data.get('name')
    skills = data.get('skills')
    years_of_experience = data.get('yoe')
    salary_expectation = data.get('salaryExpectations')
    description = data.get('jd')
    professional_title = None  #Disabled because it is not requested in frontend

    if not all([full_name, skills, years_of_experience, salary_expectation, description]):
        logging.debug('Missing required fields in request')
        return jsonify({"error": "Missing required fields"}), 400

    if current_user.is_authenticated:
        cv_analysis = CVAnalysis(
            file_name=None,
            context_score=None,
            user_id=current_user.id,
            name=full_name,
            designation=professional_title,
            experience=years_of_experience,
            education=None,
            skills=skills,
            salary_expectation=salary_expectation,
            description=description,
            professional_title=professional_title,
            years_of_experience=years_of_experience
        )
        db.session.add(cv_analysis)
        db.session.commit()
        logging.debug('Manual CV analysis saved to database')

    response = {
        "full_name": full_name,
        "skills": skills,
        "years_of_experience": years_of_experience,
        "salary_expectation": salary_expectation,
        "description": description,
        "professional_title": professional_title
    }
    logging.debug('Returning JSON response for manual upload')
    return jsonify(response), 200

@cv_bp.route('/analyze', methods=['POST'])
@jwt_required()
def analyze_resumes():
    logging.debug('Entering analyze_resumes function')

    sample_jd = request.args.get('sample_jd')
    if not sample_jd:
        logging.debug('No job description provided')
        return jsonify({"error": "No job description provided"}), 400

    # Get all CVs in the uploads folder
    upload_folder = current_app.config['UPLOAD_FOLDER']
    files = [f for f in os.listdir(upload_folder) if allowed_file(f, {'pdf', 'docx', 'doc'})]
    
    scores = []

    for file_name in files:
        file_path = os.path.join(upload_folder, file_name)
        try:
            _, text, name, designation, experience, education, skills = process_cv_file(file_path, file_name)

            if name is None:
                logging.warning(f"Skipping file due to extraction failure: {file_name}")
                continue

            # Calculate skill score
            skill_score = calculate_skill_score(skills, sample_jd)

            # Calculate experience score (assume job description includes experience requirements)
            experience_score = calculate_experience_score(experience, sample_jd)

            # Composite score
            composite_score = (skill_score + experience_score) / 2 if (skill_score and experience_score) else 0

            scores.append({
                "file_name": file_name,
                "context_score": composite_score * 100,  # Assuming composite score is the desired context score
                "name": name,
                "designation": designation,
                "experience": experience,
                "education": education,
                "skills": skills
            })
        except Exception as e:
            logging.error(f"Error processing file {file_name}: {e}")

    # Sort by composite score in descending order and get top 5
    top_scores = sorted(scores, key=lambda x: x['context_score'], reverse=True)[:5]

    logging.debug('Returning top 5 CVs based on analysis')
    return jsonify(top_scores), 200
