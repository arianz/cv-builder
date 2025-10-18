import React, { useState } from 'react';

const LeftSidebar = ({ activeSection, setActiveSection, setShowPreview, setSelectedSections }) => {
  const [selectedSections, setLocalSelectedSections] = useState({
    personalSummary: true,
    education: true,
    experience: true,
    language: true,
    courses: true,
    skills: true,
  });

  const handleCheckboxChange = (section) => {
    const newSelectedSections = {
      ...selectedSections,
      [section]: !selectedSections[section],
    };
    setLocalSelectedSections(newSelectedSections);
    setSelectedSections(newSelectedSections);
  };

  return (
    <div className="w-25 p-3 bg-white shadow-sm rounded-3 py-5">
      <h2 className="h5 fw-bold text-primary text-center mb-3">CV Section</h2>
      <div className="list-group">
        <label className="list-group-item d-flex align-items-center">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'personalSummary' ? 'active' : ''}`}
            onClick={() => setActiveSection('personalSummary')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0 }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-person-fill me-2"></i> Personal Summary
          </button>
          <input
            type="checkbox"
            checked={selectedSections.personalSummary}
            onChange={() => handleCheckboxChange('personalSummary')}
            className="me-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => setActiveSection('education')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0 }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-mortarboard-fill me-2"></i> Education
          </button>
          <input
            type="checkbox"
            checked={selectedSections.education}
            onChange={() => handleCheckboxChange('education')}
            className="me-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveSection('experience')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0 }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-briefcase-fill me-2"></i> Work Experience
          </button>
          <input
            type="checkbox"
            checked={selectedSections.experience}
            onChange={() => handleCheckboxChange('experience')}
            className="me-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'language' ? 'active' : ''}`}
            onClick={() => setActiveSection('language')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0 }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-globe2 me-2"></i> Language
          </button>
          <input
            type="checkbox"
            checked={selectedSections.language}
            onChange={() => handleCheckboxChange('language')}
            className="me-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveSection('courses')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0 }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-book-fill me-2"></i> Courses
          </button>
          <input
            type="checkbox"
            checked={selectedSections.courses}
            onChange={() => handleCheckboxChange('courses')}
            className="me-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: 0 }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-tools me-2"></i> Skills
          </button>
          <input
            type="checkbox"
            checked={selectedSections.skills}
            onChange={() => handleCheckboxChange('skills')}
            className="me-2"
          />
        </label>
        <button
          className="btn btn-primary mt-3 w-100"
          onClick={() => setShowPreview(true)}
          disabled={Object.values(selectedSections).every((val) => !val)}
          style={{ backgroundColor: '#0055FF', borderColor: '#0055FF' }}
        >
          <i className="bi-eye-fill me-2"></i> Preview Resume
        </button>
      </div>
    </div>
  );
};
export default LeftSidebar;