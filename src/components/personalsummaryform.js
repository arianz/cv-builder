import React from 'react';

const PersonalSummaryForm = ({ cvData, handleChange }) => {
  return (
    <div className="container">
      <div className="p-4">
        <h2 className="h4 fw-bold text-primary text-center my-4">Personal Summary</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={cvData.name || ''}
              onChange={(e) => handleChange(e, 'personalSummary')}
              className="form-control form-control-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={cvData.email || ''}
              onChange={(e) => handleChange(e, 'personalSummary')}
              className="form-control form-control-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label fw-medium">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={cvData.phone || ''}
              onChange={(e) => handleChange(e, 'personalSummary')}
              className="form-control form-control-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="summary" className="form-label fw-medium">Professional Summary</label>
            <textarea
              id="summary"
              name="summary"
              placeholder="Write a brief professional summary"
              value={cvData.summary || ''}
              onChange={(e) => handleChange(e, 'personalSummary')}
              className="form-control form-control-lg shadow-sm"
              rows="5"
              required
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalSummaryForm;