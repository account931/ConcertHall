-- phpMyAdmin SQL Dump
-- version 3.5.3
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Час створення: Жов 04 2018 р., 17:37
-- Версія сервера: 5.5.28-log
-- Версія PHP: 5.4.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- БД: `concert_hall`
--

-- --------------------------------------------------------

--
-- Структура таблиці `Hall_Free_taken_seats`
--

CREATE TABLE IF NOT EXISTS `Hall_Free_taken_seats` (
  `fts_id` int(11) NOT NULL AUTO_INCREMENT,
  `fts_venue_id` int(11) NOT NULL,
  `fts_event_name` varchar(77) NOT NULL,
  `fts_unix_date` datetime NOT NULL,
  `fts_booked_place` varchar(22) NOT NULL,
  `fts_booker_name` varchar(77) NOT NULL,
  `fts_place_price` float NOT NULL,
  PRIMARY KEY (`fts_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
