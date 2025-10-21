import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaTrash, FaTimes, FaGraduationCap } from 'react-icons/fa';

const CoursesForm = ({ cvData, handleChange, addItem, removeItem }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleAddPlaceholder = () => {
    addItem('courses');
    setSelectedIndex(cvData.length); // Set to the new index after adding
  };

  const handleSaveCourse = () => {
    setSelectedIndex(null);
  };

  const handleDeleteCourse = () => {
    if (selectedIndex !== null && removeItem) {
      removeItem('courses', selectedIndex);
      setSelectedIndex((prev) => {
        // Reset to null or the new first index if available
        return cvData.length > 1 ? 0 : null;
      });
    }
  };

  // Effect to reinitialize carousel when cvData changes
  useEffect(() => {
  }, [cvData]);

  return (
    <div className="container">
      <div className="p-4">
        <h2 className="h4 fw-bold text-primary text-center mb-4">Courses</h2>
        {cvData.length === 0 ? (
          <div className="text-center">
            <p className="text-muted">No courses entries yet.</p>
            <button
              className="btn btn-primary btn-lg mt-2"
              onClick={handleAddPlaceholder}
            >
              Add Course
            </button>
          </div>
        ) : (
          <>
            <div
              id="coursesCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <div className="carousel-inner">
                {cvData.map((item, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === (selectedIndex !== null ? selectedIndex : 0) ? 'active' : ''}`}
                  >
                    <div
                      className="card text-center p-4 border-primary m-lg-auto"
                      style={{ width: '600px', height: '300px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => setSelectedIndex(index)}
                    >
                      <div className="card-body d-flex flex-column justify-content-center align-items-center">
                        <FaGraduationCap size={50} className="text-primary mb-3" />
                        <h5 className="card-title mb-2">{item.courseName || 'Course Name'}</h5>
                        <p className="card-text text-muted">{item.provider || 'Provider'}</p>
                        <small className="text-muted">{item.year || 'Year'}</small>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cvData.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#coursesCarousel"
                    data-bs-slide="prev"
                    style={{ left: '10px', zIndex: 1 }}
                  >
                    <IoIosArrowBack size={20} color='#000' />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#coursesCarousel"
                    data-bs-slide="next"
                    style={{ right: '10px', zIndex: 1 }}
                  >
                    <IoIosArrowForward size={20} color='#000' />
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
            {selectedIndex !== null && (
              <div className="card mt-5">
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
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Course Name"
                      required
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
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Provider"
                      required
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
                      className="form-control form-control-lg shadow-sm"
                      placeholder="Year"
                      required
                    />
                  </div>
                  <div className="d-flex justify-content-center gap-2">
                    <button className="btn btn-primary btn-lg shadow-sm" onClick={handleSaveCourse}>Save</button>
                    <button className="btn btn-danger btn-lg shadow-sm" onClick={handleDeleteCourse}><FaTrash /></button>
                    <button className="btn btn-secondary btn-lg shadow-sm" onClick={() => setSelectedIndex(null)}><FaTimes /></button>
                  </div>
                </div>
              </div>
            )}
            <div className="text-center mt-4">
              <button
                className="btn btn-primary btn-lg"
                onClick={handleAddPlaceholder}
              >
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