## Alloy
Alloy API Integration Project
This project integrates with the Alloy API to submit application data and evaluate the outcome. The project consists of a React frontend that captures user data and an Express backend that handles the communication with the Alloy API.



## Features
Capture user data through a web form
Validate input data before submission
Submit application data to Alloy API
Display evaluation results (Approved, Manual Review, Denied)

## Tech Stack
Frontend: React, Axios, CSS
Backend: Node.js, Express, Axios, dotenv
API: Alloy API

## Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 14 or later)
npm
A GitHub account
Alloy API credentials (API Key and Secret)

## Installation
Clone the repository:
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name


# Install backend dependencies:

npm install

# Install frontend dependencies:

cd client
npm install
cd ..

# Set up environment variables:

Create a .env file in the root directory and add your Alloy API credentials:
ALLOY_API_KEY=your_api_key
ALLOY_API_SECRET=your_api_secret


## Running the Application

# Backend
Start the Express server:

node index.js
The server will start on http://localhost:5000.

# Frontend
Start the React development server:

cd client
npm start
The frontend will be available at http://localhost:3000.

## Testing
# Fill out the form:

Navigate to http://localhost:3000, fill out the form with valid data, and submit.

# Check the results:

After submission, you will receive a response indicating whether the application was approved, denied, or requires manual review.

## Project Structure

|-- client/                 # Frontend (React) code
|   |-- public/             # Public assets
|   |-- src/                # Source code
|   |   |-- App.js          # Main React component
|   |   |-- App.css         # Styles for the app
|   |-- package.json        # Frontend dependencies and scripts
|
|-- index.js                # Backend (Express) server
|-- .env                    # Environment variables (not committed to version control)
|-- package.json            # Backend dependencies and scripts
|-- README.md               # Project documentation


## API Endpoints
POST /api/submit

Submits the form data to the Alloy API and returns the evaluation result.

Request Body:

{
  "name_first": "John",
  "name_last": "Doe",
  "addressLine1": "123 Main St",
  "addressLine2": "Apt 4B",
  "address_city": "New York",
  "address_state": "NY",
  "address_postal_code": "10001",
  "address_country_code": "US",
  "document_ssn": "123-45-6789",
  "email_address": "john.doe@example.com",
  "birth_date": "1990-01-01"
}


# Response:

json
Copy code
{
  "summary": {
    "outcome": "Approved"
  }
}
