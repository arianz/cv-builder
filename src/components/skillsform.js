import React, { useState } from 'react';
import { FaTrash, FaStar, FaEdit } from 'react-icons/fa';

const SkillsForm = ({ cvData, handleChange, addItem, removeItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tempSkill, setTempSkill] = useState({ skill: '', level: '' });

  const openModal = (index = null) => {
    if (index !== null) {
      setTempSkill({ skill: cvData[index].skill, level: cvData[index].level });
      setEditIndex(index);
    } else {
      setTempSkill({ skill: '', level: '' });
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setTempSkill({ skill: '', level: '' });
  };

  const saveSkill = () => {
    if (tempSkill.skill && tempSkill.level) {
      if (editIndex !== null) {
        handleChange({ target: { name: 'skill', value: tempSkill.skill } }, 'skills', editIndex);
        handleChange({ target: { name: 'level', value: tempSkill.level } }, 'skills', editIndex);
      } else {
        addItem('skills');
        const newIndex = cvData.length;
        handleChange({ target: { name: 'skill', value: tempSkill.skill } }, 'skills', newIndex);
        handleChange({ target: { name: 'level', value: tempSkill.level } }, 'skills', newIndex);
      }
      closeModal();
    }
  };

  const deleteSkill = (index) => {
    removeItem('skills', index);
  };

  const getLevelStars = (level) => {
    const levels = { Beginner: 1, Intermediate: 2, Advanced: 3 };
    const filled = levels[level] || 0;
    return (
      <div className="d-flex gap-1">
        {[1, 2, 3].map((i) => (
          <FaStar
            key={i}
            size={14}
            className={i <= filled ? 'text-warning' : 'text-secondary'}
          />
        ))}
      </div>
    );
  };

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
          Skills
        </h2>
      </div>

      {/* Skills Grid */}
      <div className="row g-3">
        {cvData.map((item, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div
              className="card h-100 shadow-sm border-0 position-relative"
              style={{
                background: 'linear-gradient(145deg, rgba(106, 27, 154, 0.3), rgba(106, 27, 154, 0.15))',
                borderRadius: '16px',
                transition: 'all 0.3s ease',
              }}
            >
              <div className="card-body p-3 d-flex flex-column">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold text-light my-auto">
                    {item.skill || 'Untitled'}
                  </h5>
                  <div className="d-flex gap-1">
                    <button
                      className="btn btn-sm btn-link text-light p-1"
                      onClick={() => openModal(index)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-link text-danger p-1"
                      onClick={() => deleteSkill(index)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="mt-auto">
                  {getLevelStars(item.level)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {cvData.length === 0 && (
        <div className="text-center">
          <p className="fs-5 mb-4">No skills added yet.</p>
        </div>
      )}

      {/* Add Button */}
      <div className="text-center mt-4">
        <button
          className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
          onClick={() => openModal()}
          style={{
            background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
            border: 'none',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
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
          Add Skill
        </button>
      </div>

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show d-block' : ''}`} style={{ backgroundColor: 'rgba(0,0,0,0.7)' }} tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content" style={{
            background: 'linear-gradient(145deg, #1e1e2d, #1a1a2a)',
            borderRadius: '16px',
            border: 'none',
          }}>
            <div className="modal-header border-0 pb-2">
              <h5 className="modal-title text-light fw-bold">
                {editIndex !== null ? 'Edit Skill' : 'Add New Skill'}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body pt-2">
              <div className="mb-3">
                <label className="form-label text-light fw-medium">Skill Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={tempSkill.skill}
                  onChange={(e) => setTempSkill({ ...tempSkill, skill: e.target.value })}
                  placeholder="e.g., Python"
                  style={{
                    borderRadius: '12px',
                    backgroundColor: '#2a2a3a',
                    border: '2px solid #6a1b9a',
                    color: '#e0e0e0',
                  }}
                  maxLength={30}
                />
              </div>
              <div className="mb-3">
                <label className="form-label text-light fw-medium">Proficiency Level</label>
                <select
                  className="form-select form-select-lg"
                  value={tempSkill.level}
                  onChange={(e) => setTempSkill({ ...tempSkill, level: e.target.value })}
                  style={{
                    borderRadius: '12px',
                    backgroundColor: '#2a2a3a',
                    border: '2px solid #6a1b9a',
                    color: '#e0e0e0',
                  }}
                >
                  <option value="">Select Level</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
            <div className="modal-footer border-0 pt-2 pb-4 justify-content-center">
              <button
                className="btn btn-lg px-4 py-2 fw-bold text-white"
                onClick={saveSkill}
                style={{
                  background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                  border: 'none',
                  borderRadius: '12px',
                }}
                disabled={!tempSkill.skill || !tempSkill.level}
              >
                {editIndex !== null ? 'Update' : 'Add'} Skill
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;