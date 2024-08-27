setup mysql and use the myapp_db.sql file to import the database in your mysql environment

backend is in backend directory which is based on python flask run it first:

1. navigate to backend:
cd backend
2. Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate   # On Windows, use `venv\Scripts\activate`
3. Install dependencies:
pip install -r requirements.txt

4. Create a .env file in the root directory.
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key

Update the database configuration:

Ensure your MySQL database is running.
Modify app.py with your database credentials.

5. Run the Flask app:
flask run



frontend is in integrated-fba-frontend-main folder its in react to run it do the following:

1. Navigate to the React project directory:

cd frontend/
2. Install dependencies:

npm install

3. Set up environment variables:

Create a .env file in the react-app directory or rename the file .env.example to .env then:
Add the following variable:
REACT_APP_BACKEND_URL=http://127.0.0.1:5000


4. Run the React app:

npm start

