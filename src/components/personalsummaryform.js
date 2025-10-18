import React from 'react';

const PersonalSummaryForm = ({ cvData, handleChange }) => {
  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-primary text-center my-3">Personal Summary</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Full Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Full Name"
          value={cvData.name || ''}
          onChange={(e) => handleChange(e, 'personalSummary')}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={cvData.email || ''}
          onChange={(e) => handleChange(e, 'personalSummary')}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          placeholder="Phone"
          value={cvData.phone || ''}
          onChange={(e) => handleChange(e, 'personalSummary')}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="summary" className="form-label">Professional Summary</label>
        <textarea
          id="summary"
          name="summary"
          placeholder="Professional Summary"
          value={cvData.summary || ''}
          onChange={(e) => handleChange(e, 'personalSummary')}
          className="form-control"
          rows="4"
        />
      </div>
    </div>
  );
};

export default PersonalSummaryForm;