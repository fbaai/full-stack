from flask import Flask
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from extensions import db
from auth import auth_bp
from cv import cv_bp
from models import User
import os
from dotenv import load_dotenv
from config import Config

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

if not os.getenv('FRONTEND_URL'):
    raise ValueError("FRONTEND_URL required in .env")

# Enable CORS
CORS(app, resources={r"/*": {"origins": os.getenv('FRONTEND_URL')}})

# Configuration using environment variables
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')
app.config.from_object(Config)

# Check if DATABASE_URI is correctly set
if not app.config['SQLALCHEMY_DATABASE_URI']:
    raise ValueError("No DATABASE_URI set for SQLAlchemy.")

# Initialize extensions
db.init_app(app)
login_manager = LoginManager(app)
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(auth_bp, url_prefix='/auth')
app.register_blueprint(cv_bp, url_prefix='/cv')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Define the route for the root URL
@app.route('/')
def home():
    return "FBA Project"

if __name__ == '__main__':
    app.run(debug=True)