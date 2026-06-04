import React from 'react';

export const SkeletonCard = () => (
  <div className="skeleton-card-v30">
    <div className="skeleton-line" style={{ width: '30%', marginTop: '30px' }}></div>
    <div className="skeleton-line" style={{ width: '60%', height: '24px', margin: '20px' }}></div>
    <div className="skeleton-line" style={{ width: '80%' }}></div>
    <div className="skeleton-line" style={{ width: '40%' }}></div>
  </div>
);
