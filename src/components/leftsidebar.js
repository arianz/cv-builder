import React, { useState } from 'react';

const LeftSidebar = ({ activeSection, setActiveSection, setShowPreview, setSelectedSections }) => {
  const [isOpen, setIsOpen] = useState(false); // State untuk toggle sidebar di mobile
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
    <div className="p-3 rounded-3 h-100">
      {/* Tombol Toggle untuk Mobile */}
      <button
        className="btn btn-primary d-md-none mb-3 position-fixed"
        style={{ top: '1rem', left: '1rem', zIndex: 1050 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close sidebar' : 'Open sidebar'}
        aria-expanded={isOpen}
      >
        <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'} fs-5`}></i>
      </button>

      {/* Sidebar Content */}
      <div className={`list-group ${isOpen ? 'd-block' : 'd-none'} d-md-block`}>
        <h2 className="h4 fw-bold text-primary text-center mt-3 mb-4">CV Section</h2>
        <label className="list-group-item d-flex align-items-center py-2">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'personalSummary' ? 'active' : ''}`}
            onClick={() => setActiveSection('personalSummary')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: '0.5rem 1rem', borderLeft: activeSection === 'personalSummary' ? '2px solid #0055FF' : 'none' }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-person-fill me-2"></i> Personal Summary
          </button>
          <input
            type="checkbox"
            checked={selectedSections.personalSummary}
            onChange={() => handleCheckboxChange('personalSummary')}
            className="form-check-input ms-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center py-2">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'education' ? 'active' : ''}`}
            onClick={() => setActiveSection('education')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: '0.5rem 1rem', borderLeft: activeSection === 'education' ? '2px solid #0055FF' : 'none' }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-mortarboard-fill me-2"></i> Education
          </button>
          <input
            type="checkbox"
            checked={selectedSections.education}
            onChange={() => handleCheckboxChange('education')}
            className="form-check-input ms-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center py-2">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveSection('experience')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: '0.5rem 1rem', borderLeft: activeSection === 'experience' ? '2px solid #0055FF' : 'none' }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-briefcase-fill me-2"></i> Work Experience
          </button>
          <input
            type="checkbox"
            checked={selectedSections.experience}
            onChange={() => handleCheckboxChange('experience')}
            className="form-check-input ms-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center py-2">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'language' ? 'active' : ''}`}
            onClick={() => setActiveSection('language')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: '0.5rem 1rem', borderLeft: activeSection === 'language' ? '2px solid #0055FF' : 'none' }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-globe2 me-2"></i> Language
          </button>
          <input
            type="checkbox"
            checked={selectedSections.language}
            onChange={() => handleCheckboxChange('language')}
            className="form-check-input ms-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center py-2">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveSection('courses')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: '0.5rem 1rem', borderLeft: activeSection === 'courses' ? '2px solid #0055FF' : 'none' }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-book-fill me-2"></i> Courses
          </button>
          <input
            type="checkbox"
            checked={selectedSections.courses}
            onChange={() => handleCheckboxChange('courses')}
            className="form-check-input ms-2"
          />
        </label>
        <label className="list-group-item d-flex align-items-center py-2">
          <button
            className={`list-group-item-action flex-grow-1 ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveSection('skills')}
            style={{ border: 'none', background: 'none', textAlign: 'left', padding: '0.5rem 1rem', borderLeft: activeSection === 'skills' ? '2px solid #0055FF' : 'none' }}
            onMouseOver={(e) => (e.target.style.color = '#0055FF')}
            onMouseOut={(e) => (e.target.style.color = '')}
          >
            <i className="bi-tools me-2"></i> Skills
          </button>
          <input
            type="checkbox"
            checked={selectedSections.skills}
            onChange={() => handleCheckboxChange('skills')}
            className="form-check-input ms-2"
          />
        </label>
        <button
          className="btn btn-primary mt-4 w-100 py-2 rounded-3"
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