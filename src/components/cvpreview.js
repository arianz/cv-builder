import React from 'react';

const CvPreview = ({ cvData, selectedSections }) => {
  return (
    <div id="cv-preview" className="p-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '10pt', maxWidth: '210mm', margin: '0 auto' }}>
      {selectedSections.personalSummary && (
        <>
          <h1 className="text-center fw-bold fs-3">{cvData.personalSummary.name || 'Your Name'}</h1>
          <p className="text-center mb-4">
            {cvData.personalSummary.phone || 'Phone N/A'} | {cvData.personalSummary.email || 'Email N/A'}
          </p>
          <hr className="mb-4" />
          <h2 className="fw-bold fs-5 mb-2">Summary</h2>
          <p className="mb-4">{cvData.personalSummary.summary}</p>
          <hr className="mb-4" />
        </>
      )}
      {selectedSections.education && (
        <>
          <h2 className="fw-bold fs-5 mb-2">Education</h2>
          <ul className="list-unstyled">
            {cvData.education.map((item, index) => (
              <li key={index} className="mb-2">
                • {item.field || 'N/A'}, {item.institution || 'N/A'} ({item.startYear || 'N/A'} - {item.endYear || 'N/A'})
              </li>
            ))}
          </ul>
          <hr className="mb-4" />
        </>
      )}
      {selectedSections.experience && (
        <>
          <h2 className="fw-bold fs-5 mb-2">Work Experience</h2>
          {cvData.experience.map((item, index) => (
            <div key={index} className="mb-3">
              <p className="fw-bold mb-1">{item.position || 'N/A'}</p>
              <p className="mb-1">{item.company || 'N/A'} | {item.startMonth} {item.startYear} – {item.endMonth} {item.endYear || 'N/A'}</p>
              <ul className="list-unstyled">
                {(item.description || []).map((desc, descIndex) => (
                  <li key={descIndex} className="ms-3">• {desc || 'No description'}</li>
                ))}
              </ul>
            </div>
          ))}
          <hr className="mb-4" />
        </>
      )}
      {selectedSections.skills && (
        <>
          <h2 className="fw-bold fs-5 mb-2">Skills</h2>
          <div className="row">
            <div className="col-md-6">
              <ul className="list-unstyled">
                {cvData.skills.slice(0, Math.ceil(cvData.skills.length / 2)).map((item, index) => (
                  <li key={index} className="mb-1">• {item.skill || 'N/A'} - {item.level || 'N/A'}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="list-unstyled">
                {cvData.skills.slice(Math.ceil(cvData.skills.length / 2)).map((item, index) => (
                  <li key={index} className="mb-1">• {item.skill || 'N/A'} - {item.level || 'N/A'}</li>
                ))}
              </ul>
            </div>
          </div>
          <hr className="mb-4" />
        </>
      )}
      {selectedSections.language && (
        <>
          <h2 className="fw-bold fs-5 mb-2">Languages</h2>
          <ul className="list-unstyled">
            {cvData.language.filter(item => item.language && item.proficiency).map((item, index) => (
              <li key={index} className="mb-1">• {item.language} - {item.proficiency}</li>
            ))}
          </ul>
          <hr className="mb-4" />
        </>
      )}
      {selectedSections.courses && (
        <>
          <h2 className="fw-bold fs-5 mb-2">Courses</h2>
          <ul className="list-unstyled">
            {cvData.courses.filter(item => item.courseName && item.provider && item.year).map((item, index) => (
              <li key={index} className="mb-2">
                {item.courseName} - {item.provider}, {item.year}
              </li>
            ))}
          </ul>
          <hr className="mb-4" />
        </>
      )}
    </div>
  );
};

export default CvPreview;