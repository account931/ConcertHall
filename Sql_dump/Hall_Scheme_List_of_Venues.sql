-- phpMyAdmin SQL Dump
-- version 3.5.3
-- http://www.phpmyadmin.net
--
-- Хост: 127.0.0.1:3306
-- Час створення: Жов 10 2018 р., 16:51
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
-- Структура таблиці `Hall_Scheme_List_of_Venues`
--

CREATE TABLE IF NOT EXISTS `Hall_Scheme_List_of_Venues` (
  `place_id` int(11) NOT NULL AUTO_INCREMENT,
  `place_name` varchar(77) NOT NULL,
  `place_address` varchar(88) NOT NULL,
  `place_vert_column` int(11) NOT NULL,
  `place_horz_rows` varchar(22) NOT NULL,
  PRIMARY KEY (`place_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп даних таблиці `Hall_Scheme_List_of_Venues`
--

INSERT INTO `Hall_Scheme_List_of_Venues` (`place_id`, `place_name`, `place_address`, `place_vert_column`, `place_horz_rows`) VALUES
(1, 'VDNH', 'Kyiv', 20, '6,6,7,8'),
(2, 'River Port', 'Kyiv', 26, '2,3,4,5,6,7'),
(3, 'Itaka', 'Odessa', 17, '3,3,4,4,8');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
