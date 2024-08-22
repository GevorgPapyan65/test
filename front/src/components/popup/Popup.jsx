import React, { useState } from 'react';
import axios from 'axios';
import './popup.css';

const Popup = ({ closeForm, onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    lastname: '',
    surname: '',
    organization: '',
    birthday: '',
    email: '',
    phone: '',
    password: '',
    photo: null // Add photo field
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === 'photo') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0] // Handle file input
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('fullname', formData.fullname);
    formDataToSend.append('lastname', formData.lastname);
    formDataToSend.append('surname', formData.surname);
    formDataToSend.append('organization', formData.organization);
    formDataToSend.append('birthday', formData.birthday);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('phone', formData.phone);
    formDataToSend.append('password', formData.password);
    if (formData.photo) formDataToSend.append('file', formData.photo); // Append file
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        setSuccess(data.message || 'Registration successful!');
        setError(null);
        setFormData({
          fullname: '',
          lastname: '',
          surname: '',
          organization: '',
          birthday: '',
          email: '',
          phone: '',
          password: '',
          photo: null // Reset photo
        });
  
        if (typeof onRegisterSuccess === 'function') {
          onRegisterSuccess(formData.fullname); // Pass the username to the parent
        }
      } else {
        setError(data.error || 'Failed to register');
        setSuccess(null);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error occurred while registering.');
      setSuccess(null);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h2 className="popup-title">Register</h2>
        <form onSubmit={handleSubmit} className="popup-form">
          <label className="popup-label">
            Username:
            <input
              type="text"
              name="fullname"
              placeholder='Username'
              value={formData.fullname}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            First Name:
            <input
              type="text"
              name="lastname"
              placeholder='First Name'
              value={formData.lastname}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Surname:
            <input
              type="text"
              name="surname"
              placeholder='Surname'
              value={formData.surname}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Organization Name:
            <input
              type="text"
              name="organization"
              placeholder='Organization Name'
              value={formData.organization}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Founded Date:
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Email:
            <input
              type="email"
              name="email"
              placeholder='example@gmail.com'
              value={formData.email}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Phone:
            <input
              type="text"
              name="phone"
              placeholder='+374 11 111111'
              value={formData.phone}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Password:
            <input
              type="password"
              placeholder='XXXXXXXXX'
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="popup-input"
              required
            />
          </label>
          <label className="popup-label">
            Photo:
            <input
              type="file"
              name="photo"
              onChange={handleChange}
              className="popup-input"
            />
          </label>
          <button type="submit" className="popup-submit-button">Register</button>
        </form>
        {error && <p className="popup-error">{error}</p>}
        {success && <p className="popup-success">{success}</p>}
        <button onClick={closeForm} className="popup-close-button">Close</button>
      </div>
    </div>
  );
};

export default Popup;
