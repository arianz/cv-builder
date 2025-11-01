import React, { useState } from 'react';
import LeftSidebar from './components/leftsidebar';
import DynamicForm from './components/dynamicform';
import CvPreview from './components/cvpreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function App() {
  const [activeSection, setActiveSection] = useState('personalSummary');
  const [cvData, setCvData] = useState({
    personalSummary: { name: '', email: '', phone: '', summary: '' },
    education: [{ field: '', institution: '', startYear: '', endYear: '', collapsed: false, isPresent: false }],
    experience: [{ position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: [''], collapsed: false, isPresent: false }],
    language: [{ language: '', proficiency: '', collapsed: false }],
    courses: [{ courseName: '', provider: '', year: '', collapsed: false }],
    skills: [{ skill: '', level: '', type: 'soft', collapsed: false }],
  });
  const [showPreview, setShowPreview] = useState(false);
  const [selectedSections, setSelectedSections] = useState({
    personalSummary: true,
    education: true,
    experience: true,
    language: true,
    courses: true,
    skills: true,
  });

  const handleChange = (e, section, index = null) => {
    const { name, value, checked } = e.target;
    if (section === 'personalSummary') {
      setCvData((prev) => ({
        ...prev,
        personalSummary: { ...prev.personalSummary, [name]: value },
      }));
    } else if (section === 'education' && index !== null) {
      setCvData((prev) => {
        const updatedEducation = prev.education.map((item, i) =>
          i === index ? { ...item, [name]: name === 'isPresent' ? checked : value } : item
        );
        if (name === 'isPresent' && checked) {
          return {
            ...prev,
            education: updatedEducation.map((item, i) =>
              i === index ? { ...item, endYear: 'Present' } : item
            ),
          };
        } else if (name === 'isPresent' && !checked) {
          return {
            ...prev,
            education: updatedEducation.map((item, i) =>
              i === index ? { ...item, endYear: '' } : item
            ),
          };
        }
        return { ...prev, education: updatedEducation };
      });
    } else if (section === 'experience' && index !== null) {
      setCvData((prev) => {
        const updatedExperience = prev.experience.map((item, i) =>
          i === index ? { ...item, [name]: name === 'isPresent' ? checked : value } : item
        );
        if (name === 'isPresent' && checked) {
          return {
            ...prev,
            experience: updatedExperience.map((item, i) =>
              i === index ? { ...item, endMonth: '', endYear: 'Present' } : item
            ),
          };
        } else if (name === 'isPresent' && !checked) {
          return {
            ...prev,
            experience: updatedExperience.map((item, i) =>
              i === index ? { ...item, endYear: '' } : item
            ),
          };
        }
        return { ...prev, experience: updatedExperience };
      });
    } else if (section === 'language' && index !== null) {
      setCvData((prev) => ({
        ...prev,
        language: prev.language.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else if (section === 'courses' && index !== null) {
      setCvData((prev) => ({
        ...prev,
        courses: prev.courses.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    } else if (section === 'skills' && index !== null) {
      setCvData((prev) => ({
        ...prev,
        skills: prev.skills.map((item, i) =>
          i === index ? { ...item, [name]: value } : item
        ),
      }));
    }
  };

  const addItem = (section) => {
    setCvData((prev) => {
      const newItem = {
        education: { field: '', institution: '', startYear: '', endYear: '', collapsed: false, isPresent: false },
        experience: { position: '', company: '', startMonth: '', startYear: '', endMonth: '', endYear: '', description: [''], collapsed: false, isPresent: false },
        language: { language: '', proficiency: '', collapsed: false },
        courses: { courseName: '', provider: '', year: '', collapsed: false },
        skills: { skill: '', level: '', type: 'soft', collapsed: false },
      }[section] || {};
      return {
        ...prev,
        [section]: [...prev[section], newItem],
      };
    });
  };

  const removeItem = (section, index) => {
    setCvData((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index),
    }));
  };

  const updateDescription = (section, index, descIndex, value) => {
    setCvData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, description: item.description.map((d, j) => j === descIndex ? value : d) } : item
      ),
    }));
  };

  const addDescription = (section, index) => {
    setCvData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, description: [...(item.description || []), ''] } : item
      ),
    }));
  };

  const removeDescription = (section, index, descIndex) => {
    setCvData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, description: item.description.filter((_, j) => j !== descIndex) } : item
      ),
    }));
  };

  const toggleCollapse = (section, index) => {
    setCvData((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === index ? { ...item, collapsed: !item.collapsed } : item
      ),
    }));
  };

  const generatePDF = async () => {
    const input = document.getElementById('cv-preview');
    if (!input) return;

    // Detect mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Viewport hack for mobile
    const originalViewport = document.querySelector('meta[name="viewport"]');
    const originalContent = originalViewport ? originalViewport.getAttribute('content') : null;
    if (isMobile && originalViewport) {
      originalViewport.setAttribute('content', 'width=1024, initial-scale=1.0');
    }

    // html2canvas
    const scale = isMobile ? 1 : 2;
    const canvas = await html2canvas(input, { 
      useCORS: true, 
      scale: scale,
      width: input.scrollWidth,
      height: input.scrollHeight,
      logging: false
    });

    // Restore viewport
    if (isMobile && originalViewport && originalContent) {
      originalViewport.setAttribute('content', originalContent);
    }

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const topPadding = 10;
    const bottomPadding = 10;
    const contentHeight = pdfHeight - topPadding - bottomPadding;

    const imgWidth = canvas.width / scale;
    const imgHeight = canvas.height / scale;
    const ratio = pdfWidth / imgWidth;
    const imgScaledHeight = imgHeight * ratio;
    let heightLeft = imgScaledHeight;
    let position = topPadding;

    // First page
    pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgScaledHeight);
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pdfWidth, topPadding, 'F');
    pdf.rect(0, pdfHeight - bottomPadding, pdfWidth, bottomPadding, 'F');
    heightLeft -= contentHeight;

    // Subsequent pages
    while (heightLeft > 0) {
      pdf.addPage();
      position -= contentHeight;  // Shift negative untuk lanjut potongan image
      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgScaledHeight);
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, pdfWidth, topPadding, 'F');
      pdf.rect(0, pdfHeight - bottomPadding, pdfWidth, bottomPadding, 'F');
      heightLeft -= contentHeight;
    }

    pdf.save('my_cv.pdf');
  };

  return (
    <div className="min-vh-100" style={{ background: '#0f0f1e', color: '#e0e0e0' }}>
      <div className="container-fluid p-3 p-md-4">
        <div className="row g-4">
          <div className="col-12 col-md-3">
            <LeftSidebar
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              setShowPreview={setShowPreview}
              setSelectedSections={setSelectedSections}
            />
          </div>
          <div className="col-12 col-md-9">
            <div
              className="p-4 rounded-3 shadow-lg"
              style={{
                background: 'linear-gradient(145deg, #1a1a2e, #16213e)',
                minHeight: '80vh',
              }}
            >
              <DynamicForm
                activeSection={activeSection}
                cvData={cvData}
                handleChange={handleChange}
                addItem={addItem}
                removeItem={removeItem}
                updateDescription={updateDescription}
                addDescription={addDescription}
                removeDescription={removeDescription}
                toggleCollapse={toggleCollapse}
              />
            </div>
          </div>
        </div>

        {/* Modal Preview */}
        {showPreview && (
          <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header border-0">
                  <button
                    className="btn-close"
                    onClick={() => setShowPreview(false)}
                  ></button>
                </div>
                <div className="modal-body p-4">
                  <CvPreview cvData={cvData} selectedSections={selectedSections} />
                </div>
                <div className="modal-footer border-0 justify-content-center">
                  <button
                    className="btn btn-lg text-white px-5"
                    style={{
                      background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                      border: 'none',
                    }}
                    onClick={generatePDF}
                  >
                    <i className="bi-download me-2"></i>
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;