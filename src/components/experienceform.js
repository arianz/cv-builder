import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const ExperienceForm = ({
  cvData,
  handleChange,
  addItem,
  removeItem,
  updateDescription,
  addDescription,
  removeDescription,
  toggleCollapse,
  months,
}) => {
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
          Work Experience
        </h2>
      </div>

      {/* Experience Entries */}
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
              onClick={() => toggleCollapse('experience', index)}
            >
              <h3 className="h6 mb-0 fw-medium text-light">
                Experience {index + 1}: {item.position || 'Untitled'}
              </h3>
              <div className="d-flex gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  className="btn btn-sm btn-link text-light p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCollapse('experience', index);
                  }}
                >
                  {item.collapsed ? <FaPlus /> : <FaMinus />}
                </button>
                <button
                  className="btn btn-sm btn-link text-danger p-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeItem('experience', index);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </div>

            {/* Body */}
            {!item.collapsed && (
              <div className="card-body p-4">
                {/* Position */}
                <div className="mb-4">
                  <label className="form-label text-light fw-medium mb-2">
                    Position
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={item.position || ''}
                    onChange={(e) => handleChange(e, 'experience', index)}
                    placeholder="e.g., Software Engineer"
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

                {/* Company */}
                <div className="mb-4">
                  <label className="form-label text-light fw-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={item.company || ''}
                    onChange={(e) => handleChange(e, 'experience', index)}
                    placeholder="e.g., Google Inc."
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
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
                    <label className="form-label text-light fw-medium mb-2">
                      Start Date
                    </label>
                    <select
                      name="startMonth"
                      value={item.startMonth || ''}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="form-select form-select-lg mb-2"
                      style={{
                        borderRadius: '12px',
                        backgroundColor: '#2a2a3a',
                        border: '2px solid #6a1b9a',
                        color: '#e0e0e0',
                        transition: 'all 0.3s ease',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#8e24aa'}
                      onBlur={(e) => e.target.style.borderColor = '#6a1b9a'}
                    >
                      <option value="">Month</option>
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                    <input
                      type="text"
                      name="startYear"
                      value={item.startYear || ''}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      placeholder="Year"
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
                      End Date
                    </label>
                    <div className="position-relative">
                      <select
                        name="endMonth"
                        value={item.endMonth || ''}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        disabled={item.isPresent}
                        className="form-select form-select-lg mb-2"
                        style={{
                          borderRadius: '12px',
                          backgroundColor: item.isPresent ? '#333' : '#2a2a3a',
                          border: '2px solid #6a1b9a',
                          color: '#e0e0e0',
                          opacity: item.isPresent ? 0.8 : 1,
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <option value="">Month</option>
                        {months.map((m) => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="endYear"
                        value={item.isPresent ? 'Present' : item.endYear || ''}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        disabled={item.isPresent}
                        placeholder="Year"
                        className="form-control form-control-lg"
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
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="form-check-input"
                        style={{ accentColor: '#8e24aa' }}
                      />
                      <label htmlFor={`present-${index}`} className="form-check-label text-light ms-2">
                        Currently working
                      </label>
                    </div>
                  </div>
                </div>

                {/* Responsibilities */}
                <div className="mb-4">
                  <label className="form-label text-light fw-medium mb-2">
                    Job Responsibilities
                  </label>
                  {(item.description || []).map((desc, dIdx) => (
                    <div key={dIdx} className="d-flex gap-2 mb-2">
                      <input
                        type="text"
                        value={desc || ''}
                        onChange={(e) => updateDescription('experience', index, dIdx, e.target.value)}
                        placeholder={`Responsibility ${dIdx + 1}`}
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
                      <button
                        className="btn btn-danger d-flex align-items-center justify-content-center"
                        style={{ width: '60px', borderRadius: '12px' }}
                        onClick={() => removeDescription('experience', index, dIdx)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    className="btn btn-outline-light w-100 mt-2 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      borderRadius: '12px',
                      border: '2px dashed #6a1b9a',
                      color: '#8e24aa',
                      fontWeight: '600',
                    }}
                    onClick={() => addDescription('experience', index)}
                  >
                    <FaPlus /> Add Responsibility
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        /* Empty State */
        <div className="text-center">
          <p className="fs-5 mb-4">No work experience added yet.</p>
          <button
            className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
            onClick={() => addItem('experience')}
            style={{
              background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
              border: 'none',
              borderRadius: '12px',
            }}
          >
            Add Experience
          </button>
        </div>
      )}

      {/* Add Button */}
      {cvData.length > 0 && (
        <div className="text-center mt-4">
          <button
            className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
            onClick={() => addItem('experience')}
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
            Add Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;