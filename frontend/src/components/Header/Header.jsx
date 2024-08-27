import React from "react";
import styles from "./Header.module.css";

function Header() {
  const navItems = [
    "Home",
    "Search Jobs",
    "Job Alerts",
    "Employers",
    "Career Advice",
  ];
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  // Logout function to call the backend logout route using fetch
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${backendUrl}/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Logout successful
        // Redirect or update UI after logout
        localStorage.removeItem('access_token');

        window.location.href = "/"; // Redirect to home page or login page
      } else {
        // Handle errors
        const errorData = await response.json();
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/cba48e938fe0e43cb36cd15ff6a6dfae41fbf8ecdc39e1f47427c70277cf381f?placeholderIfAbsent=true&apiKey=8a1e4083f58f4588a29f4fafd0874267"
          alt="FBA.ai Logo"
          className={styles.logoImage}
        />
        <span className={styles.logoText}>
          <span className={styles.logoBold}>FBA</span>
          <span className={styles.logoLight}>.ai</span>
        </span>
      </div>
      <nav className={styles.mainNav}>
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={item == "Home" ? "/home" : "#"} className={styles.navLink}>
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className={styles.userActions}>
        <a href="/upload" className={styles.actionLink}>
          Upload CV
        </a>
        <a href="/projectForm" className={styles.actionLink}>
          Recruiting?
        </a>
        <button onClick={handleLogout} className={styles.actionLink}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;
