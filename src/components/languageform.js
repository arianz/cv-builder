import React, { useState } from 'react';
import { FaTrash, FaPlus, FaCheck } from 'react-icons/fa';

const LanguageForm = ({ cvData, handleChange, addItem, removeItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tempLang, setTempLang] = useState({ language: '', proficiency: '' });

  const flagImages = {
    english: { flag: 'https://flagcdn.com/w320/gb.png', name: 'English' },
    spanish: { flag: 'https://flagcdn.com/w320/es.png', name: 'Spanish' },
    french: { flag: 'https://flagcdn.com/w320/fr.png', name: 'French' },
    german: { flag: 'https://flagcdn.com/w320/de.png', name: 'German' },
    italian: { flag: 'https://flagcdn.com/w320/it.png', name: 'Italian' },
    dutch: { flag: 'https://flagcdn.com/w320/nl.png', name: 'Dutch' },
    portuguese: { flag: 'https://flagcdn.com/w320/pt.png', name: 'Portuguese' },
    russian: { flag: 'https://flagcdn.com/w320/ru.png', name: 'Russian' },
    chinese: { flag: 'https://flagcdn.com/w320/cn.png', name: 'Chinese' },
    japanese: { flag: 'https://flagcdn.com/w320/jp.png', name: 'Japanese' },
    korean: { flag: 'https://flagcdn.com/w320/kr.png', name: 'Korean' },
    indonesian: { flag: 'https://flagcdn.com/w320/id.png', name: 'Indonesian' },
    arabic: { flag: 'https://flagcdn.com/w320/sa.png', name: 'Arabic' },
    thai: { flag: 'https://flagcdn.com/w320/th.png', name: 'Thai' },
  };

  const addedLanguages = new Set(cvData.map(item => item.language.toLowerCase()));

  const openModal = (code = null) => {
    if (code) {
      const item = cvData.find(i => i.language.toLowerCase() === code);
      if (item) {
        setTempLang({ language: item.language, proficiency: item.proficiency });
        setEditIndex(cvData.indexOf(item));
      } else {
        setTempLang({ language: flagImages[code].name, proficiency: '' });
        setEditIndex(null);
      }
    } else {
      setTempLang({ language: '', proficiency: '' });
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setTempLang({ language: '', proficiency: '' });
  };

  const saveLanguage = () => {
    if (tempLang.language && tempLang.proficiency) {
      if (editIndex !== null) {
        handleChange({ target: { name: 'language', value: tempLang.language } }, 'language', editIndex);
        handleChange({ target: { name: 'proficiency', value: tempLang.proficiency } }, 'language', editIndex);
      } else {
        addItem('language');
        const newIndex = cvData.length;
        handleChange({ target: { name: 'language', value: tempLang.language } }, 'language', newIndex);
        handleChange({ target: { name: 'proficiency', value: tempLang.proficiency } }, 'language', newIndex);
      }
      closeModal();
    }
  };

  const deleteLanguage = () => {
    if (editIndex !== null) {
      removeItem('language', editIndex);
      closeModal();
    }
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
          Language
        </h2>
      </div>

      {/* Flag Grid */}
      <div className="d-flex justify-content-center">
        <div
          className="row row-cols-3 row-cols-sm-4 row-cols-md-5 row-cols-lg-6 g-3 g-md-4"
          style={{ maxWidth: '800px' }}
        >
          {Object.entries(flagImages).map(([code, { flag, name }]) => {
            const isAdded = addedLanguages.has(name.toLowerCase());
            const langData = cvData.find(i => i.language.toLowerCase() === name.toLowerCase());
            return (
              <div key={code} className="col text-center">
                <div
                  className="position-relative d-inline-block"
                  style={{ width: '80px', height: '80px' }}
                  onClick={() => openModal(code)}
                >
                  <img
                    src={flag}
                    alt={`${name} flag`}
                    className="rounded-circle img-fluid shadow-sm"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      border: '2px solid #000',
                      boxShadow: isAdded ? '0 0 0 3px #8e24aa' : '0 4px 8px rgba(0,0,0,0.3)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    title={isAdded ? `${langData.language} - ${langData.proficiency}` : `Add ${name}`}
                  />
                  {isAdded && (
                    <div
                      className="position-absolute top-0 end-0 d-flex align-items-center justify-content-center rounded-circle"
                      style={{
                        width: '28px',
                        height: '28px',
                        background: '#6a1b9a',
                        color: 'white',
                        fontSize: '14px',
                      }}
                    >
                      <FaCheck />
                    </div>
                  )}
                  <div
                    className="position-absolute top-50 start-50 translate-middle text-white opacity-0 hover-opacity-100"
                    style={{
                      fontSize: '2rem',
                      pointerEvents: 'none',
                      transition: 'opacity 0.3s',
                    }}
                  >
                    <FaPlus />
                  </div>
                </div>
                <small className="d-block text-light mt-1 fw-medium">{name}</small>
              </div>
            );
          })}
        </div>
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
                {editIndex !== null ? 'Edit Language' : 'Add Language'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
            </div>
            <div className="modal-body pt-2">
              <div className="mb-3">
                <label className="form-label text-light fw-medium">Language</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={tempLang.language}
                  onChange={(e) => setTempLang({ ...tempLang, language: e.target.value })}
                  placeholder="e.g., English"
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
              <div className="mb-3">
                <label className="form-label text-light fw-medium">Proficiency</label>
                <select
                  className="form-select form-select-lg"
                  value={tempLang.proficiency}
                  onChange={(e) => setTempLang({ ...tempLang, proficiency: e.target.value })}
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
                  <option value="">Select Level</option>
                  <option value="Basic">Basic</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
              </div>
            </div>
            <div className="modal-footer border-0 pt-2 pb-4 d-flex justify-content-center gap-2">
              <button
                className="btn btn-lg px-4 py-2 fw-bold text-white"
                onClick={saveLanguage}
                style={{
                  background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                  border: 'none',
                  borderRadius: '12px',
                }}
                disabled={!tempLang.language || !tempLang.proficiency}
              >
                {editIndex !== null ? 'Update' : 'Add'}
              </button>
              {editIndex !== null && (
                <button
                  className="btn btn-danger btn-lg px-4 py-2 d-flex align-items-center gap-2"
                  onClick={deleteLanguage}
                  style={{ borderRadius: '12px' }}
                >
                  <FaTrash /> Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hidden for PDF */}
      <div className="d-none">
        {cvData.map((item, i) => (
          <div key={i}>{item.language} - {item.proficiency}</div>
        ))}
      </div>
    </div>
  );
};

export default LanguageForm;