# Alloy API Integration Project
This project integrates with the Alloy API to submit application data and evaluate the outcome. The project consists of a React frontend that captures user data and an Express backend that handles the communication with the Alloy API.


# Features
- Capture user data through a web form
- Validate input data before submission
- Submit application data to Alloy API
- Display evaluation results (Approved, Manual Review, Denied)

# Tech Stack
* **Frontend**: React, Axios, CSS
* **Backend**: Node.js, Express, Axios, dotenv
* **API**: Alloy API

# Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version 14 or later)
- npm
- Alloy API credentials (API Key and Secret)

# Installation
- Clone the repository:
    - git clone https://github.com/TashCodes/Alloy.git
    - cd Alloy

### Install backend dependencies:

- npm install

#### Install frontend dependencies:

- cd client
- npm install
- cd ..

### Set up environment variables:

- Create a .env file in the root directory and add your Alloy API credentials:
    - ALLOY_API_KEY=your_api_key
    - ALLOY_API_SECRET=your_api_secret


## Running the Application

### Backend
- Start the Express server:

    - node index.js
    - The server will start on http://localhost:5000.

#### Frontend
- Start the React development server:

    - cd client
    - npm start
    - The frontend will be available at http://localhost:3000.

## Testing

### Fill out the form:

Navigate to http://localhost:3000, fill out the form with valid data, and submit.

### Check the results:

After submission, you will receive a response indicating whether the application was approved, denied, or requires manual review.

## Project Structure

The project is organized as follows:
- **backend/**: Contains all backend-related code.

- **client/**: Contains all frontend-related code and assets.
  - **public/**: Directory for static files that are served as-is.
  - **src/**: Directory for React components and styles.
    - **App.js**: Main component where the application logic resides.
    - **App.css**: CSS file for styling the application.
  - **package.json**: Manages frontend dependencies and scripts.

- **index.js**: Entry point for the backend server, handles API requests and communication with the Alloy API.

- **.env**: Stores environment variables like API credentials. This file should not be committed to version control for security reasons.

- **package.json**: Manages backend dependencies and scripts.

- **README.md**: Project documentation and instructions.

This structure provides a clear overview of how the project is organized and where to find various components and files.


## API Endpoints
- POST /api/submit
- Submits the form data to the Alloy API and returns the evaluation result.

### Request Body:

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


### Expected Response:
-  Approved - 
{
  "summary": {
    "outcome": "Approved"
  }
}

- Manual Review - 
{
  "summary": {
    "outcome": "Manual Review"
  }
}
- Denied - 
{
  "summary": {
    "outcome": "Denied"
  }
}
