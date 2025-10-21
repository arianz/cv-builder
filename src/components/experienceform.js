import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const ExperienceForm = ({ cvData, handleChange, addItem, removeItem, updateDescription, addDescription, removeDescription, toggleCollapse, months }) => {
  return (
    <div className="container">
      <div className="p-4">
        <h2 className="h4 fw-bold text-primary text-center mb-4">Work Experience</h2>
        {cvData && cvData.length > 0 ? (
          cvData.map((item, index) => (
            <div key={index} className="card mb-3">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <h3 className="h6 mb-0 fw-semibold">
                  Experience {index + 1}: {item.position || 'Untitled'}
                </h3>
                <div>
                  <button
                    className="btn btn-link text-primary me-2"
                    onClick={() => toggleCollapse('experience', index)}
                  >
                    {item.collapsed ? <FaPlus /> : <FaMinus />}
                  </button>
                  <button
                    className="btn btn-link text-danger"
                    onClick={() => removeItem('experience', index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              {!item.collapsed && (
                <div className="card-body">
                  <div className="mb-3">
                    <label htmlFor={`position-${index}`} className="form-label fw-medium">Position</label>
                    <input
                      type="text"
                      id={`position-${index}`}
                      name="position"
                      placeholder="Enter position"
                      value={item.position || ''}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="form-control form-control-lg shadow-sm"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor={`company-${index}`} className="form-label fw-medium">Company</label>
                    <input
                      type="text"
                      id={`company-${index}`}
                      name="company"
                      placeholder="Enter company name"
                      value={item.company || ''}
                      onChange={(e) => handleChange(e, 'experience', index)}
                      className="form-control form-control-lg shadow-sm"
                      required
                    />
                  </div>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label fw-medium">Start Date</label>
                      <select
                        name="startMonth"
                        value={item.startMonth || ''}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="form-select form-select-lg mb-2 shadow-sm"
                      >
                        <option value="">Select Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="startYear"
                        placeholder="Year"
                        value={item.startYear || ''}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="form-control form-control-lg shadow-sm"
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-medium">End Date</label>
                      <select
                        name="endMonth"
                        value={item.endMonth || ''}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="form-select form-select-lg mb-2 shadow-sm"
                        disabled={item.isPresent}
                      >
                        <option value="">Select Month</option>
                        {months.map((month) => (
                          <option key={month} value={month}>{month}</option>
                        ))}
                      </select>
                      <input
                        type="text"
                        name="endYear"
                        placeholder="Year"
                        value={item.isPresent ? 'Present' : item.endYear || ''}
                        onChange={(e) => handleChange(e, 'experience', index)}
                        className="form-control form-control-lg shadow-sm"
                        disabled={item.isPresent}
                        required={!item.isPresent}
                      />
                      <div className="form-check mt-2">
                        <input
                          type="checkbox"
                          id={`isPresent-${index}`}
                          name="isPresent"
                          checked={item.isPresent || false}
                          onChange={(e) => handleChange(e, 'experience', index)}
                          className="form-check-input shadow-sm"
                        />
                        <label htmlFor={`isPresent-${index}`} className="form-check-label">Present</label>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <h3 className="h6 fw-semibold mb-2">Job Responsibilities</h3>
                    {(item.description || []).map((desc, descIndex) => (
                      <div key={descIndex} className="input-group mb-2">
                        <input
                          type="text"
                          value={desc || ''}
                          onChange={(e) => updateDescription('experience', index, descIndex, e.target.value)}
                          placeholder={`Responsibility ${descIndex + 1}`}
                          className="form-control form-control-lg shadow-sm"
                        />
                        <button
                          className="btn btn-danger ms-1 shadow-sm"
                          onClick={() => removeDescription('experience', index, descIndex)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      className="btn btn-primary mt-2 shadow-sm"
                      onClick={() => addDescription('experience', index)}
                    >
                      Add Responsibility
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No experience entries yet.</p>
        )}
        <div className="text-center mt-2">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => addItem('experience')}
          >
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExperienceForm;