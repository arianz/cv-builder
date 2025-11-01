import React, { useState, useEffect } from 'react';
import { FaTrash, FaGraduationCap } from 'react-icons/fa';

const CoursesForm = ({ cvData, handleChange, addItem, removeItem }) => {
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [tempCourse, setTempCourse] = useState({ courseName: '', provider: '', year: '' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (cvData.length === 0) {
      setActiveIndex(0);
    } else if (activeIndex >= cvData.length) {
      setActiveIndex(cvData.length - 1); // Jangan sampai out of bounds
    }
  }, [cvData, activeIndex]);

  const openModal = (index = null) => {
    if (index !== null) {
      setTempCourse(cvData[index]);
      setEditIndex(index);
    } else {
      setTempCourse({ courseName: '', provider: '', year: '' });
      setEditIndex(null);
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditIndex(null);
    setTempCourse({ courseName: '', provider: '', year: '' });
  };

  const saveCourse = () => {
    if (tempCourse.courseName && tempCourse.provider && tempCourse.year) {
      if (editIndex !== null) {
        handleChange({ target: { name: 'courseName', value: tempCourse.courseName } }, 'courses', editIndex);
        handleChange({ target: { name: 'provider', value: tempCourse.provider } }, 'courses', editIndex);
        handleChange({ target: { name: 'year', value: tempCourse.year } }, 'courses', editIndex);
      } else {
        addItem('courses');
        const newIndex = cvData.length;
        handleChange({ target: { name: 'courseName', value: tempCourse.courseName } }, 'courses', newIndex);
        handleChange({ target: { name: 'provider', value: tempCourse.provider } }, 'courses', newIndex);
        handleChange({ target: { name: 'year', value: tempCourse.year } }, 'courses', newIndex);
      }
      closeModal();
    }
  };

  const deleteCourse = () => {
    if (editIndex !== null) {
      removeItem('courses', editIndex);
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
          Courses
        </h2>
      </div>

      {/* Empty State */}
      {cvData.length === 0 ? (
        <div className="text-center">
          <p className="fs-5 mb-4">No courses added yet.</p>
          <button
            className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
            onClick={() => openModal()}
            style={{
              background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
              border: 'none',
              borderRadius: '12px',
            }}
          >
            Add Course
          </button>
        </div>
      ) : (
        <>
          {/* Carousel */}
          <div className="position-relative" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <div id="coursesCarousel" className="carousel slide" data-bs-ride="false">
              <div className="carousel-inner">
                {cvData.map((item, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                  >
                    <div
                      className="card mx-auto shadow-sm border-0 text-center"
                      style={{
                        maxWidth: '100%',
                        minHeight: '280px',
                        background: 'linear-gradient(145deg, rgba(106, 27, 154, 0.3), rgba(106, 27, 154, 0.15))',
                        borderRadius: '16px',
                        cursor: 'pointer',
                        padding: '2rem 1.5rem',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => {
                        setActiveIndex(index);
                        openModal(index);
                      }}
                    >
                      <div className="card-body d-flex flex-column justify-content-center align-items-center text-light">
                        <FaGraduationCap size={60} className="text-purple mb-3" />
                        <h5 className="card-title mb-2 fs-5 fw-bold">
                          {item.courseName || 'Course Name'}
                        </h5>
                        <p className="card-text text-light mb-1 opacity-75">
                          {item.provider || 'Provider'}
                        </p>
                        <small className="text-light opacity-60">{item.year || 'Year'}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {cvData.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev ms-2"
                    type="button"
                    data-bs-target="#coursesCarousel"
                    data-bs-slide="prev"
                    style={{ width: '50px' }}
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next me-2"
                    type="button"
                    data-bs-target="#coursesCarousel"
                    data-bs-slide="next"
                    style={{ width: '50px' }}
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Add Button */}
          <div className="text-center mt-4">
            <button
              className="btn btn-lg px-5 py-3 fw-bold text-white shadow-sm"
              onClick={() => openModal()}
              style={{
                background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                border: 'none',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 10px 20px rgba(106, 27, 154, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
              }}
            >
              Add Course
            </button>
          </div>
        </>
      )}

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
                {editIndex !== null ? 'Edit Course' : 'Add Course'}
              </h5>
              <button type="button" className="btn-close btn-close-white" onClick={closeModal}></button>
            </div>
            <div className="modal-body pt-2">
              <div className="mb-3">
                <label className="form-label text-light fw-medium">Course Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={tempCourse.courseName || ''}
                  onChange={(e) => setTempCourse({ ...tempCourse, courseName: e.target.value })}
                  placeholder="e.g., React Mastery"
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
                <label className="form-label text-light fw-medium">Provider</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={tempCourse.provider || ''}
                  onChange={(e) => setTempCourse({ ...tempCourse, provider: e.target.value })}
                  placeholder="e.g., Coursera"
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
                <label className="form-label text-light fw-medium">Year</label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  value={tempCourse.year || ''}
                  onChange={(e) => setTempCourse({ ...tempCourse, year: e.target.value })}
                  placeholder="e.g., 2024"
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
            </div>
            <div className="modal-footer border-0 pt-2 pb-4 d-flex justify-content-center gap-2">
              <button
                className="btn btn-lg px-4 py-2 fw-bold text-white"
                onClick={saveCourse}
                style={{
                  background: 'linear-gradient(135deg, #6a1b9a, #8e24aa)',
                  border: 'none',
                  borderRadius: '12px',
                }}
                disabled={!tempCourse.courseName || !tempCourse.provider || !tempCourse.year}
              >
                {editIndex !== null ? 'Update' : 'Add'}
              </button>
              {editIndex !== null && (
                <button
                  className="btn btn-danger btn-lg px-4 py-2 d-flex align-items-center gap-2"
                  onClick={deleteCourse}
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
          <div key={i}>{item.courseName} - {item.provider}, {item.year}</div>
        ))}
      </div>
    </div>
  );
};

export default CoursesForm;