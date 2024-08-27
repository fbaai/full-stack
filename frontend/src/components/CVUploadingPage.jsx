import React, { useState, useRef } from "react";
import "./styles.css"; // Ensure CSS files are imported
import iconUpload from "./images/upload.png";
import iconGoogleDrive from "./images/google-drive.png";
import iconDropbox from "./images/dropbox.png";
import screenshotImage from "./images/Screenshot (495).png";

const CVUploadingPage = () => {
  const [activeTab, setActiveTab] = useState("uploadCV");
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    yoe: "",
    salaryExpectations: "",
    jd: "",
    ee: "",
    we: "",
  });
  if (!localStorage.getItem('access_token')) {
    window.location.href = '/';
  }
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  if (!localStorage.getItem('access_token')) {
    window.location.href = '/';
  }
  // Handle tab switching
  const openTab = (tabId) => {
    setActiveTab(tabId);
  };

  // Handle text input and update preview
  const handleInputChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(files); // Update state with selected files
  };
  
  const handleFileUpload = async () => {
    console.log("url ", `${backendUrl}/cv/upload`, uploadedFiles)
    if (uploadedFiles.length === 0) return;
  
    const formData = new FormData();
    uploadedFiles.forEach((file) => formData.append('file', file));
    const jobTitle = document.getElementById('jt').value;
    if (!jobTitle) {
        alert('Please enter a job title');
        return;
    }
    formData.append('job_title', jobTitle);

    try {
      console.log("up", formData)
      const token = localStorage.getItem('access_token');
      console.log("token", token);
      const response = await fetch(`${backendUrl}/cv/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload files');
      }
  
      alert('Files uploaded successfully');
    } catch (error) {
      console.error(error);
    }
  };
  

    
  const handleSubmitCVData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${backendUrl}/cv/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to submit CV data');
      }
  
      alert('CV data submitted successfully');
    } catch (error) {
      console.error(error);
    }
  };
  

  // Handle reset preview
  const resetPreview = () => {
    setFormData({
      name: "",
      skills: "",
      yoe: "",
      salaryExpectations: "",
      jd: "",
      ee: "",
      we: "",
    });
  };

  // Determine whether to show the screenshot image
  const showImage = !(
    activeTab === "createCV" && (
      formData.name ||
      formData.skills ||
      formData.yoe ||
      formData.salaryExpectations ||
      formData.jd ||
      formData.ee ||
      formData.we
    ) ||
    activeTab === "uploadCV" && uploadedFiles.length > 0
  );

  return (
    <div className="container">
      <div className="content-wrapper">
        <div className="two-column-layout">
          {/* Left Column */}
          <div className="left-column">
            {/* Tab Navigation */}
            <div className="tab-bar">
              <button
                className={`tab-button ${
                  activeTab === "uploadCV" ? "active" : ""
                }`}
                onClick={() => openTab("uploadCV")}
              >
                Upload your CV
              </button>
              <button
                className={`tab-button ${
                  activeTab === "createCV" ? "active" : ""
                }`}
                onClick={() => openTab("createCV")}
              >
                Create your CV
              </button>
            </div>

            {/* Tab Content */}
            <div className="form-content">
              {/* Upload CV Tab Content */}
              {activeTab === "uploadCV" && (
                <div id="uploadCV" className="tab-content active">

                  <p>Add your CV to discover the jobs easily.</p>
                  <div className="form-group">
                    <h2>Job Title</h2>
                    <textarea
                      id="jt"
                      placeholder="Enter desired job title"
                      required
                    ></textarea>
                  </div>
                  <div className="upload-options">
                    <h2>Upload Options</h2>
                  </div>
                  <form
                    className="upload-form"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <input
                      type="file"
                      id="cvFile"
                      accept=".pdf,.doc,.docx"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileChange} // Ensure onChange is triggered correctly
                    />
                    <label
                      htmlFor="cvFile"
                      className="upload-option upload-from-local-storage"
                    >
                      <span className="text-container">Upload from local storage</span>
                      <img
                        src={iconUpload}
                        alt="Upload Icon"
                        className="file-icon"
                      />
                    </label>
                    <a
                      href="https://drive.google.com/drive/my-drive"
                      className="upload-option upload-from-google-drive"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-container">Upload from Google Drive</span>
                      <img
                        src={iconGoogleDrive}
                        alt="Google Drive Icon"
                        className="icon-google-drive"
                      />
                    </a>
                    <a
                      href="https://www.dropbox.com/home"
                      className="upload-option upload-from-dropbox"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="text-container">Upload from Dropbox</span>
                      <img
                        src={iconDropbox}
                        alt="Dropbox Icon"
                        className="file-icon-dropbox"
                      />
                    </a>
                    <p className="upload-info">
                      We accept DOCX, PDF, TXT files up to 2MB<br />
                      It is expected for your CV to be within 2 pages.
                    </p>
                    <div className="button-container">
                    <button
                        type="button"
                        className="upload-btn upload-btn-primary"
                        onClick={handleFileUpload}
                      >
                        Upload CV
                      </button>
                     <button
                      type="reset"
                      className="upload-btn upload-btn-cancel"
                      onClick={resetPreview}
                      >
                      Cancel
                    </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Create CV Tab Content */}
              {activeTab === "createCV" && (
                <div id="createCV" className="tab-content active">
                  <h1></h1>
                  <p>Craft your CV to stand out in the job market.</p>
                  <form className="create-form">
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Enter your name"
                        required
                        onInput={(e) => handleInputChange(e, "name")}
                        value={formData.name}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="skills">Skills</label>
                      <textarea
                        id="skills"
                        placeholder="Enter your skills"
                        rows="8"
                        required
                        onInput={(e) => handleInputChange(e, "skills")}
                        value={formData.skills}
                        style={{
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="yoe">Years of Experience</label>
                      <input
                        type="text"
                        id="yoe"
                        placeholder="Specify your years of experience"
                        required
                        onInput={(e) => handleInputChange(e, "yoe")}
                        value={formData.yoe}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="salary-expectations">
                        Salary Expectations
                      </label>
                      <input
                        type="text"
                        id="salary-expectations"
                        placeholder="Your expected salary in GBP"
                        required
                        onInput={(e) =>
                          handleInputChange(e, "salaryExpectations")
                        }
                        value={formData.salaryExpectations}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="jd">Job Description</label>
                      <textarea
                        id="jd"
                        placeholder="Enter your job description"
                        rows="4"
                        required
                        onInput={(e) => handleInputChange(e, "jd")}
                        value={formData.jd}
                        style={{
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="ee">Educational Experience</label>
                      <textarea
                        id="ee"
                        placeholder="Enter your educational experience"
                        rows="8"
                        required
                        onInput={(e) => handleInputChange(e, "ee")}
                        value={formData.ee}
                        style={{
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      ></textarea>
                    </div>
                    <div className="form-group">
                      <label htmlFor="we">Work Experience</label>
                      <textarea
                        id="we"
                        placeholder="Enter your work experience"
                        rows="8"
                        required
                        onInput={(e) => handleInputChange(e, "we")}
                        value={formData.we}
                        style={{
                          overflowWrap: "break-word",
                          whiteSpace: "pre-wrap",
                        }}
                      ></textarea>
                    </div>
                     <div className="button-container">
                     <button
                      type="button"
                      className="create-btn create-btn-primary"
                      onClick={handleSubmitCVData}
                     >
                      Create CV
                     </button>
                     <button
                      type="reset"
                      className="create-btn create-btn-cancel"
                      onClick={resetPreview}
                      >
                      Cancel
                    </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (Preview) */}
          <div className="right-column">
            <h2></h2>

            {/* Conditionally Render the Screenshot Image */}
            {showImage ? (
              <div className="image-container">
                <img
                  src={screenshotImage}
                  alt="Screenshot Preview"
                  className="screenshot-image"
                />
              </div>
            ) : (
              <div className="preview-content">
                {/* Preview Section for Upload CV */}
                {activeTab === "uploadCV" && (
                  <>
                    <p>Uploaded Files:</p>
                    <ul>
                      {uploadedFiles.length > 0 ? (
                        uploadedFiles.map((file, index) => (
                          <li key={index}>{file.name}</li> // Display file names
                        ))
                      ) : (
                        <li>No files uploaded</li>
                      )}
                    </ul>
                  </>
                )}

                {/* Preview Section for Create CV */}
                {activeTab === "createCV" && (
                  <>
                    <p><strong>Name:</strong> {formData.name}</p>
                    <p><strong>Skills:</strong> {formData.skills}</p>
                    <p><strong>Years of Experience:</strong> {formData.yoe}</p>
                    <p><strong>Salary Expectations:</strong> {formData.salaryExpectations}</p>
                    <p><strong>Job Description:</strong> {formData.jd}</p>
                    <p><strong>Educational Experience:</strong> {formData.ee}</p>
                    <p><strong>Work Experience:</strong> {formData.we}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVUploadingPage;



