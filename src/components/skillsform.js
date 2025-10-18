import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const SkillsForm = ({ cvData, handleChange, addItem, removeItem, initialType }) => {
  const [selectedSkillIndex, setSelectedSkillIndex] = useState(null);
  const [selectedType, setSelectedType] = useState(initialType || 'soft');

  const handleAddSkill = (type) => {
    addItem('skills');
    setSelectedSkillIndex(cvData.length);
    setSelectedType(type);
    handleChange({ target: { name: 'type', value: type } }, 'skills', cvData.length);
  };

  const handleSaveSkill = () => {
    handleChange({ target: { name: 'type', value: selectedType } }, 'skills', selectedSkillIndex);
    setSelectedSkillIndex(null);
    setSelectedType(initialType || 'soft');
  };

  const handleEditSkill = (index) => {
    setSelectedSkillIndex(index);
    setSelectedType(cvData[index].type || 'soft');
  };

  const handleDeleteSkill = (index) => {
    if (removeItem && index !== null) {
      removeItem('skills', index);
      setSelectedSkillIndex(null);
    }
  };

  // Fungsi untuk memotong teks gabungan "nama skill - level" jika melebihi 35 karakter
  const truncateSkillLevel = (skillName, level) => {
    const combinedText = `${skillName} - ${level}`;
    if (combinedText.length > 32) {
      return combinedText.substring(0, 32) + '...';
    }
    return combinedText;
  };

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-primary text-center mt-3 mb-4">Skills</h2>
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card h-100" style={{ maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
            <div className="card-header bg-primary text-white text-center">
              <h5 className="mb-0">Soft Skills</h5>
            </div>
            <div className="card-body d-flex flex-column" style={{ minHeight: '300px' }}>
              <ul className="list-unstyled flex-grow-1">
                {cvData.filter(item => item.type === 'soft').map((item, index) => (
                  <li key={index} className="mb-2 d-flex justify-content-between align-items-center">
                    <span>
                      {cvData.filter(i => i.type === 'soft').indexOf(item) + 1}. {truncateSkillLevel(item.skill, item.level)}
                    </span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => handleEditSkill(cvData.findIndex(i => i === item))}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteSkill(cvData.findIndex(i => i === item))}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {selectedSkillIndex !== null && selectedType === 'soft' && (
                <div>
                  <div className="mb-2">
                    <label htmlFor="skill" className="form-label">Skill</label>
                    <input
                      type="text"
                      id="skill"
                      name="skill"
                      value={cvData[selectedSkillIndex]?.skill || ''}
                      onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                      className="form-control"
                      placeholder="Skill"
                      maxLength={30} // Sesuaikan maxLength agar total dengan level tidak melebihi 35
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="level" className="form-label">Level</label>
                    <select
                      id="level"
                      name="level"
                      value={cvData[selectedSkillIndex]?.level || ''}
                      onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                      className="form-select"
                    >
                      <option value="">Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <button className="btn btn-primary" onClick={handleSaveSkill}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setSelectedSkillIndex(null)}>Cancel</button>
                  </div>
                </div>
              )}
              {!selectedSkillIndex && (
                <button
                  className="btn btn-outline-primary w-100 mt-auto"
                  onClick={() => handleAddSkill('soft')}
                >
                  <FaPlus /> Add Soft Skill
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100" style={{ maxHeight: '400px', overflowY: 'auto', position: 'relative' }}>
            <div className="card-header bg-primary text-white text-center">
              <h5 className="mb-0">Hard Skills</h5>
            </div>
            <div className="card-body d-flex flex-column" style={{ minHeight: '300px' }}>
              <ul className="list-unstyled flex-grow-1">
                {cvData.filter(item => item.type === 'hard').map((item, index) => (
                  <li key={index} className="mb-2 d-flex justify-content-between align-items-center">
                    <span>
                      {cvData.filter(i => i.type === 'hard').indexOf(item) + 1}. {truncateSkillLevel(item.skill, item.level)}
                    </span>
                    <div>
                      <button
                        className="btn btn-sm btn-outline-secondary me-1"
                        onClick={() => handleEditSkill(cvData.findIndex(i => i === item))}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteSkill(cvData.findIndex(i => i === item))}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {selectedSkillIndex !== null && selectedType === 'hard' && (
                <div>
                  <div className="mb-2">
                    <label htmlFor="skill" className="form-label">Skill</label>
                    <input
                      type="text"
                      id="skill"
                      name="skill"
                      value={cvData[selectedSkillIndex]?.skill || ''}
                      onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                      className="form-control"
                      placeholder="Skill"
                      maxLength={30}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="level" className="form-label">Level</label>
                    <select
                      id="level"
                      name="level"
                      value={cvData[selectedSkillIndex]?.level || ''}
                      onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                      className="form-select"
                    >
                      <option value="">Level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div className="d-flex gap-2 mb-2">
                    <button className="btn btn-primary" onClick={handleSaveSkill}>Save</button>
                    <button className="btn btn-secondary" onClick={() => setSelectedSkillIndex(null)}>Cancel</button>
                  </div>
                </div>
              )}
              {!selectedSkillIndex && (
                <button
                  className="btn btn-outline-primary w-100 mt-auto"
                  onClick={() => handleAddSkill('hard')}
                >
                  <FaPlus /> Add Hard Skill
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;