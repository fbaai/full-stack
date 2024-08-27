import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import "./TalentsFound.css";

const TalentsFound = () => {
  const location = useLocation(); // Access location object
  const topCVs = location.state?.topCVs || []; // Get the state passed from ProjectDescriptionForm

  return (
    <div className="talents-found-container">
      <h3>Talents Found</h3>
      <div className="talents-list">
        {topCVs.map((cv, index) => (
          <div key={index} className="talent-card">
            <div className="talent-header">
              <p className="talent-name">{cv.name}</p>
              <p className="talent-title">{cv.designation}</p>
            </div>
            <div className="talent-details">
              {cv.context_score && (
                <p className="talent-score">Context Score: {cv.context_score}%</p>
              )}
              {cv.experience && (
                <p className="talent-experience">Experience: {cv.experience}</p>
              )}
              {cv.education && (
                <p className="talent-education">Education: {cv.education}</p>
              )}
              {cv.skills && (
                <p className="talent-skills">Skills: {cv.skills}</p>
              )}
            </div>
            <button className="talent-action-button">ADD/INVITE</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentsFound;
