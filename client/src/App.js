// src/App.js

import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file for styling

function App() {
    // Initialize form data state with empty strings
    const [formData, setFormData] = useState({
        name_first: '',
        name_last: '', // Validate this field for specific values
        addressLine1: '',
        addressLine2: '',
        address_city: '',
        address_state: '',
        address_postal_code: '',
        address_country_code: 'US', // Default country code
        document_ssn: '',
        email_address: '',
        birth_date: '' // Date of Birth
    });

    // State to store messages for user feedback
    const [message, setMessage] = useState('');

    // Handle change in form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the formData state with the new value
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        // Validate date format as YYYY-MM-DD
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(formData.birth_date)) {
            setMessage('Date of Birth must be in YYYY-MM-DD format.');
            return; // Exit if date format is invalid
        }

        // Check if the birth_date is before January 1, 2011
        const minDate = new Date('2011-01-01');
        const inputDate = new Date(formData.birth_date);
        if (inputDate > minDate) {
            setMessage('Date of Birth cannot be after January 1, 2011.');
            return; // Exit if date is too early
        }

        // Check if last_name is one of the valid options
        const validLastnames = ['review', 'approved', 'deny'];
        if (!validLastnames.includes(formData.name_last.toLowerCase())) {
            setMessage('Last Name must be one of the following: review, approved, deny.');
            return; // Exit if last_name is invalid
        }

        // Validate SSN (should be exactly 9 digits or in the format XXX-XX-XXXX)
        const ssnPattern = /^(\d{3}-\d{2}-\d{4}|\d{9})$/;
        if (!ssnPattern.test(formData.document_ssn)) {
            setMessage('SSN must be in the format XXX-XX-XXXX or be a 9-digit number.');
            return; // Exit if SSN is invalid
        }

        // Validate email address format
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email_address)) {
            setMessage('Please enter a valid email address.');
            return; // Exit if email address is invalid
        }

        try {
            // Send form data to the server
            const response = await axios.post('http://localhost:5000/api/submit', formData);
            const outcome = response.data.summary.outcome;

            // Set message based on server response
            if (outcome === 'Approved') {
                setMessage('Success! 🎉🎉🎉 Your application has been approved.');
            } else if (outcome === 'Manual Review') {
                setMessage('Thanks for submitting your application, we’ll be in touch shortly.');
            } else if (outcome === 'Denied') {
                setMessage('Sorry, we regret to inform you that your application was not successful.');
            }
        } catch (error) {
            // Handle any errors during submission
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div className="app-container">
            <div className="app-content">
                <header className="app-header">
                    <img src="https://img.icons8.com/?size=100&id=77055&format=png&color=000000" alt="Company Logo" className="logo" />
                    <h1>KYC BANK</h1>
                </header>
                <main className="app-main">
                    <h2>Welcome to the KYC Bank Onboarding Form</h2>
                    <h4>Please fill the form below and keep an eye out for the form validation errors</h4>

                    <form onSubmit={handleSubmit}>
                        {/* Input fields for the form */}
                        <input 
                            type="text" 
                            name="name_first" 
                            placeholder="First Name" 
                            value={formData.name_first} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="name_last" 
                            placeholder="Last Name" 
                            value={formData.name_last} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="addressLine1" 
                            placeholder="Address Line 1" 
                            value={formData.addressLine1} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="addressLine2" 
                            placeholder="Address Line 2" 
                            value={formData.addressLine2} 
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="address_city" 
                            placeholder="City" 
                            value={formData.address_city} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address_state" 
                            placeholder="State (2-letter code)" 
                            value={formData.address_state} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address_postal_code" 
                            placeholder="ZIP Code" 
                            value={formData.address_postal_code} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="address_country_code" 
                            placeholder="Country" 
                            value={formData.address_country_code} 
                            readOnly // Country code is read-only
                        />
                        <input 
                            type="text" 
                            name="document_ssn" 
                            placeholder="SSN" 
                            value={formData.document_ssn} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="email" 
                            name="email_address" 
                            placeholder="Email Address" 
                            value={formData.email_address} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="date" 
                            name="birth_date" 
                            placeholder="Date of Birth" 
                            value={formData.birth_date} 
                            onChange={handleChange} 
                            required 
                            min="1900-01-01"  // Set a reasonable minimum date
                            max={new Date().toISOString().split('T')[0]}  // Set max date to today
                        />
                        <button type="submit">Submit</button> {/* Submit button */}
                    </form>
                    <p>{message}</p> {/* Display message to the user */}
                </main>
            </div>
        </div>
    );
}

export default App;
