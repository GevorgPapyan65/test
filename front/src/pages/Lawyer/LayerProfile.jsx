import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './layerprofile.css';
import { useParams } from 'react-router-dom';

export default function LayerProfile() {
  const { userId } = useParams(); // Extract userId from route parameters
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(response.data);
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Error fetching user data');
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if (error) return <div>{error}</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        {/* Use the photoPath directly from the database */}
        <img 
          src={user.photoPath || 'default-avatar.png'} 
          alt={`${user.fullname} ${user.lastname}`} 
          className="profile-avatar" 
        />
        <div className="profile-info">
          <h1>{user.fullname} {user.lastname}</h1>
          <p>{user.organization}</p>
          <p>{user.email}</p>
          <p>{user.phone}</p>
        </div>
      </div>

      <div className="profile-details">
        <h2>Contact Information</h2>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Birthday: {new Date(user.birthday).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
