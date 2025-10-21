import React, { useState } from 'react';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

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
    if (combinedText.length > 25) {
      return combinedText.substring(0, 25) + '...';
    }
    return combinedText;
  };

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="h4 fw-bold text-primary text-center mb-4">Skills</h2>
        <div className="row g-4">
          <div className="col-md-6">
            <div className="card h-100" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <div className="card-header bg-primary text-white text-center">
                <h5 className="mb-0">Soft Skills</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <ul className="list-unstyled flex-grow-1">
                  {cvData.filter(item => item.type === 'soft').map((item, index) => (
                    <li key={index} className="mb-3 d-flex justify-content-between align-items-center gap-2 border-bottom pb-3">
                      <span className="fw-medium">
                        {cvData.filter(i => i.type === 'soft').indexOf(item) + 1}. {truncateSkillLevel(item.skill, item.level)}
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
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
                    <div className="mb-3">
                      <label htmlFor="skill" className="form-label fw-medium">Skill</label>
                      <input
                        type="text"
                        id="skill"
                        name="skill"
                        value={cvData[selectedSkillIndex]?.skill || ''}
                        onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                        className="form-control form-control-lg"
                        placeholder="Skill"
                        maxLength={30}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="level" className="form-label fw-medium">Level</label>
                      <select
                        id="level"
                        name="level"
                        value={cvData[selectedSkillIndex]?.level || ''}
                        onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                        className="form-select form-select-lg"
                        required
                      >
                        <option value="">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2 mb-3">
                      <button className="btn btn-primary btn-lg" onClick={handleSaveSkill}>Save</button>
                      <button className="btn btn-secondary btn-lg" onClick={() => setSelectedSkillIndex(null)}><FaTimes /></button>
                    </div>
                  </div>
                )}
                {!selectedSkillIndex && (
                  <button
                    className="btn btn-outline-primary w-100 mt-auto"
                    onClick={() => handleAddSkill('soft')}
                  >
                    Add Soft Skill
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card h-100" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <div className="card-header bg-primary text-white text-center">
                <h5 className="mb-0">Hard Skills</h5>
              </div>
              <div className="card-body d-flex flex-column">
                <ul className="list-unstyled flex-grow-1">
                  {cvData.filter(item => item.type === 'hard').map((item, index) => (
                    <li key={index} className="mb-3 d-flex justify-content-between align-items-center border-bottom pb-3">
                      <span className="fw-medium">
                        {cvData.filter(i => i.type === 'hard').indexOf(item) + 1}. {truncateSkillLevel(item.skill, item.level)}
                      </span>
                      <div>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
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
                    <div className="mb-3">
                      <label htmlFor="skill" className="form-label fw-medium">Skill</label>
                      <input
                        type="text"
                        id="skill"
                        name="skill"
                        value={cvData[selectedSkillIndex]?.skill || ''}
                        onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                        className="form-control form-control-lg"
                        placeholder="Skill"
                        maxLength={30}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="level" className="form-label fw-medium">Level</label>
                      <select
                        id="level"
                        name="level"
                        value={cvData[selectedSkillIndex]?.level || ''}
                        onChange={(e) => handleChange(e, 'skills', selectedSkillIndex)}
                        className="form-select form-select-lg"
                        required
                      >
                        <option value="">Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="d-flex gap-2 my-3">
                      <button className="btn btn-primary btn-lg" onClick={handleSaveSkill}>Save</button>
                      <button className="btn btn-secondary btn-lg" onClick={() => setSelectedSkillIndex(null)}><FaTimes /></button>
                    </div>
                  </div>
                )}
                {!selectedSkillIndex && (
                  <button
                    className="btn btn-outline-primary w-100 mt-auto"
                    onClick={() => handleAddSkill('hard')}
                  >
                    Add Hard Skill
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;