import React from 'react';

const CvPreview = ({ cvData, selectedSections }) => {

  const renderSection = (condition, title, content) => {
    if (!condition) return null;
    return (
      <>
        <h2 className="fw-bold mb-2" style={{ fontSize: '14pt', color: '#000' }}>
          {title}
        </h2>
        {content}
        <hr style={{ borderTop: '2px solid #000', margin: '1rem 0' }} />
      </>
    );
  };

  return (
    <div
      id="cv-preview"
      className="p-5"
      style={{
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontSize: '11pt',
        lineHeight: '1.5',
        color: '#333',
        maxWidth: '210mm',
        margin: '0 auto',
        background: '#fff',
      }}
    >
      {/* Personal Summary */}
      {selectedSections.personalSummary && (
        <div className="text-center mb-3">
          <h1
            className="fw-bold mb-2"
            style={{ fontSize: '24pt', color: '#2c3e50' }}
          >
            {cvData.personalSummary.name || 'Your Name'}
          </h1>
          <p className="text-muted mb-4" style={{ fontSize: '11pt' }}>
            {cvData.personalSummary.phone || 'Phone N/A'} | {cvData.personalSummary.email || 'Email N/A'}
          </p>
          <hr style={{ borderTop: '2px solid #000', margin: '1rem 0' }} />
        </div>
      )}

      {/* Summary */}
      {selectedSections.personalSummary && cvData.personalSummary.summary && (
        <>
          <h2 className="fw-bold mb-2" style={{ fontSize: '14pt' }}>Summary</h2>
          <p className="mb-3 text-justify">{cvData.personalSummary.summary}</p>
          <hr style={{ borderTop: '2px solid #000', margin: '1rem 0' }} />
        </>
      )}

      {/* Education */}
      {selectedSections.education && cvData.education.length > 0 && renderSection(
        true,
        'Education',
        <div className="row">
          {cvData.education.map((item, index) => (
            <div key={index} className={cvData.education.length > 3 ? 'col-md-6 mb-3' : 'col-12'}>
              <strong>{item.field || 'N/A'}</strong>, {item.institution || 'N/A'} ({item.startYear || 'N/A'} - {item.endYear || 'N/A'})
            </div>
          ))}
        </div>
      )}

      {/* Work Experience */}
      {selectedSections.experience && (
        <>
          <h2 className="fw-bold mb-2" style={{ fontSize: '14pt' }}>Work Experience</h2>
          {cvData.experience.map((item, index) => (
            <div key={index}>
              <p className="fw-bold mb-1">{item.position || 'N/A'}</p>
              <p className="mb-1">{item.company || 'N/A'} | {item.startMonth} {item.startYear} – {item.endMonth} {item.endYear || 'N/A'}</p>
              <ul className="list-unstyled">
                {(item.description || []).map((desc, descIndex) => (
                  <li key={descIndex} className="ms-3">• {desc || 'No description'}</li>
                ))}
              </ul>
            </div>
          ))}
          <hr className="mb-3" style={{ borderTop: '2px solid #1a1a2e' }}/>
        </>
      )}

      {/* Skills */}
      {selectedSections.skills && cvData.skills.length > 0 && renderSection(
        true,
        'Skills',
        <div className="row">
          {cvData.skills.map((item, index) => (
            <div key={index} className={cvData.skills.length > 3 ? 'col-md-6' : 'col-12 mb-2'}>
              • {item.skill || 'N/A'} - {item.level || 'N/A'}
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {selectedSections.language && cvData.language.length > 0 && renderSection(
        true,
        'Languages',
        <div className="row">
          {cvData.language.filter(item => item.language && item.proficiency).map((item, index) => (
            <div key={index} className={cvData.language.length > 3 ? 'col-md-6' : 'col-12 mb-2'}>
              • {item.language} - {item.proficiency}
            </div>
          ))}
        </div>
      )}

      {/* Courses */}
      {selectedSections.courses && cvData.courses.length > 0 && renderSection(
        true,
        'Courses',
        <div className="row">
          {cvData.courses.filter(item => item.courseName && item.provider && item.year).map((item, index) => (
            <div key={index} className={cvData.courses.length > 3 ? 'col-md-6' : 'col-12'}>
              • {item.courseName} - {item.provider}, {item.year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CvPreview;