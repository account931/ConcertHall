-- phpMyAdmin SQL Dump
-- version 3.5.3
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Час створення: Жов 03 2018 р., 18:13
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
-- Структура таблиці `Hall_Events`
--

CREATE TABLE IF NOT EXISTS `Hall_Events` (
  `ev_id` int(11) NOT NULL AUTO_INCREMENT,
  `ev_name` varchar(77) NOT NULL,
  `ev_venueHall_id` int(11) NOT NULL,
  `ev_price` int(11) NOT NULL,
  `ev_date` int(11) NOT NULL,
  PRIMARY KEY (`ev_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=12 ;

--
-- Дамп даних таблиці `Hall_Events`
--

INSERT INTO `Hall_Events` (`ev_id`, `ev_name`, `ev_venueHall_id`, `ev_price`, `ev_date`) VALUES
(11, 'LTJ Bukhem', 1, 15, 1538596800);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
