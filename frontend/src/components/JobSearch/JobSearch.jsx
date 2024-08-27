
import React from "react";

import styles from "./JobSearch.module.css";
import Header from "../Header/Header";
import SearchBar from "../SearchBar/SearchBar";
import JobDetails from "../JobDetails/JobDetails";
import Footer from "../Footer/Footer";

function JobSearch() {
  return (
    <div className={styles.jobSearchDescription}>
      {/*<Header /> */}
      <main className={styles.mainContent}>
        <SearchBar />
        <h1 className={styles.jobsDetails}>Jobs Details</h1>
        <JobDetails />
      </main>
      
      {/*<Footer /> */}

    </div>
  );
}

export default JobSearch;
