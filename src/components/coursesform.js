import React, { useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaTrash, FaTimes, FaGraduationCap } from 'react-icons/fa';

const CoursesForm = ({ cvData, handleChange, addItem, removeItem }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAddPlaceholder = () => {
    addItem('courses');
    setSelectedIndex(cvData.length);
  };

  const handleSaveCourse = () => {
    setSelectedIndex(null);
  };

  const handleDeleteCourse = () => {
    if (selectedIndex !== null && removeItem) {
      removeItem('courses', selectedIndex);
      setSelectedIndex(cvData.length > 1 ? 0 : null);
    }
  };

  return (
    <div className="container">
      <div className="p-3 p-md-4">
        <h2 className="h4 fw-bold text-primary text-center mb-4">Courses</h2>

        {cvData.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">No courses entries yet.</p>
            <button className="btn btn-primary btn-lg mt-2" onClick={handleAddPlaceholder}>
              Add Course
            </button>
          </div>
        ) : (
          <>
            {/* CAROUSEL RESPONSIF */}
            <div className="position-relative" style={{ maxWidth: '90%', margin: '0 auto' }}>
              <div
                id="coursesCarousel"
                className="carousel slide"
                data-bs-ride="false"
                data-bs-interval="false"
              >
                <div className="carousel-inner">
                  {cvData.map((item, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === (selectedIndex !== null ? selectedIndex : 0) ? 'active' : ''}`}
                    >
                      <div
                        className="card text-center border-primary shadow-sm mx-auto"
                        style={{
                          maxWidth: '100%',
                          height: 'auto',
                          minHeight: '280px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '2rem 1.5rem',
                        }}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <div className="card-body d-flex flex-column justify-content-center align-items-center">
                          <FaGraduationCap size={48} className="text-primary mb-3" />
                          <h5 className="card-title mb-2 fs-5">
                            {item.courseName || 'Course Name'}
                          </h5>
                          <p className="card-text text-muted mb-1">
                            {item.provider || 'Provider'}
                          </p>
                          <small className="text-muted">{item.year || 'Year'}</small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* NAVIGATION ARROWS - Hanya muncul jika >1 item */}
                {cvData.length > 1 && (
                  <>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target="#coursesCarousel"
                      data-bs-slide="prev"
                    >
                      <IoIosArrowBack size={28} className="text-dark" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                      className="carousel-control-next"
                      type="button"
                      data-bs-target="#coursesCarousel"
                      data-bs-slide="next"
                    >
                      <IoIosArrowForward size={28} className="text-dark" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* FORM EDIT */}
            {selectedIndex !== null && (
              <div className="card mt-4 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title mb-3">Add/Edit Course</h5>
                  <div className="mb-3">
                    <label htmlFor="courseName" className="form-label fw-medium">Course Name</label>
                    <input
                      type="text"
                      id="courseName"
                      name="courseName"
                      value={cvData[selectedIndex]?.courseName || ''}
                      onChange={(e) => handleChange(e, 'courses', selectedIndex)}
                      className="form-control form-control-lg"
                      placeholder="e.g., React Mastery"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="provider" className="form-label fw-medium">Provider</label>
                    <input
                      type="text"
                      id="provider"
                      name="provider"
                      value={cvData[selectedIndex]?.provider || ''}
                      onChange={(e) => handleChange(e, 'courses', selectedIndex)}
                      className="form-control form-control-lg"
                      placeholder="e.g., Coursera"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="year" className="form-label fw-medium">Year</label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      value={cvData[selectedIndex]?.year || ''}
                      onChange={(e) => handleChange(e, 'courses', selectedIndex)}
                      className="form-control form-control-lg"
                      placeholder="e.g., 2024"
                    />
                  </div>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button className="btn btn-primary btn-lg" onClick={handleSaveCourse}>
                      Save
                    </button>
                    <button className="btn btn-danger btn-lg" onClick={handleDeleteCourse}>
                      <FaTrash />
                    </button>
                    <button className="btn btn-secondary btn-lg" onClick={() => setSelectedIndex(null)}>
                      <FaTimes />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ADD BUTTON */}
            <div className="text-center mt-4">
              <button className="btn btn-primary btn-lg px-4" onClick={handleAddPlaceholder}>
                Add Course
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesForm;