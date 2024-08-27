import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const ProjectDescriptionForm = () => {
  const [formData, setFormData] = useState({
    goal: "",
    objectives: "",
    deliverables: "",
    scope: "",
    requirements: "",
    dependencies: "",
    risks: "",
    exclusions: "",
    skills: "",
    timeline: "",
  });
  const navigate = useNavigate();
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  if (!localStorage.getItem('access_token')) {
    window.location.href = '/';
  }
  const [topCVs, setTopCVs] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const sampleJDText = `
      Goal: ${formData.goal}\n
      Objectives: ${formData.objectives}\n
      Deliverables: ${formData.deliverables}\n
      Scope: ${formData.scope}\n
      Requirements: ${formData.requirements}\n
      Dependencies: ${formData.dependencies}\n
      Risks: ${formData.risks}\n
      Exclusions: ${formData.exclusions}\n
      Skills: ${formData.skills}\n
      Timeline: ${formData.timeline}
    `;

    try {
      const token = localStorage.getItem('access_token');
      console.log("token", token);
      const response = await fetch(`${backendUrl}/cv/analyze?sample_jd=` + encodeURIComponent(sampleJDText), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Form Data Submitted:", sampleJDText);
      console.log("Response from server:", data);

      // Update state with top CVs returned from the server
      setTopCVs(data);

      navigate('/talents-found', { state: { topCVs: data } });

    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };


  return (
    <div
      style={{
        display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // minHeight: "100vh",
        width: "100%", // Ensure it takes full width
        padding: "0",
        marginLeft: "100px",
        // boxSizing: "border-box", // Adjust for padding
        backgroundColor: "transparent", // Background color
      }}
    >
      <div
        style={{
          maxWidth: "1200px", // Maximum width of the form container
          width: "100%",
          padding: "20px",
          backgroundColor: "white", // Form background color
          borderRadius: "8px",
        //   boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        //   boxSizing: "border-box", // Adjust for padding
        }}
      >
        <h2 style={{ textAlign: "center", color: "#1f0775" }}>Project Description</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 48%", marginBottom: "20px" }}>
              <div style={{ marginBottom: "20px",  paddingRight: "50px" }}>
                <label>What is the main goal of the project?</label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px", paddingRight: "50px" }}>
                <label>What are the specific objectives to achieve the goal?</label>
                <input
                  type="text"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px", paddingRight: "50px" }}>
                <label>What are the main deliverables?</label>
                <input
                  type="text"
                  name="deliverables"
                  value={formData.deliverables}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px", paddingRight: "50px"}}>
                <label>What is the scope of the project?</label>
                <input
                  type="text"
                  name="scope"
                  value={formData.scope}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px", paddingRight: "50px"}}>
                <label>What are the requirements for the project?</label>
                <input
                  type="text"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
            </div>

            <div style={{ flex: "1 1 48%", marginBottom: "20px"}}>
              <div style={{ marginBottom: "20px" }}>
                <label>What are the dependencies?</label>
                <input
                  type="text"
                  name="dependencies"
                  value={formData.dependencies}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px"}}>
                <label>What are the risks?</label>
                <input
                  type="text"
                  name="risks"
                  value={formData.risks}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>What should be excluded from the project?</label>
                <input
                  type="text"
                  name="exclusions"
                  value={formData.exclusions}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>What skills and roles are needed?</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>What is the timeline and key milestones?</label>
                <input
                  type="text"
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#258df5",
                color: "white",
                border: "none",
                borderRadius: "4px",
              }}
            >
              Submit
            </button>
          </div>
        </form>
        {/* Display the top 5 CVs */}
      {topCVs.length > 0 && (
        <div>
          <h3>Top 5 Matching CVs:</h3>
          <ul>
            {topCVs.map((cv, index) => (
              <li key={index}>
                <strong>{cv.file_name}</strong> - Score: {cv.context_score.toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProjectDescriptionForm;
