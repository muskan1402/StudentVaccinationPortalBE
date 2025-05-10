#  School Vaccination Portal
A full-stack web application that enables school administrators to manage student vaccination data, organize vaccination drives, and generate health-related reports efficiently.

##  Features
-  **Admin Login** – Secure authentication for admins only.
-  **Dashboard** – View total students, vaccinations percentage, and upcoming vaccination drive.
-  **Student Management** – Add, edit, delete, and list student records.
-  **Vaccination Drive** – Schedule and manage vaccination programs.
-  **Reports** – Generate and download vaccination summary reports.

##  Project Structure
vaccination_portal/
│
├── backend/
│ └── app.py # Main Flask application
│
├── vaccination_portal/
│ ├── src/
│ │ ├── components/ # All React components
│ │ ├── App.js
│ │ ├── App.css
│ │ ├── index.js
│ │ └── index.css
│ └── public/
│
├── App.test.js # Frontend tests
└── README.md

## Tech Stack
**Frontend:**
- React
- React Router DOM
- Axios
  
**Backend:**
- Flask (Python)
- Flask-CORS
  
**Database:**
- PostgreSQL

### Setup Instructions

## Backend (Flask + PostgreSQL)
1. Navigate to the backend directory:
   ```bash
   cd backend
2. Create and activate a virtual environment:
python -m venv venv
source venv/bin/activate     # On Windows: venv\Scripts\activate
3. Install dependencies:
pip install -r requirements.txt
4. Update your PostgreSQL connection string in app.py:
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://username:password@localhost/dbname'
5. Start the Flask server:
python app.py

## Frontend (React)
1.Navigate to the React frontend directory:
cd vaccination_portal
2.Install Node modules:
npm install
3.Start the React app:
npm start
4.The app should now be available at:
http://localhost:3000

## Testing (Frontend)
Frontend tests use React Testing Library:
npm test
Example App.test.js

### License
This project is open-source and available under the MIT License.

### Author
Name- Muskan Kumari

Full Stack Developer at Virtusa

M.Tech (Software Systems) @ BITS Pilani WILP

