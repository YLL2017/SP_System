-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- 主機: localhost
-- 產生時間： 2016 年 06 月 12 日 08:05
-- 伺服器版本: 10.1.10-MariaDB
-- PHP 版本： 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `Project`
--

-- --------------------------------------------------------

--
-- 資料表結構 `Order_Form`
--

CREATE TABLE `Order_Form` (
  `Orderform_ID` int(11) UNSIGNED NOT NULL,
  `systime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `Order_Product`
--

CREATE TABLE `Order_Product` (
  `id` int(10) UNSIGNED NOT NULL,
  `Order_ID` int(10) UNSIGNED NOT NULL,
  `Product_ID` int(10) UNSIGNED NOT NULL,
  `Quantity` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- 資料表結構 `Product`
--

CREATE TABLE `Product` (
  `Product_ID` int(10) UNSIGNED NOT NULL,
  `Name` varchar(20) NOT NULL,
  `Price` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 資料表的匯出資料 `Product`
--

INSERT INTO `Product` (`Product_ID`, `Name`, `Price`) VALUES
(1, '曼特寧咖啡', 60),
(2, '巴西咖啡', 60),
(3, '曼巴咖啡', 60),
(4, '摩卡咖啡', 60),
(5, '原味卡布奇諾', 55),
(6, '原味拿鐵咖啡', 55),
(7, '摩卡奇諾', 65),
(8, '焦糖瑪奇朵', 70),
(9, '義式濃縮', 35),
(10, '薰衣草', 40),
(11, '薄荷葉', 40),
(12, '洋甘菊', 40),
(13, '紫羅蘭', 40),
(14, '玫瑰花', 40);

--
-- 已匯出資料表的索引
--

--
-- 資料表索引 `Order_Form`
--
ALTER TABLE `Order_Form`
  ADD PRIMARY KEY (`Orderform_ID`);

--
-- 資料表索引 `Order_Product`
--
ALTER TABLE `Order_Product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Order_ID` (`Order_ID`),
  ADD KEY `Product_ID` (`Product_ID`);

--
-- 資料表索引 `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`Product_ID`);

--
-- 在匯出的資料表使用 AUTO_INCREMENT
--

--
-- 使用資料表 AUTO_INCREMENT `Order_Form`
--
ALTER TABLE `Order_Form`
  MODIFY `Orderform_ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `Order_Product`
--
ALTER TABLE `Order_Product`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- 使用資料表 AUTO_INCREMENT `Product`
--
ALTER TABLE `Product`
  MODIFY `Product_ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- 已匯出資料表的限制(Constraint)
--

--
-- 資料表的 Constraints `Order_Product`
--
ALTER TABLE `Order_Product`
  ADD CONSTRAINT `IDX1` FOREIGN KEY (`Order_ID`) REFERENCES `Order_Form` (`Orderform_ID`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `IDX2` FOREIGN KEY (`Product_ID`) REFERENCES `Product` (`Product_ID`) ON DELETE NO ACTION ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
