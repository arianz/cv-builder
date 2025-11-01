import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import '../index.css';

const EducationForm = ({ cvData, handleChange, addItem, removeItem, toggleCollapse }) => {
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
          Education
        </h2>
      </div>

      {/* Education Entries */}
      {cvData.length > 0 ? (
        cvData.map((item, index) => (
          <div
            key={index}
            className="card mb-4 shadow-sm border-0"
            style={{
              background: 'linear-gradient(145deg, #1e1e2d, #1a1a2a)',
              borderRadius: '16px',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div
              className="card-header d-flex justify-content-between align-items-center py-3 px-4 cursor-pointer"
              style={{
                background: 'rgba(106, 27, 154, 0.3)',
                borderBottom: '1px solid rgba(142, 36, 170, 0.2)',
              }}
              onClick={() => toggleCollapse('education', index)}
            >
              <h3 className="h6 mb-0 fw-medium text-light">
                Education {index + 1}: {item.field || 'Untitled'}
              </h3>
              <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-sm btn-link text-light p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse('education', index);
                  }}
                >
                  {item.collapsed ? <FaPlus /> : <FaMinus />}
                </button>
                <button
                  className="btn btn-sm btn-link text-danger p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem('education', index);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Body */}
            {!item.collapsed && (
              <div className="card-body p-4">
                {/* Field of Study */}
                <div className="mb-4">
                  <label className="form-label text-light fw-medium d-flex align-items-center mb-2">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="field"
                    value={item.field || ''}
                    onChange={(e) => handleChange(e, 'education', index)}
                    placeholder="e.g., Computer Science"
                    className="form-control form-control-lg"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#2a2a3a',
                      border: '2px solid #6a1b9a',
                      color: '#e0e0e0',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
                    onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
                  />
                </div>

                {/* Institution */}
                <div className="mb-4">
                  <label className="form-label text-light fw-medium d-flex align-items-center mb-2">
                    Institution Name
                  </label>
                  <input
                    type="text"
                    name="institution"
                    value={item.institution || ''}
                    onChange={(e) => handleChange(e, 'education', index)}
                    placeholder="e.g., Harvard University"
                    className="form-control form-control-lg"
                    style={{
                      borderRadius: '12px',
                      backgroundColor: '#2a2a3a',
                      border: '2px solid #6a1b9a',
                      color: '#e0e0e0',
                      transition: 'all 0.3s ease',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
                    onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
                  />
                </div>

                {/* Dates */}
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-light fw-medium mb-2">
                      Start Year
                    </label>
                    <input
                      type="text"
                      name="startYear"
                      value={item.startYear || ''}
                      onChange={(e) => handleChange(e, 'education', index)}
                      placeholder="e.g., 2018"
                      className="form-control form-control-lg"
                      style={{
                        borderRadius: '12px',
                        backgroundColor: '#2a2a3a',
                        border: '2px solid #6a1b9a',
                        color: '#e0e0e0',
                        transition: 'all 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
                      onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
                    />
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="form-label text-light fw-medium mb-2">
                      End Year
                    </label>
                    <div className="position-relative">
                      <input
                        type="text"
                        name="endYear"
                        value={item.isPresent ? 'Present' : item.endYear || ''}
                        onChange={(e) => handleChange(e, 'education', index)}
                        disabled={item.isPresent}
                        placeholder="e.g., 2022"
                        className="form-control form-control-lg pe-5"
                        style={{
                          borderRadius: '12px',
                          backgroundColor: item.isPresent ? '#333' : '#2a2a3a',
                          border: '2px solid #6a1b9a',
                          color: '#e0e0e0',
                          opacity: item.isPresent ? 0.8 : 1,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </div>
                    <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        id={`present-${index}`}
                        name="isPresent"
                        checked={item.isPresent || false}
                        onChange={(e) => handleChange(e, 'education', index)}
                        className="form-check-input"
                        style={{ accentColor: '#8e24aa' }}
                      />
                      <label htmlFor={`present-${index}`} className="form-check-label text-light ms-2">
                        Currently studying
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        /* Empty State */
        <div className="text-center">
          <p className="fs-5 mb-4">No education added yet.</p>
          <button
            className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
            onClick={() => addItem('education')}
            style={{
              background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
              border: 'none',
              borderRadius: '12px',
            }}
          >
            Add Education
          </button>
        </div>
      )}

      {/* Add Button */}
      {cvData.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
            onClick={() => addItem('education')}
            style={{
                background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                border: 'none',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 10px 20px rgba(106, 27, 154, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
              }}
            >
              Add Education
            </button>
          </div>
        )}
      </div>
    );
  };

export default EducationForm;