# auth.py
from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from extensions import db  # Import db from extensions
from models import User
from flask_cors import CORS, cross_origin
import os
from dotenv import load_dotenv
auth_bp = Blueprint('auth', __name__)

load_dotenv()
@auth_bp.route('/register', methods=['POST'])
@cross_origin(origin=os.getenv('FRONTEND_URL'))
def register():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password') or not data.get('confirm_password') or not data.get('first_name'):
        return jsonify({'message': 'Email, first name, password, and confirm password required'}), 400

    email = data['email']
    first_name = data['first_name']
    password = data['password']
    confirm_password = data['confirm_password']

    if password != confirm_password:
        return jsonify({'message': 'Passwords do not match'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 409

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, first_name=first_name, password=hashed_password)
    
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
@cross_origin(origin=os.getenv('FRONTEND_URL'))
def login():
    data = request.get_json()

    if not data or not data.get('email') or not data.get('password'):
        return jsonify({'message': 'Email and password required'}), 400

    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return jsonify({'message': 'Invalid credentials'}), 401

    login_user(user)
    access_token = create_access_token(identity={'email': user.email})

    return jsonify({'message': 'Logged in successfully', 'access_token': access_token}), 200

@auth_bp.route('/logout', methods=['POST'])
@cross_origin(
    origin=os.getenv('FRONTEND_URL'),  # Ensure this matches the frontend's URL
    supports_credentials=True  # Allow credentials to be included in the request
)
def logout():
    logout_user()
    return jsonify({'message': 'Logged out successfully'}), 200

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hello, {current_user["email"]}! This is a protected route.'}), 200
