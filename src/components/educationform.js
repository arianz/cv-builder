import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';

const EducationForm = ({ cvData, handleChange, addItem, removeItem, updateDescription, addDescription, removeDescription, toggleCollapse, months }) => {
  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-primary text-center mt-3 mb-4">Education</h2>
      {cvData && cvData.length > 0 ? (
        cvData.map((item, index) => (
          <div key={index} className="card mb-2">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="h6 mb-0 fw-semibold">
                Education {index + 1}: {item.field || 'Untitled'}
              </h3>
              <div>
                <button
                  className="btn btn-link text-primary me-2"
                  onClick={() => toggleCollapse('education', index)}
                >
                  {item.collapsed ? <FaPlus /> : <FaMinus />}
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => removeItem('education', index)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {!item.collapsed && (
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor={`field-${index}`} className="form-label">Field of Study</label>
                  <input
                    type="text"
                    id={`field-${index}`}
                    name="field"
                    placeholder="Field of Study"
                    value={item.field || ''}
                    onChange={(e) => handleChange(e, 'education', index)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor={`institution-${index}`} className="form-label">Institution Name</label>
                  <input
                    type="text"
                    id={`institution-${index}`}
                    name="institution"
                    placeholder="Institution Name"
                    value={item.institution || ''}
                    onChange={(e) => handleChange(e, 'education', index)}
                    className="form-control"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Start Date</label>
                    <input
                      type="text"
                      name="startYear"
                      placeholder="Year"
                      value={item.startYear || ''}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">End Date</label>
                    <input
                      type="text"
                      name="endYear"
                      placeholder="Year"
                      value={item.isPresent ? 'Present' : item.endYear || ''}
                      onChange={(e) => handleChange(e, 'education', index)}
                      className="form-control"
                      disabled={item.isPresent}
                    />
                    <div className="form-check mt-2">
                      <input
                        type="checkbox"
                        id={`isPresent-${index}`}
                        name="isPresent"
                        checked={item.isPresent || false}
                        onChange={(e) => {
                          handleChange(e, 'education', index);
                        }}
                        className="form-check-input"
                      />
                      <label htmlFor={`isPresent-${index}`} className="form-check-label">Present</label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <p className='text-center'>No education entries yet.</p>
      )}
      <div className='text-center mt-3'>
        <button
          className="btn btn-primary"
          onClick={() => addItem('education')}
        >
          Add Education
        </button>
      </div>
    </div>
  );
};

export default EducationForm;