-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 20, 2024 at 08:38 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `myapp_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cv_analysis`
--

CREATE TABLE `cv_analysis` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `context_score` float DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `experience` varchar(255) DEFAULT NULL,
  `education` varchar(255) DEFAULT NULL,
  `skills` varchar(255) DEFAULT NULL,
  `professional_title` varchar(255) DEFAULT NULL,
  `years_of_experience` varchar(255) DEFAULT NULL,
  `salary_expectation` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cv_analysis`
--

INSERT INTO `cv_analysis` (`id`, `file_name`, `context_score`, `user_id`, `name`, `designation`, `experience`, `education`, `skills`, `professional_title`, `years_of_experience`, `salary_expectation`, `description`) VALUES
(1, NULL, NULL, 5, 'John Doe', 'Senior Data Scientist', '5 years', NULL, 'Python, Data Analysis', 'Senior Data Scientist', '5 years', '$100,000', 'Experienced data scientist with a strong background in Python and data analysis.'),
(2, 'bricv.pdf', 5.08754, 5, 'Brilian Pracoyo Adi', 'Senior', '', 'Bachelor', 'Python, Java, Project Management, Data Analysis, SQL', 'Technical Program Manager', '', '', ''),
(3, 'bricv.pdf', 5.08754, 5, 'Brilian Pracoyo Adi', 'Senior', '', 'Bachelor', 'Python, Java, Project Management, Data Analysis, SQL', 'Technical Program Manager', '', '', ''),
(4, NULL, NULL, 5, 'John Doe', 'Senior Data Scientist', '5 years', NULL, 'Python, Data Analysis', 'Senior Data Scientist', '5 years', '$100,000', 'Experienced data scientist with a strong background in Python and data analysis.'),
(5, NULL, NULL, 5, 'John De', 'Senior Data Scientist', '5 years', NULL, 'Python, Data Analysis', 'Senior Data Scientist', '5 years', '$100,000', 'Experienced data scientist with a strong background in Python and data analysis.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(250) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `first_name`, `password`) VALUES
(1, 'test@example.com', 'John', 'pbkdf2:sha256:600000$09xFDOYeWgZ379WD$f4d41ee38d8a8ff49829505af91f61d3077e939f1bdb1ab23d9f637460355530'),
(2, 'test8@example.com', 'John', 'pbkdf2:sha256:600000$vVc7QiPc7lLfjYsx$d911f7f7eb36962eab604c7cef06966bb18294963fcdfbd13cb06ac5fd8125ba'),
(3, 'test4@example.com', 'John', 'pbkdf2:sha256:600000$Dq9VsWyJenLg0hEk$957d03ad9a73d04a29efa46ada045db626bd216dc3b24070653f58ceaf051552'),
(4, 'test49@example.com', 'John', 'pbkdf2:sha256:600000$xM1gD1GMyBthyZCg$4b80054196822ff5be1bdc90c625f149d4906d53a01ab70b0dcf60029f6f9c94'),
(5, 'test40@example.com', 'John', 'pbkdf2:sha256:600000$b95DgirF0N7uveG8$894607d9c63053c128c6e770f5b54a00dbfe4ae00267e461ed15de796a757d04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cv_analysis`
--
ALTER TABLE `cv_analysis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cv_analysis`
--
ALTER TABLE `cv_analysis`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cv_analysis`
--
ALTER TABLE `cv_analysis`
  ADD CONSTRAINT `cv_analysis_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
