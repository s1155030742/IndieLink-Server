-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 27, 2015 at 05:51 PM
-- Server version: 5.5.46-0ubuntu0.14.04.2
-- PHP Version: 5.5.9-1ubuntu4.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `IndieLink`
--
CREATE DATABASE IF NOT EXISTS `IndieLink` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `IndieLink`;

-- --------------------------------------------------------

--
-- Table structure for table `Band`
--

CREATE TABLE `Band` (
  `band_id` int(6) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `about_me` varchar(512) DEFAULT NULL,
  `blues` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `country` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `electronic` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `hard_rock` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `britpop` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `jazz` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `pop_rock` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `metal` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `post_rock` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Band`
--

INSERT INTO `Band` (`band_id`, `name`, `about_me`, `blues`, `country`, `electronic`, `hard_rock`, `britpop`, `jazz`, `pop_rock`, `metal`, `post_rock`, `create_date`) VALUES
(1, 'demo1', 'demo1 about me', 4, 4, 1, 5, 6, 1, 1, 2, 1, '2015-12-05 12:44:42'),
(2, 'demo2', 'demo2 about me', 1, 1, 1, 7, 1, 1, 3, 7, 1, '2015-12-05 12:44:42'),
(3, 'DreamSoda', 'We are formed in 2012, aim to bring fresh, acoustic sound to everyone', 6, 6, 1, 1, 4, 1, 6, 1, 1, '2015-12-10 08:56:40'),
(4, 'Rage', 'We spread our rage to the system and society by Brutal sound', 1, 1, 1, 3, 1, 1, 1, 7, 1, '2015-12-10 08:58:52'),
(5, 'Android', '21 century digital music', 1, 1, 7, 3, 1, 3, 6, 1, 1, '2015-12-10 08:59:50'),
(6, 'bandName', 'bandStyle', 2, 3, 6, 6, 3, 3, 4, 5, 6, '2015-12-10 13:36:52'),
(8, 'one digestion', 'about digesting one direction', 1, 1, 1, 1, 1, 6, 6, 6, 7, '2015-12-10 13:59:57'),
(9, 'xXx', 'xXx', 6, 1, 2, 2, 3, 1, 3, 1, 3, '2015-12-10 14:11:49'),
(10, 'killer', 'we play A7Xsongs', 3, 3, 4, 1, 1, 1, 7, 6, 2, '2015-12-10 14:16:01'),
(11, 'cannon', 'just for fun', 6, 6, 1, 2, 2, 2, 2, 1, 1, '2015-12-10 14:18:35'),
(12, 'sadness', 'sosad', 4, 4, 4, 4, 4, 4, 4, 4, 4, '2015-12-10 14:24:53'),
(13, '13', '13', 5, 5, 1, 1, 7, 7, 7, 4, 4, '2015-12-10 14:40:40'),
(14, '14', 'bandStyle14', 5, 3, 5, 6, 1, 7, 1, 1, 2, '2015-12-10 14:42:50'),
(16, '17', '17', 4, 6, 3, 3, 6, 2, 2, 2, 4, '2015-12-10 15:01:31'),
(17, 'ggg', 'ggg', 3, 6, 1, 2, 5, 2, 3, 1, 2, '2015-12-10 15:03:24'),
(18, 'bandName3', 'bandStyle', 2, 7, 3, 3, 5, 2, 6, 2, 3, '2015-12-10 15:04:31'),
(19, 'bandNamec', 'bandStyle', 2, 2, 3, 3, 3, 3, 3, 4, 5, '2015-12-10 15:05:34'),
(20, 'bandNamexxxxx', 'bandStyle', 1, 1, 1, 2, 2, 6, 3, 3, 3, '2015-12-10 15:06:10'),
(21, 'bandNamedsdd', 'bandStyle', 1, 2, 5, 3, 6, 6, 2, 3, 3, '2015-12-10 15:07:34'),
(22, 'bandNameccc', 'bandStyle', 1, 2, 2, 2, 6, 7, 7, 6, 1, '2015-12-10 15:11:01');

-- --------------------------------------------------------

--
-- Table structure for table `BandDetail`
--

CREATE TABLE `BandDetail` (
  `band_detail_id` int(6) UNSIGNED NOT NULL,
  `instrument` varchar(50) NOT NULL,
  `band_id` int(6) UNSIGNED NOT NULL,
  `user_id` int(6) UNSIGNED DEFAULT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `BandDetail`
--

INSERT INTO `BandDetail` (`band_detail_id`, `instrument`, `band_id`, `user_id`, `create_date`) VALUES
(36, 'drum', 3, 1, '2015-12-11 01:33:27'),
(37, 'drum', 4, 4, '2015-12-10 16:16:45'),
(38, 'drum', 5, 4, '2015-12-10 16:16:45'),
(39, 'drum', 1, 2, '2015-12-11 01:27:13'),
(40, 'drum', 2, 4, '2015-12-10 16:16:45'),
(41, 'vocal', 2, 1, '2015-12-11 01:30:46'),
(42, 'vocal', 3, 5, '2015-12-11 01:33:40'),
(43, 'vocal', 4, 4, '2015-12-10 16:16:45'),
(44, 'vocal', 5, 4, '2015-12-10 16:16:45'),
(45, 'guitar', 1, 4, '2015-12-10 16:16:45'),
(46, 'guitar', 3, 2, '2015-12-11 01:27:17'),
(48, 'guitar', 8, 4, '2015-12-10 16:16:45'),
(49, 'guitar', 9, 4, '2015-12-10 16:16:45'),
(50, 'guitar', 10, 5, '2015-12-11 01:26:45'),
(51, 'guitar', 11, 4, '2015-12-10 16:16:45'),
(52, 'guitar', 12, 4, '2015-12-10 16:16:45'),
(53, 'guitar', 13, 4, '2015-12-10 16:16:45'),
(54, 'guitar', 14, 4, '2015-12-10 16:16:45'),
(55, 'bass', 9, 5, '2015-12-11 01:26:54'),
(56, 'bass', 4, 4, '2015-12-10 16:16:45'),
(57, 'bass', 6, 4, '2015-12-10 16:16:45'),
(58, 'bass', 11, 4, '2015-12-10 16:16:45'),
(59, 'bass', 12, 4, '2015-12-10 16:16:45'),
(60, 'vocal', 12, 4, '2015-12-10 16:16:45'),
(61, 'vocal', 14, 1, '2015-12-11 01:30:39'),
(62, 'vocal', 11, 4, '2015-12-10 16:16:45'),
(64, 'vocal', 8, 5, '2015-12-11 01:27:04'),
(71, 'vocal', 16, 4, '2015-12-10 16:16:45'),
(72, 'guitar', 16, 1, '2015-12-11 01:30:22'),
(73, 'bass', 16, 1, '2015-12-11 01:30:24'),
(74, 'drum', 16, 4, '2015-12-10 16:16:45'),
(75, 'keyboard', 16, 4, '2015-12-10 16:16:45'),
(76, 'other', 16, 4, '2015-12-10 16:16:45'),
(77, 'vocal', 17, 4, '2015-12-10 16:16:45'),
(78, 'guitar', 17, 1, '2015-12-11 01:30:42'),
(79, 'bass', 17, 4, '2015-12-10 16:16:45'),
(80, 'drum', 17, 4, '2015-12-10 16:16:45'),
(81, 'keyboard', 17, 4, '2015-12-10 16:16:45'),
(82, 'other', 17, 4, '2015-12-10 16:16:45'),
(83, 'vocal', 18, 4, '2015-12-10 16:16:45'),
(84, 'guitar', 18, 4, '2015-12-10 16:16:45'),
(85, 'bass', 18, 4, '2015-12-10 16:16:45'),
(86, 'drum', 18, 4, '2015-12-10 16:16:45'),
(87, 'keyboard', 18, 4, '2015-12-10 16:16:45'),
(88, 'other', 18, 4, '2015-12-10 16:16:45'),
(89, 'vocal', 21, 4, '2015-12-10 16:16:45'),
(90, 'guitar', 21, 4, '2015-12-10 16:16:45'),
(91, 'bass', 21, 4, '2015-12-10 16:16:45'),
(92, 'drum', 21, 4, '2015-12-10 16:16:45'),
(93, 'keyboard', 21, 4, '2015-12-10 16:16:45'),
(94, 'other', 21, 4, '2015-12-10 16:16:45'),
(95, 'vocal', 22, 4, '2015-12-10 16:16:45'),
(96, 'guitar', 22, 4, '2015-12-10 16:16:45'),
(97, 'bass', 22, 4, '2015-12-10 16:16:45'),
(98, 'drum', 22, 4, '2015-12-10 16:16:45'),
(99, 'keyboard', 22, 4, '2015-12-10 16:16:45'),
(100, 'other', 22, 4, '2015-12-10 16:16:45');

-- --------------------------------------------------------

--
-- Table structure for table `Recruit`
--

CREATE TABLE `Recruit` (
  `recruit_id` int(6) UNSIGNED NOT NULL,
  `instrument` varchar(50) NOT NULL,
  `band_id` int(6) UNSIGNED NOT NULL,
  `user_id` int(6) UNSIGNED NOT NULL,
  `orientation` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Recruit`
--

INSERT INTO `Recruit` (`recruit_id`, `instrument`, `band_id`, `user_id`, `orientation`, `status`, `create_date`) VALUES
(2, 'vocal', 1, 1, 1, 0, '2015-12-05 14:36:16'),
(3, 'bass', 1, 1, 0, 0, '2015-12-11 01:36:35'),
(4, 'other', 1, 1, 1, 1, '2015-12-09 15:44:55'),
(5, 'drum', 1, 1, 1, 1, '2015-12-10 06:33:45'),
(6, 'vocal', 2, 2, 1, 1, '2015-12-11 00:38:55'),
(7, 'vocal', 3, 2, 1, 1, '2015-12-11 00:40:54'),
(8, 'vocal', 4, 2, 1, 1, '2015-12-11 00:41:02'),
(9, 'vocal', 5, 2, 1, 1, '2015-12-11 00:41:05'),
(10, 'vocal', 6, 2, 1, 1, '2015-12-11 00:41:07'),
(12, 'vocal', 8, 2, 1, 1, '2015-12-11 00:41:16'),
(13, 'vocal', 9, 2, 1, 1, '2015-12-11 00:41:20'),
(14, '[]', 2, 4, 1, 1, '2015-12-11 01:31:24'),
(15, '[]', 3, 1, 1, 1, '2015-12-11 01:32:27'),
(16, '[]', 16, 5, 1, 1, '2015-12-11 01:40:49');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `user_id` int(6) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `age` int(2) UNSIGNED DEFAULT NULL,
  `gender` varchar(6) NOT NULL,
  `about_me` varchar(512) DEFAULT NULL,
  `profile_picture_url` varchar(512) DEFAULT NULL,
  `fb_user_id` bigint(20) UNSIGNED NOT NULL,
  `blues` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `country` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `electronic` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `hard_rock` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `britpop` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `jazz` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `pop_rock` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `metal` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `post_rock` int(2) UNSIGNED NOT NULL DEFAULT '1',
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`user_id`, `name`, `age`, `gender`, `about_me`, `profile_picture_url`, `fb_user_id`, `blues`, `country`, `electronic`, `hard_rock`, `britpop`, `jazz`, `pop_rock`, `metal`, `post_rock`, `create_date`) VALUES
(1, 'Lee Evan', 22, 'male', 'About me', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p320x320/10462634_10205342480592172_7874326681205862304_n.jpg?oh=f6ee12fdaf17d2974d556d47d4e1f4a3&oe=56D45B11&__gda__=1461264580_f9d72f1670008c5351ceae96bbc5e7b1', 10207597182798318, 7, 1, 1, 2, 2, 3, 2, 4, 3, '2015-12-10 11:51:35'),
(2, 'Lee Evan', NULL, 'male', NULL, 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xap1/v/t1.0-1/p50x50/10462634_10205342480592172_7874326681205862304_n.jpg?oh=8027a6178baf11275581277aec7afa4e&oe=56E93556&__gda__=1457022035_2164357b90368ef8e757f9e743eca860', 10204559213210977, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2015-12-06 10:49:45'),
(4, 'Walker Hong', NULL, 'male', NULL, 'profile_pig', 10153279253007711, 5, 2, 5, 4, 5, 5, 4, 4, 4, '2015-12-08 17:09:41'),
(5, 'Adam Law', NULL, 'male', NULL, 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/p50x50/1016559_10201543867537937_1657756345_n.jpg?oh=51bbc413053ff4e56e1ca622be1268e6&oe=56E83FC1&__gda__=1461473457_3ee4d0aae9a49d142440ac7f6771a933', 10207992401987268, 1, 1, 1, 1, 1, 1, 1, 1, 1, '2015-12-07 08:21:37');

-- --------------------------------------------------------

--
-- Table structure for table `UserDetail`
--

CREATE TABLE `UserDetail` (
  `user_detail_id` int(6) UNSIGNED NOT NULL,
  `user_id` int(6) UNSIGNED NOT NULL,
  `instrument` varchar(32) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `UserDetail`
--

INSERT INTO `UserDetail` (`user_detail_id`, `user_id`, `instrument`, `create_date`) VALUES
(13, 1, 'bass', '2015-12-06 09:44:56'),
(14, 1, 'vocal', '2015-12-06 10:18:43'),
(15, 2, 'guitar', '2015-12-06 15:13:39'),
(16, 2, 'drum', '2015-12-06 15:14:37'),
(17, 4, 'vocal', '2015-12-08 17:09:41'),
(18, 4, 'guitar', '2015-12-08 17:09:41'),
(19, 5, 'keyboard', '2015-12-08 17:36:33'),
(20, 1, 'guitar', '2015-12-10 10:02:33'),
(21, 1, 'drum', '2015-12-10 10:02:33'),
(22, 1, 'keyboard', '2015-12-10 10:02:33'),
(23, 1, 'other', '2015-12-10 10:02:33');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Band`
--
ALTER TABLE `Band`
  ADD PRIMARY KEY (`band_id`),
  ADD UNIQUE KEY `band_id` (`band_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `BandDetail`
--
ALTER TABLE `BandDetail`
  ADD PRIMARY KEY (`band_detail_id`),
  ADD UNIQUE KEY `band_detail_id` (`band_detail_id`),
  ADD KEY `band_id` (`band_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `Recruit`
--
ALTER TABLE `Recruit`
  ADD PRIMARY KEY (`recruit_id`),
  ADD UNIQUE KEY `recruit_id` (`recruit_id`),
  ADD KEY `band_id` (`band_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `fb_user_id` (`fb_user_id`);

--
-- Indexes for table `UserDetail`
--
ALTER TABLE `UserDetail`
  ADD PRIMARY KEY (`user_detail_id`),
  ADD UNIQUE KEY `user_detail_id` (`user_detail_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Band`
--
ALTER TABLE `Band`
  MODIFY `band_id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `BandDetail`
--
ALTER TABLE `BandDetail`
  MODIFY `band_detail_id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;
--
-- AUTO_INCREMENT for table `Recruit`
--
ALTER TABLE `Recruit`
  MODIFY `recruit_id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `user_id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `UserDetail`
--
ALTER TABLE `UserDetail`
  MODIFY `user_detail_id` int(6) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `BandDetail`
--
ALTER TABLE `BandDetail`
  ADD CONSTRAINT `BandDetail_ibfk_1` FOREIGN KEY (`band_id`) REFERENCES `Band` (`band_id`),
  ADD CONSTRAINT `BandDetail_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `Recruit`
--
ALTER TABLE `Recruit`
  ADD CONSTRAINT `Recruit_ibfk_1` FOREIGN KEY (`band_id`) REFERENCES `Band` (`band_id`),
  ADD CONSTRAINT `Recruit_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

--
-- Constraints for table `UserDetail`
--
ALTER TABLE `UserDetail`
  ADD CONSTRAINT `UserDetail_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
