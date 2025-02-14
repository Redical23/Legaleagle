'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const LAWYERSTEMP = ({ users }) => {
  const router = useRouter();

  // Shuffle users array
  const shuffleArray = (array) => {
    const shuffled = array.slice(); // Create a copy of the array
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const shuffledUsers = shuffleArray(users);

  const handleCardClick = (user) => {
    router.push(`/userid/${user._id}`); // Navigate to dynamic route using user._id
    console.log(user);
  };

  return (
    <div className="lawyer-grid">
      {shuffledUsers.map(user => (
        <div onClick={() => handleCardClick(user)} className="lawyer-card" key={user._id}>
          <div className="lawyer-image">
            <img
              src={user.avatar}
              alt="User avatar"
            />
            <span className="status-tag">{user.location}</span>
          </div>
          <div className="lawyer-info">
            <div className="lawyer-header">
              <h3>{user.name}</h3>
              <div className="rating">
                <span className="rating-number">4.5</span>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <p className="specialization">{user.specialization}</p>
            <div className="experience-info">
              <span>{user.yearsexp} Years Experience</span>
              <span>•</span>
              <span>${user.charge}/hour</span>
            </div>
            <div className="consultation">
              <button className="consult-btn">Schedule Consultation</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LAWYERSTEMP;
