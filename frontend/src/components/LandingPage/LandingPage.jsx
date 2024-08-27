import React from 'react';
import "./styles.css"; // Assuming you have some CSS for styling
import logoIcon from "./images/logo.png";
import wordlogoIcon from "./images/word-logo.png";
import iconGoogle from "./images/google-logo.png";
import iconYT from "./images/yt_new.png";
import iconApple from "./images/apple-logo.png";
import iconATT from "./images/at_t.png";
import iconWC from "./images/WC-logo.png";
import iconTT from "./images/tt-logo.png";
import locationIcon from "./images/location-icon.png";
import baggageIcon from "./images/baggage-icon.png";
import cashIcon from "./images/cash-icon.png";
import clockIcon from "./images/clock-icon.png";
import iconMitsubishi from "./images/mitsubishi.png";
import iconVodaphone from "./images/vodafone.png";
import iconPepsi from "./images/pepsi.png";
import iconAppleCircle from "./images/apple.png";
import iconMicrosoft from "./images/microsoft.png";
import iconShell from "./images/shell.png";
import iconLG from "./images/lg.png";
import iconMeta from "./images/meta.png";
import iconRAH from "./images/right-arrowhead.png";


const LandingPage = () => {
  if (!localStorage.getItem('access_token')) {
    window.location.href = '/';
  }
    return (
        <div>
  <meta charSet="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Job Search</title>
  <link rel="stylesheet" href="css/styles.css" />
  <header>
    <div className="container">
  <div className="logo">
    <img src={logoIcon} alt="Logo" />
    <img src={wordlogoIcon} alt="Word Logo" />
  </div>
  <nav>
    <ul>
      <li>
        <a href="#">Find Jobs</a>
      </li>
      <li>
        <a href="#">Companies</a>
      </li>
      <li>
        <a href="#">Career Mentoring</a>
      </li>
    </ul>
  </nav>
</div>
  </header>
  <main>
    <section className="hero">
      <p>
        <strong>#1</strong> PLATFORM FOR JOBS
      </p>
      <h1>
        Find Your <span className="highlight">Dream Job</span> That Suit With
        Exciting Opportunities
      </h1>
      <p>
        Embark on a journey towards your dream career, your ultimate job-finding
        companion! We’ve curated a platform that connects talented individuals
        with exciting opportunities.
      </p>
      <div className="search-bar">
        <input type="text" placeholder="Job title, Salary, or Companies..." />
        <button>Explore Now</button>
      </div>
      <div className="popular-categories">
        <span>Popular Categories:</span>
        <a href="#">Product Manager</a>
        <a href="#">Frontend Dev</a>
        <a href="#">Data Analyst</a>
      </div>
      <div className="statistics">
        <div>
          <h3>Live Jobs</h3>
          <p>30000+</p>
        </div>
        <div>
          <h3>Daily Job Post</h3>
          <p>5000+</p>
        </div>
        <div>
          <h3>People Get Hired</h3>
          <p>25000+</p>
        </div>
        <div>
          <h3>Companies</h3>
          <p>1000+</p>
        </div>
      </div>
    </section>
    <section className="latest-jobs">
      <h2>
        Latest Featured <span className="highlight">Jobs</span>
      </h2>
      <p>
        Search and find your dream job is now easier than ever. Just browse a
        job and apply if you need to.
      </p>
      <div className="job-cards">
        {/* Job Card Example */}
        <div className="job-card">
          <div className="job-header">
            <img
              src={iconGoogle}
              alt="Google Logo"
              className="company-logo"
            />
            <div className="job-header-content">
              <div className="job-header-container">
                <h3>Senior UI/UX</h3>
                <p>Google Chrome</p>
              </div>
            </div>
            <button className="save-button">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="save-icon"
              >
                <path
                  d="M1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19L9.082 15.195C8.7593 14.9874 8.3837 14.877 8 14.877C7.6163 14.877 7.2407 14.9874 6.918 15.195L1 19Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="job-location">
            <p>
              <img
                src={locationIcon}
                alt="Location Icon"
                className="location-icon"
              />{" "}
              London
            </p>
            <p>
              <img
                src={baggageIcon}
                alt="Full-Time Icon"
                className="baggage-icon"
              />{" "}
              Full-Time
            </p>
            <p>
              <img
                src={cashIcon}
                alt="Salary Icon"
                className="cash-icon"
              />{" "}
              Negotiable
            </p>
          </div>
          <div className="job-footer">
            <span>Remote</span>
            <span>Priority slots available</span>
            <span>
              <img
                src={clockIcon}
                alt="Clock Icon"
                className="clock-icon"
              />{" "}
              2 days ago
            </span>
          </div>
        </div>
        {/* Repeat the job-card div for other jobs */}
        <div className="job-card">
          <div className="job-header">
            <img
              src={iconYT}
              alt="YT Logo"
              className="company-logo"
            />
            <div className="job-header-content">
              <div className="job-header-container">
                <h3>Data Analyst</h3>
                <p>YouTube</p>
              </div>
            </div>
            <button className="save-button">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="save-icon"
              >
                <path
                  d="M1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19L9.082 15.195C8.7593 14.9874 8.3837 14.877 8 14.877C7.6163 14.877 7.2407 14.9874 6.918 15.195L1 19Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="job-location">
            <p>
              <img
                src={locationIcon}
                alt="Location Icon"
                className="location-icon"
              />{" "}
              Manchester
            </p>
            <p>
              <img

                src={baggageIcon}
                alt="Full-Time Icon"
                className="baggage-icon"
              />{" "}
              Full-Time
            </p>
            <p>
              <img
                src={cashIcon}
                alt="Salary Icon"
                className="cash-icon"
              />{" "}
              Negotiable
            </p>
          </div>
          <div className="job-footer">
            <span>Remote</span>
            <span>Priority slots available</span>
            <span>
              <img
                src={clockIcon}
                alt="Clock Icon"
                className="clock-icon"
              />{" "}
              30 minutes ago
            </span>
          </div>
        </div>
        <div className="job-card">
          <div className="job-header">
            <img
              src={iconApple}
              alt="Apple_logo Logo"
              className="company-logo"
            />
            <div className="job-header-content">
              <div className="job-header-container">
                <h3>iOS Developer</h3>
                <p>Apple</p>
              </div>
            </div>
            <button className="save-button">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="save-icon"
              >
                <path
                  d="M1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19L9.082 15.195C8.7593 14.9874 8.3837 14.877 8 14.877C7.6163 14.877 7.2407 14.9874 6.918 15.195L1 19Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="job-location">
            <p>
              <img
                src={locationIcon}
                alt="Location Icon"
                className="location-icon"
              />{" "}
              London
            </p>
            <p>
              <img
                src={baggageIcon}
                alt="Full-Time Icon"
                className="baggage-icon"
              />{" "}
              Full-Time
            </p>
            <p>
              <img
                src={cashIcon}
                alt="Salary Icon"
                className="cash-icon"
              />{" "}
              Negotiable
            </p>
          </div>
          <div className="job-footer">
            <span>Remote</span>
            <span>Priority slots available</span>
            <span>
              <img
                src={clockIcon}
                alt="Clock Icon"
                className="clock-icon"
              />{" "}
              30 minutes ago
            </span>
          </div>
        </div>
        <div className="job-card">
          <div className="job-header">
            <img
              src={iconWC}
              alt="Google Logo"
              className="company-logo"
            />
            <div className="job-header-content">
              <div className="job-header-container">
                <h3>Junior </h3>
                <p>WeChat</p>
              </div>
            </div>
            <button className="save-button">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="save-icon"
              >
                <path
                  d="M1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19L9.082 15.195C8.7593 14.9874 8.3837 14.877 8 14.877C7.6163 14.877 7.2407 14.9874 6.918 15.195L1 19Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="job-location">
            <p>
              <img
                src={locationIcon}
                alt="Location Icon"
                className="location-icon"
              />{" "}
              Belfast
            </p>
            <p>
              <img
                src={baggageIcon}
                alt="Full-Time Icon"
                className="baggage-icon"
              />{" "}
              Full-Time
            </p>
            <p>
              <img
                src={cashIcon}
                alt="Salary Icon"
                className="cash-icon"
              />{" "}
              Negotiable
            </p>
          </div>
          <div className="job-footer">
            <span>Remote</span>
            <span>Priority slots available</span>
            <span>
              <img
                src={clockIcon}
                alt="Clock Icon"
                className="clock-icon"
              />{" "}
              4 days ago
            </span>
          </div>
        </div>
        <div className="job-card">
          <div className="job-header">
            <img
              src={iconATT}
              alt="AT&T Logo"
              className="company-logo"
            />
            <div className="job-header-content">
              <div className="job-header-container">
                <h3>Web Developer</h3>
                <p>AT&amp;T</p>
              </div>
            </div>
            <button className="save-button">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="save-icon"
              >
                <path
                  d="M1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19L9.082 15.195C8.7593 14.9874 8.3837 14.877 8 14.877C7.6163 14.877 7.2407 14.9874 6.918 15.195L1 19Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="job-location">
            <p>
              <img
                src={locationIcon}
                alt="Location Icon"
                className="location-icon"
              />{" "}
              Leeds
            </p>
            <p>
              <img
                src={baggageIcon}
                alt="Full-Time Icon"
                className="baggage-icon"
              />{" "}
              Full-Time
            </p>
            <p>
              <img
                src={cashIcon}
                alt="Salary Icon"
                className="cash-icon"
              />{" "}
              Negotiable
            </p>
          </div>
          <div className="job-footer">
            <span>Remote</span>
            <span>Priority slots available</span>
            <span>
              <img
                src={clockIcon}
                alt="Clock Icon"
                className="clock-icon"
              />{" "}
              50 minutes ago
            </span>
          </div>
        </div>
        <div className="job-card">
          <div className="job-header">
            <img
              src={iconTT}
              alt="TT Logo"
              className="company-logo"
            />
            <div className="job-header-content">
              <div className="job-header-container">
                <h3>Data Engineer</h3>
                <p>TikTok</p>
              </div>
            </div>
            <button className="save-button">
              <svg
                width={16}
                height={20}
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="save-icon"
              >
                <path
                  d="M1 19V3C1 2.46957 1.21071 1.96086 1.58579 1.58579C1.96086 1.21071 2.46957 1 3 1H13C13.5304 1 14.0391 1.21071 14.4142 1.58579C14.7893 1.96086 15 2.46957 15 3V19L9.082 15.195C8.7593 14.9874 8.3837 14.877 8 14.877C7.6163 14.877 7.2407 14.9874 6.918 15.195L1 19Z"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="job-location">
            <p>
              <img
                src={locationIcon}
                alt="Location Icon"
                className="location-icon"
              />{" "}
              Edinburgh
            </p>
            <p>
              <img
                src={baggageIcon}
                alt="Full-Time Icon"
                className="baggage-icon"
              />{" "}
              Full-Time
            </p>
            <p>
              <img
                src={cashIcon}
                alt="Salary Icon"
                className="cash-icon"
              />{" "}
              Negotiable
            </p>
          </div>
          <div className="job-footer">
            <span>Remote</span>
            <span>Priority slots available</span>
            <span>
              <img
                src={clockIcon}
                alt="Clock Icon"
                className="clock-icon"
              />{" "}
              50 minutes ago
            </span>
          </div>
        </div>
      </div>
      <button className="view-all-jobs">View All Jobs</button>
      <div className="company-class-header-container">
        <div className="text-content">
          <h1>
            Choose Your Dream <span className="highlight">Companies</span>
          </h1>
          <p>
            Start your journey towards a fulfilling career by exploring the top
            companies that are actively seeking talented individuals like you.
          </p>
        </div>
        <button className="view-all-companies">View All Companies</button>
      </div>
      <div className="company-cards">
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconMitsubishi}
              alt="Mitsubishi Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Mitsubishi</h2>
              <p>64 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconVodaphone}
              alt="Vodaphone Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Vodafone</h2>
              <p>50 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconPepsi}
              alt="Pepsi Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Pepsi</h2>
              <p>50 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconAppleCircle}
              alt="Apple Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Apple</h2>
              <p>30 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconMicrosoft}
              alt="Microsoft Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Microsoft</h2>
              <p>56 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconShell}
              alt="Shell Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Shell</h2>
              <p>53 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img src={iconLG} alt="LG Logo" className="company-logo" />
            <div className="company-details">
              <h2>LG</h2>
              <p>42 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
        <div className="company-card">
          <div className="company-header">
            <img
              src={iconMeta}
              alt="Meta Logo"
              className="company-logo"
            />
            <div className="company-details">
              <h2>Meta</h2>
              <p>102 Jobs available</p>
            </div>
          </div>
          <p className="company-description">
            Search and find your dream job is now easier than ever. Just browse
            a job and apply if you need to.
          </p>
          <div className="company-buttons">
            <button>Full Time</button>
            <button>Remote</button>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer className="footer">
    <div className="footerContent">
      <section className="callToAction">
        <h2 className="ctaTitle">
          Explore Your <span className="highlight">Next Career</span> Move
        </h2>
        <p className="ctaDescription">
          Are you ready to take the next step in your career? JobLink helps you
          discover exciting opportunities tailored to your skills and
          aspirations.
        </p>
        <button className="signUpButton">Sign Up Now</button>
      </section>
      <div className="footerDivider" />
      <div className="footerNavAndNewsletter">
        <nav className="footerNav">
          <ul>
            <li>
              <a href="#" className="footerLink">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="footerLink">
                Find Jobs
              </a>
            </li>
            <li>
              <a href="#" className="footerLink">
                Companies
              </a>
            </li>
            <li>
              <a href="#" className="footerLink">
                Mentoring
              </a>
            </li>
          </ul>
        </nav>
        <section className="newsletter">
          <h3 className="newsletterTitle">
            Subscribe to <br /> our newsletter
          </h3>
          <form className="subscribeForm">
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              className="emailInput"
            />
            <button type="submit" className="submitButton">
              <img
                src={iconRAH}
                alt="Submit"
                className="submitIcon"
              />
            </button>
          </form>
        </section>
      </div>
    </div>
  </footer>
  <link rel="stylesheet" href="css/styles.css" />

</div>
);
};
export default LandingPage;