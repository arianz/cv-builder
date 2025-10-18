import React from 'react';
import PersonalSummaryForm from './personalsummaryform';
import EducationForm from './educationform';
import ExperienceForm from './experienceform';
import LanguageForm from './languageform';
import CoursesForm from './coursesform';
import SkillsForm from './skillsform';

const DynamicForm = ({ activeSection, cvData, handleChange, addItem, removeItem, updateDescription, addDescription, removeDescription, toggleCollapse }) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  switch (activeSection) {
    case 'personalSummary':
      return <PersonalSummaryForm cvData={cvData.personalSummary} handleChange={handleChange} />;
    case 'education':
      return <EducationForm cvData={cvData.education} handleChange={handleChange} addItem={addItem} removeItem={removeItem} updateDescription={updateDescription} addDescription={addDescription} removeDescription={removeDescription} toggleCollapse={toggleCollapse} />;
    case 'experience':
      return <ExperienceForm cvData={cvData.experience} handleChange={handleChange} addItem={addItem} removeItem={removeItem} updateDescription={updateDescription} addDescription={addDescription} removeDescription={removeDescription} toggleCollapse={toggleCollapse} months={months} />;
    case 'language':
      return <LanguageForm cvData={cvData.language} handleChange={handleChange} addItem={addItem} removeItem={removeItem} toggleCollapse={toggleCollapse} />;
    case 'courses':
      return <CoursesForm cvData={cvData.courses} handleChange={handleChange} addItem={addItem} removeItem={removeItem} />;
    case 'skills':
      return <SkillsForm cvData={cvData.skills} handleChange={handleChange} addItem={addItem} initialType="soft" removeItem={removeItem} />;
    default:
      return <div>Select a section</div>;
  }
};

export default DynamicForm;