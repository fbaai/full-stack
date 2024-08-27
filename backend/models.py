# models.py
from flask_login import UserMixin
from extensions import db  # Import db from extensions

class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    first_name = db.Column(db.String(80), nullable=False)
    password = db.Column(db.String(200), nullable=False)
class CVAnalysis(db.Model):
    __tablename__ = 'cv_analysis'
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(255), nullable=True)
    context_score = db.Column(db.Float, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Updated table name
    name = db.Column(db.String(255), nullable=True)
    designation = db.Column(db.String(255), nullable=True)
    experience = db.Column(db.String(255), nullable=True)
    education = db.Column(db.String(255), nullable=True)
    skills = db.Column(db.String(255), nullable=True)
    salary_expectation = db.Column(db.String(255), nullable=True)
    description = db.Column(db.Text, nullable=True)
    professional_title = db.Column(db.String(255), nullable=True)
    years_of_experience = db.Column(db.String(255), nullable=True)

    def __init__(self, file_name, context_score, user_id, name, designation, experience, education, skills, salary_expectation, description, professional_title, years_of_experience):
        self.file_name = file_name
        self.context_score = context_score
        self.user_id = user_id
        self.name = name
        self.designation = designation
        self.experience = experience
        self.education = education
        self.skills = skills
        self.salary_expectation = salary_expectation
        self.description = description
        self.professional_title = professional_title
        self.years_of_experience = years_of_experience