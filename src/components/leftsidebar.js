import React, { useState } from 'react';

const LeftSidebar = ({ activeSection, setActiveSection, setShowPreview, setSelectedSections }) => {
  const [isOpen, setIsOpen] = useState(false);
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

  // Daftar section dengan ikon
  const sections = [
    { key: 'personalSummary', label: 'Personal Summary', icon: 'bi-person-fill' },
    { key: 'education', label: 'Education', icon: 'bi-mortarboard-fill' },
    { key: 'experience', label: 'Work Experience', icon: 'bi-briefcase-fill' },
    { key: 'language', label: 'Language', icon: 'bi-globe2' },
    { key: 'courses', label: 'Courses', icon: 'bi-book-fill' },
    { key: 'skills', label: 'Skills', icon: 'bi-tools' },
  ];

  return (
    <div
      className="p-3 rounded-3 h-100 shadow-lg"
      style={{
        color: '#e0e0e0',
      }}
    >
      {/* Toggle Button untuk Mobile */}
      <button
        className="btn d-md-none mb-3 position-fixed"
        style={{
          top: '1rem',
          left: '1rem',
          zIndex: 1050,
          background: '#6a1b9a',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'} fs-4 text-white`}></i>
      </button>

      {/* Sidebar Content */}
      <div className={`h-100 ${isOpen ? 'd-block' : 'd-none'} d-md-block`}>
        <h2
          className="h5 fw-bold text-center mb-4"
          style={{
            background: 'linear-gradient(90deg, #6a1b9a, #8e24aa)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '1px',
          }}
        >
          CV Section
        </h2>

        <div className="list-group list-group-flush gap-1">
          {sections.map((section) => (
            <label
              key={section.key}
              className="d-flex align-items-center py-3 px-2 rounded-3 mb-1 transition-all"
              style={{
                backgroundColor: activeSection === section.key ? 'rgba(106, 27, 154, 0.3)' : 'transparent',
                borderLeft: activeSection === section.key ? '3px solid #8e24aa' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.key) {
                  e.currentTarget.style.backgroundColor = 'rgba(106, 27, 154, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.key) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <button
                className="flex-grow-1 text-start bg-transparent border-0 text-light"
                onClick={() => setActiveSection(section.key)}
                style={{ padding: '0.5rem 0.75rem' }}
              >
                <i className={`${section.icon} me-3`} style={{ color: '#8e24aa' }}></i>
                <span style={{ fontWeight: 500 }}>{section.label}</span>
              </button>
              <input
                type="checkbox"
                checked={selectedSections[section.key]}
                onChange={() => handleCheckboxChange(section.key)}
                className="form-check-input me-2"
                style={{
                  color: '#8e24aa',
                  width: '18px',
                  height: '18px',
                }}
              />
            </label>
          ))}
        </div>

        {/* Preview Button */}
        <button
          className="btn w-100 py-3 rounded-3 mt-4 fw-bold text-white shadow-sm"
          onClick={() => setShowPreview(true)}
          disabled={Object.values(selectedSections).every((val) => !val)}
          style={{
            background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
            border: 'none',
            fontSize: '1rem',
            letterSpacing: '0.5px',
            opacity: Object.values(selectedSections).every((val) => !val) ? 0.6 : 1,
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            if (!Object.values(selectedSections).every((val) => !val)) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(106, 27, 154, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
          }}
        >
          <i className="bi-eye-fill me-2"></i>
          Preview Resume
        </button>
      </div>
    </div>
  );
};

export default LeftSidebar;