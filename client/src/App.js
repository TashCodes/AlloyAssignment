// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
    const [formData, setFormData] = useState({
        name_first: '',
        name_last: '',
        addressLine1: '',
        addressLine2: '',
        address_city: '',
        address_state: '',
        address_postal_code: '',
        address_country_code: 'US',
        document_ssn: '',
        email_address: '',
        birth_date: '' // Date of Birth
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate date format YYYY-MM-DD
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(formData.birth_date)) {
            setMessage('Date of Birth must be in YYYY-MM-DD format.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/submit', formData);
            const outcome = response.data.summary.outcome;

            if (outcome === 'Approved') {
                setMessage('Success! 🎉 Your application has been approved.');
            } else if (outcome === 'Manual Review') {
                setMessage('Thanks for submitting your application, we’ll be in touch shortly.');
            } else if (outcome === 'Deny') {
                setMessage('Sorry, your application was not successful.');
            }
        } catch (error) {
            setMessage('An error occurred. Please try again later.');
        }
    };

    return (
        <div>
            <h1>Application Form</h1>
            <form onSubmit={handleSubmit}>
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
                    readOnly 
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
                <button type="submit">Submit</button>
            </form>
            <p>{message}</p>
        </div>
    );
}

export default App;
