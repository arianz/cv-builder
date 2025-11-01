import React from 'react';
import '../index.css';

const PersonalSummaryForm = ({ cvData, handleChange }) => {
  return (
    <div className="p-3 p-md-5">
      {/* Gradient Title */}
      <div className="text-center mb-5">
        <h2
          className="h3 fw-bold"
          style={{
            background: 'linear-gradient(90deg, #6a1b9a, #8e24aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Personal Summary
        </h2>
      </div>

      <form>
        {/* Full Name */}
        <div className="mb-4">
          <label className="form-label fw-medium text-light mb-3 d-flex align-items-center">
            <i className="bi bi-person-fill me-2 text-purple"></i> Full Name
          </label>
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            name="name"
            value={cvData.name || ''}
            onChange={(e) => handleChange(e, 'personalSummary')}
            placeholder="Enter your full name"
            style={{
              borderRadius: '14px',
              backgroundColor: '#1e1e2d',
              border: '2px solid #6a1b9a',
              color: '#e0e0e0',
              transition: 'all 0.3s ease',
              fontSize: '1.1rem',
            }}
            onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
            onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="form-label fw-medium text-light mb-3 d-flex align-items-center">
            <i className="bi bi-envelope-fill me-2 text-purple"></i> Email
          </label>
          <input
            type="email"
            className="form-control form-control-lg shadow-sm"
            name="email"
            value={cvData.email || ''}
            onChange={(e) => handleChange(e, 'personalSummary')}
            placeholder="Enter your email"
            style={{
              borderRadius: '14px',
              backgroundColor: '#1e1e2d',
              border: '2px solid #6a1b9a',
              color: '#e0e0e0',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
            onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="form-label fw-medium text-light mb-3 d-flex align-items-center">
            <i className="bi bi-telephone-fill me-2 text-purple"></i> Phone
          </label>
          <input
            type="text"
            className="form-control form-control-lg shadow-sm"
            name="phone"
            value={cvData.phone || ''}
            onChange={(e) => handleChange(e, 'personalSummary')}
            placeholder="Enter your phone number"
            style={{
              borderRadius: '14px',
              backgroundColor: '#1e1e2d',
              border: '2px solid #6a1b9a',
              color: '#e0e0e0',
              transition: 'all 0.3s ease',
            }}
            onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
            onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
          />
        </div>

        {/* Professional Summary */}
        <div className="mb-4">
          <label className="form-label fw-medium text-light mb-3 d-flex align-items-center">
            <i className="bi bi-file-text-fill me-2 text-purple"></i> Professional Summary
          </label>
          <div className="position-relative">
            <textarea
              name="summary"
              value={cvData.summary || ''}
              onChange={(e) => handleChange(e, 'personalSummary')}
              placeholder="Write a brief professional summary..."
              className="form-control shadow-sm"
              rows="6"
              maxLength={500}
              style={{
                borderRadius: '14px',
                backgroundColor: '#1e1e2d',
                border: '2px solid #6a1b9a',
                color: '#e0e0e0',
                resize: 'none',
                transition: 'all 0.3s ease',
                padding: '1rem',
                fontSize: '1rem',
              }}
              onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
              onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
            />
            <small
              className="position-absolute bottom-0 end-0 p-2"
              style={{
                color: (cvData.summary?.length || 0) > 450 ? '#ff6b6b' : '#bbbbbb',
                fontWeight: '500',
              }}
            >
              {(cvData.summary?.length || 0)}/500
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PersonalSummaryForm;