import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaTrash, FaTimes } from 'react-icons/fa';

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
    // This ensures the carousel reflects the updated cvData
    // Note: Bootstrap carousel reinitialization might require additional JS
  }, [cvData]);

  return (
    <div className="mb-4">
      <h2 className="h5 fw-bold text-primary text-center mt-5 mb-4">Courses</h2>
      {cvData.length === 0 ? (
        <div className="text-center">
          <p>No courses entries yet.</p>
          <button
            className="btn btn-primary"
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
            style={{ maxWidth: '500px', margin: '0 auto' }}
          >
            <div className="carousel-inner">
              {cvData.map((item, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === (selectedIndex !== null ? selectedIndex : 0) ? 'active' : ''}`}
                >
                  <div
                    className="card text-center p-3 border-primary m-lg-auto"
                    style={{ width: '500px', height: '300px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setSelectedIndex(index)}
                  >
                    <div className="card-body d-flex flex-column justify-content-center">
                      <h5 className="card-title mb-1">{item.courseName || 'Course Name'}</h5>
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
            <div className="card mt-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Add/Edit Course</h5>
                <div className="mb-3">
                  <label htmlFor="courseName" className="form-label">Course Name</label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={cvData[selectedIndex]?.courseName || ''}
                    onChange={(e) => handleChange(e, 'courses', selectedIndex)}
                    className="form-control"
                    placeholder="Course Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="provider" className="form-label">Provider</label>
                  <input
                    type="text"
                    id="provider"
                    name="provider"
                    value={cvData[selectedIndex]?.provider || ''}
                    onChange={(e) => handleChange(e, 'courses', selectedIndex)}
                    className="form-control"
                    placeholder="Provider"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="year" className="form-label">Year</label>
                  <input
                    type="text"
                    id="year"
                    name="year"
                    value={cvData[selectedIndex]?.year || ''}
                    onChange={(e) => handleChange(e, 'courses', selectedIndex)}
                    className="form-control"
                    placeholder="Year"
                  />
                </div>
                <div className="d-flex justify-content-center gap-2">
                  <button className="btn btn-primary" onClick={handleSaveCourse}>Save</button>
                  <button className="btn btn-danger" onClick={handleDeleteCourse}><FaTrash /></button>
                  <button className="btn btn-secondary" onClick={() => setSelectedIndex(null)}><FaTimes /></button>
                </div>
              </div>
            </div>
          )}
          <div className="text-center mt-3">
            <button
              className="btn btn-primary"
              onClick={handleAddPlaceholder}
            >
              Add Course
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesForm;