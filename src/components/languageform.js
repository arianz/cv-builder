import React, { useState } from 'react';
import { FaTrash, FaTimes } from 'react-icons/fa';

const LanguageForm = ({ cvData, handleChange, addItem, removeItem, toggleCollapse }) => {
  const [showForm, setShowForm] = useState(false);
  const [newLanguage, setNewLanguage] = useState('');
  const [newProficiency, setNewProficiency] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const flagImages = {
    'english': 'https://flagcdn.com/w320/gb.png',
    'spanish': 'https://flagcdn.com/w320/es.png',
    'french': 'https://flagcdn.com/w320/fr.png',
    'german': 'https://flagcdn.com/w320/de.png',
    'italian': 'https://flagcdn.com/w320/it.png',
    'dutch': 'https://flagcdn.com/w320/nl.png',
    'portuguese': 'https://flagcdn.com/w320/pt.png',
    'russian': 'https://flagcdn.com/w320/ru.png',
    'chinese': 'https://flagcdn.com/w320/cn.png',
    'japanese': 'https://flagcdn.com/w320/jp.png',
    'korean': 'https://flagcdn.com/w320/kr.png',
    'indonesian': 'https://flagcdn.com/w320/id.png',
    'arabic': 'https://flagcdn.com/w320/sa.png',
    'thai': 'https://flagcdn.com/w320/th.png',
  };

  const addedLanguages = new Set(cvData.map(item => item.language.toLowerCase()));

  const handleAddOrEditLanguage = () => {
    if (newLanguage && newProficiency) {
      if (editIndex !== null) {
        handleChange({ target: { name: 'language', value: newLanguage } }, 'language', editIndex);
        handleChange({ target: { name: 'proficiency', value: newProficiency } }, 'language', editIndex);
        setEditIndex(null);
      } else {
        addItem('language');
        handleChange({ target: { name: 'language', value: newLanguage } }, 'language', cvData.length - 1);
        handleChange({ target: { name: 'proficiency', value: newProficiency } }, 'language', cvData.length - 1);
      }
      setNewLanguage('');
      setNewProficiency('');
      setShowForm(false);
    }
  };

  const handleDeleteLanguage = () => {
    if (editIndex !== null) {
      removeItem('language', editIndex);
      setEditIndex(null);
      setNewLanguage('');
      setNewProficiency('');
      setShowForm(false);
    }
  };

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="h4 fw-bold text-primary text-center mb-4">Language</h2>
        <div className="d-flex justify-content-center mb-4">
          <div className="row row-cols-5 row-cols-md-5 g-3" style={{ maxWidth: '600px' }}>
            {Object.keys(flagImages).map((code) => {
              const isAdded = addedLanguages.has(code);
              const languageData = cvData.find(item => item.language.toLowerCase() === code);
              return (
                <div key={code} className="col position-relative">
                  <img
                    src={flagImages[code]}
                    alt={`${code} flag`}
                    className="rounded-circle img-fluid border border-dark"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '100px',
                      aspectRatio: '1 / 1',
                      objectFit: 'cover'
                    }}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title={languageData ? `${languageData.language} - ${languageData.proficiency}` : `${code.toUpperCase()}`}
                  />
                  {isAdded && (
                    <span className="position-absolute top-0 end-0 bg-success rounded-circle text-white p-1" style={{ fontSize: '1.2rem', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <i className="bi-check"></i>
                    </span>
                  )}
                  <button
                    className="btn btn-link position-absolute top-50 start-50 translate-middle text-primary opacity-0 hover-opacity-100"
                    style={{ width: '60px', height: '60px', padding: 0, background: 'transparent', border: 'none', fontSize: '1.5rem', transition: 'opacity 0.2s' }}
                    onClick={() => {
                      if (isAdded) {
                        const index = cvData.findIndex(item => item.language.toLowerCase() === code);
                        setEditIndex(index);
                        setNewLanguage(cvData[index].language);
                        setNewProficiency(cvData[index].proficiency);
                        setShowForm(true);
                      } else {
                        setNewLanguage(code.toUpperCase());
                        setShowForm(true);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        {showForm && (
          <div className="card mb-3">
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="newLanguage" className="form-label fw-medium">Language</label>
                <input
                  type="text"
                  id="newLanguage"
                  value={newLanguage}
                  onChange={(e) => setNewLanguage(e.target.value)}
                  className="form-control form-control-lg shadow-sm"
                  placeholder="Enter Language (e.g., English)"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newProficiency" className="form-label fw-medium">Proficiency</label>
                <select
                  id="newProficiency"
                  value={newProficiency}
                  onChange={(e) => setNewProficiency(e.target.value)}
                  className="form-select form-select-lg shadow-sm"
                  required
                >
                  <option value="">Select Proficiency</option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Fluent">Fluent</option>
                </select>
              </div>
              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-primary btn-lg shadow-sm" onClick={handleAddOrEditLanguage}>Save</button>
                {editIndex !== null && (
                  <button className="btn btn-danger btn-lg shadow-sm" onClick={handleDeleteLanguage}><FaTrash /></button>
                )}
                <button className="btn btn-secondary btn-lg shadow-sm" onClick={() => {
                  setShowForm(false);
                  setEditIndex(null);
                  setNewLanguage('');
                  setNewProficiency('');
                }}><FaTimes /></button>
              </div>
            </div>
          </div>
        )}
        {cvData.map((item, index) => (
          <div key={index} className="card mb-3 d-none">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3 className="h6 mb-0 fw-semibold">
                {item.language || 'Untitled'} ({item.proficiency || 'N/A'})
              </h3>
              <div>
                <button
                  className="btn btn-link text-primary me-2"
                  onClick={() => toggleCollapse('language', index)}
                >
                  {item.collapsed ? 'Expand' : 'Collapse'}
                </button>
                <button
                  className="btn btn-link text-danger"
                  onClick={() => removeItem('language', index)}
                >
                  Delete
                </button>
              </div>
            </div>
            {!item.collapsed && (
              <div className="card-body">
                <p className="mb-0">Language: {item.language || 'N/A'}</p>
                <p className="mb-0">Proficiency: {item.proficiency || 'N/A'}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageForm;