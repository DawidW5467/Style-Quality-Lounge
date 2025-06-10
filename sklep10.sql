-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Cze 10, 2025 at 08:50 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sklep`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `carts`
--

CREATE TABLE `carts` (
  `id_cart_position` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id_cart_position`, `id_user`, `id_product`, `quantity`) VALUES
(1, 1, 2, NULL),
(2, 1, 3, NULL),
(3, 2, 1, NULL),
(4, 3, 4, NULL),
(5, 4, 5, NULL),
(6, 1, 2, NULL),
(7, 1, 3, NULL),
(8, 2, 1, NULL),
(9, 3, 4, NULL),
(10, 4, 5, NULL),
(11, 1, 2, NULL),
(12, 1, 3, NULL),
(13, 2, 1, NULL),
(14, 3, 4, NULL),
(15, 4, 5, NULL),
(17, 1, 3, NULL),
(20, 25, 2, NULL),
(21, 25, 2, 1),
(22, 25, 2, 5),
(23, 25, 3, 7),
(24, 25, 20, 3);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `categories`
--

CREATE TABLE `categories` (
  `id_category` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `description` varchar(120) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id_category`, `name`, `description`) VALUES
(1, 'Electronics', 'Devices and gadgets including smartphones, laptops, and accessories'),
(2, 'Clothing', 'Apparel for men, women, and children'),
(3, 'Books', 'Fiction and non-fiction books in various genres'),
(4, 'Home & Garden', 'Furniture and items for home improvement'),
(5, 'Sports', 'Equipment for various sports activities'),
(6, 'Electronics', 'Devices and gadgets including smartphones, laptops, and accessories'),
(7, 'Clothing', 'Apparel for men, women, and children'),
(8, 'Books', 'Fiction and non-fiction books in various genres'),
(9, 'Home & Garden', 'Furniture and items for home improvement'),
(10, 'Sports', 'Equipment for various sports activities'),
(11, 'Electronics', 'Devices and gadgets including smartphones, laptops, and accessories'),
(12, 'Clothing', 'Apparel for men, women, and children'),
(13, 'Books', 'Fiction and non-fiction books in various genres'),
(14, 'Home & Garden', 'Furniture and items for home improvement'),
(15, 'Sports', 'Equipment for various sports activities'),
(16, 'Electronics', 'Devices and gadgets including smartphones, laptops, and accessories'),
(17, 'Clothing', 'Apparel for men, women, and children'),
(18, 'Books', 'Fiction and non-fiction books in various genres'),
(19, 'Home & Garden', 'Furniture and items for home improvement'),
(20, 'Sports', 'Equipment for various sports activities'),
(21, 'Electronics', 'Devices and gadgets including smartphones, laptops, and accessories'),
(22, 'Clothing', 'Apparel for men, women, and children'),
(23, 'Books', 'Fiction and non-fiction books in various genres'),
(24, 'Home & Garden', 'Furniture and items for home improvement'),
(25, 'Sports', 'Equipment for various sports activities'),
(26, 'Electronics', 'Devices and gadgets including smartphones, laptops, and accessories'),
(27, 'Clothing', 'Apparel for men, women, and children'),
(28, 'Books', 'Fiction and non-fiction books in various genres'),
(29, 'Home & Garden', 'Furniture and items for home improvement'),
(30, 'Sports', 'Equipment for various sports activities');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `opinions`
--

CREATE TABLE `opinions` (
  `id_opinion` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL,
  `description` varchar(300) NOT NULL,
  `creation_date` date NOT NULL,
  `rate` decimal(5,1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `opinions`
--

INSERT INTO `opinions` (`id_opinion`, `id_user`, `id_product`, `description`, `creation_date`, `rate`) VALUES
(1, 1, 1, 'Great phone, fast delivery', '2025-03-15', 5.0),
(2, 2, 3, 'Book arrived slightly damaged', '2025-03-20', 3.5),
(3, 3, 5, 'Good quality for the price', '2025-03-10', 4.0),
(4, 4, 2, 'Perfect fit, very comfortable', '2025-03-25', 5.0),
(5, 5, 4, 'Table was smaller than expected', '2025-03-18', 3.0),
(6, 1, 1, 'Great phone, fast delivery', '2025-03-15', 5.0),
(7, 2, 3, 'Book arrived slightly damaged', '2025-03-20', 3.5),
(8, 3, 5, 'Good quality for the price', '2025-03-10', 4.0),
(9, 4, 2, 'Perfect fit, very comfortable', '2025-03-25', 5.0),
(10, 5, 4, 'Table was smaller than expected', '2025-03-18', 3.0),
(11, 1, 1, 'Great phone, fast delivery', '2025-03-15', 5.0),
(12, 2, 3, 'Book arrived slightly damaged', '2025-03-20', 3.5),
(13, 3, 5, 'Good quality for the price', '2025-03-10', 4.0),
(14, 4, 2, 'Perfect fit, very comfortable', '2025-03-25', 5.0),
(15, 5, 4, 'Table was smaller than expected', '2025-03-18', 3.0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `seller` int(11) DEFAULT NULL,
  `customer` int(11) DEFAULT NULL,
  `price` float NOT NULL,
  `order_date` date DEFAULT NULL,
  `delivery_date` date DEFAULT NULL,
  `shipping_method` enum('InPost','DHL','GLS','Żabka','Pocztex') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id_order`, `seller`, `customer`, `price`, `order_date`, `delivery_date`, `shipping_method`) VALUES
(1, 1, 2, 3999.99, '2025-03-01', '2025-03-05', 'DHL'),
(2, 2, 3, 249.99, '2025-03-02', '2025-03-06', 'InPost'),
(3, 3, 4, 39.99, '2025-03-03', '2025-03-07', ''),
(4, 4, 5, 599.99, '2025-03-04', '2025-03-08', 'GLS'),
(5, 5, 1, 89.99, '2025-03-05', '2025-03-09', ''),
(6, 1, 2, 3999.99, '2025-03-01', '2025-03-05', 'DHL'),
(7, 2, 3, 249.99, '2025-03-02', '2025-03-06', 'InPost'),
(8, 3, 4, 39.99, '2025-03-03', '2025-03-07', ''),
(9, 4, 5, 599.99, '2025-03-04', '2025-03-08', 'GLS'),
(10, 5, 1, 89.99, '2025-03-05', '2025-03-09', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `order_products`
--

CREATE TABLE `order_products` (
  `id_payment` int(11) NOT NULL,
  `id_order` int(11) DEFAULT NULL,
  `id_product` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `order_products`
--

INSERT INTO `order_products` (`id_payment`, `id_order`, `id_product`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 1, 1),
(7, 2, 2),
(8, 3, 3),
(9, 4, 4),
(10, 5, 5);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `payments`
--

CREATE TABLE `payments` (
  `id_payment` int(11) NOT NULL,
  `id_order` int(11) NOT NULL,
  `payment_method` varchar(30) DEFAULT NULL,
  `payment_status` enum('oczekująca','zakończona','nieudana') DEFAULT NULL,
  `payment_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id_payment`, `id_order`, `payment_method`, `payment_status`, `payment_date`) VALUES
(1, 1, 'Credit Card', '', '2025-03-01'),
(2, 2, 'PayPal', '', '2025-03-02'),
(3, 3, 'Bank Transfer', '', '2025-03-03'),
(4, 4, 'Credit Card', 'oczekująca', '2025-03-04'),
(5, 5, 'PayPal', 'nieudana', '2025-03-05');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `products`
--

CREATE TABLE `products` (
  `id_product` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  `price` float NOT NULL,
  `description` varchar(300) NOT NULL,
  `identity` int(11) NOT NULL,
  `condition` enum('nowy','używany','powystawowy') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id_product`, `name`, `id_user`, `id_category`, `price`, `description`, `identity`, `condition`) VALUES
(1, 'iPhone 13', 1, 1, 3999.99, 'Latest Apple smartphone', 1001, 'nowy'),
(2, 'Levi\'s Jeans', 2, 2, 249.99, 'Blue denim jeans', 2001, 'nowy'),
(3, 'The Great Gatsby', 3, 3, 39.99, 'Classic novel by F. Scott Fitzgerald', 3001, ''),
(4, 'Coffee Table', 4, 4, 599.99, 'Modern wooden coffee table', 4001, 'nowy'),
(5, 'Football', 5, 5, 89.99, 'Professional size 5 football', 5001, 'powystawowy'),
(6, 'iPhone 13', 1, 1, 3999.99, 'Latest Apple smartphone', 1001, 'nowy'),
(7, 'Levi\'s Jeans', 2, 2, 249.99, 'Blue denim jeans', 2001, 'nowy'),
(8, 'The Great Gatsby', 3, 3, 39.99, 'Classic novel by F. Scott Fitzgerald', 3001, ''),
(9, 'Coffee Table', 4, 4, 599.99, 'Modern wooden coffee table', 4001, 'nowy'),
(10, 'Football', 5, 5, 89.99, 'Professional size 5 football', 5001, 'powystawowy'),
(11, 'iPhone 13', 1, 1, 3999.99, 'Latest Apple smartphone', 1001, 'nowy'),
(12, 'Levi\'s Jeans', 2, 2, 249.99, 'Blue denim jeans', 2001, 'nowy'),
(13, 'The Great Gatsby', 3, 3, 39.99, 'Classic novel by F. Scott Fitzgerald', 3001, ''),
(14, 'Coffee Table', 4, 4, 599.99, 'Modern wooden coffee table', 4001, 'nowy'),
(15, 'Football', 5, 5, 89.99, 'Professional size 5 football', 5001, 'powystawowy'),
(19, 'Zegarek', 1, 2, 8700, 'Zegarek przeciwsłoneczny do sprawdzania temperatury', 7812, 'nowy'),
(20, 'Minecraft', 1, 1, 100, 'Hiper duper gra komputerowa', 3426, 'nowy'),
(21, 'Minecraft2', 1, 1, 300, 'Hiper duper', 1989, 'nowy'),
(22, 'WOT', 1, 1, 30, 'Fajne czołgi', 3169, 'nowy');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `name` varchar(25) NOT NULL,
  `surname` varchar(45) NOT NULL,
  `login` varchar(50) NOT NULL,
  `user_password` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `name`, `surname`, `login`, `user_password`) VALUES
(1, 'Jan', 'Kowalski', '', 'password123'),
(2, 'Anna', 'Nowak', '', 'securepass'),
(3, 'Michael', 'Schmidt', '', 'pass1234'),
(4, 'Marie', 'Dupont', '', 'france123'),
(5, 'Luca', 'Rossi', '', 'italia456'),
(6, 'Jan', 'Kowalski', '', 'password123'),
(7, 'Anna', 'Nowak', '', 'securepass'),
(8, 'Michael', 'Schmidt', '', 'pass1234'),
(9, 'Marie', 'Dupont', '', 'france123'),
(10, 'Luca', 'Rossi', '', 'italia456'),
(11, 'Jan', 'Kowalski', '', 'password123'),
(12, 'Anna', 'Nowak', '', 'securepass'),
(13, 'Michael', 'Schmidt', '', 'pass1234'),
(14, 'Marie', 'Dupont', '', 'france123'),
(15, 'Luca', 'Rossi', '', 'italia456'),
(16, 'Jan', 'Kowalski', '', 'password123'),
(17, 'Anna', 'Nowak', '', 'securepass'),
(18, 'Michael', 'Schmidt', '', 'pass1234'),
(19, 'Marie', 'Dupont', '', 'france123'),
(20, 'Luca', 'Rossi', '', 'italia456'),
(21, 'Jan', 'Kowalski', '', 'password123'),
(22, 'Anna', 'Nowak', '', 'securepass'),
(23, 'Michael', 'Schmidt', '', 'pass1234'),
(24, 'Marie', 'Dupont', '', 'france123'),
(25, 'Luca', 'Rossi', 'sigma123', 'italia456'),
(26, 'Jan', 'Kowalski', '', 'password123'),
(27, 'Anna', 'Nowak', '', 'securepass'),
(28, 'Michael', 'Schmidt', '', 'pass1234'),
(29, 'Marie', 'Dupont', '', 'france123'),
(30, 'Luca', 'Rossi', '', 'italia456'),
(32, 'Michał', 'Wojtas', 'sigmiarz123', '123456789'),
(33, 'Adam', 'Pisany', 'wkladam_i_spadam', '125478963');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id_cart_position`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- Indeksy dla tabeli `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id_category`);

--
-- Indeksy dla tabeli `opinions`
--
ALTER TABLE `opinions`
  ADD PRIMARY KEY (`id_opinion`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- Indeksy dla tabeli `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `seller` (`seller`),
  ADD KEY `customer` (`customer`);

--
-- Indeksy dla tabeli `order_products`
--
ALTER TABLE `order_products`
  ADD PRIMARY KEY (`id_payment`),
  ADD KEY `id_order` (`id_order`),
  ADD KEY `id_product` (`id_product`);

--
-- Indeksy dla tabeli `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id_payment`),
  ADD KEY `id_order` (`id_order`);

--
-- Indeksy dla tabeli `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_category` (`id_category`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id_cart_position` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id_category` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `opinions`
--
ALTER TABLE `opinions`
  MODIFY `id_opinion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `order_products`
--
ALTER TABLE `order_products`
  MODIFY `id_payment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id_payment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Constraints for table `opinions`
--
ALTER TABLE `opinions`
  ADD CONSTRAINT `opinions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `opinions_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`seller`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer`) REFERENCES `users` (`id_user`);

--
-- Constraints for table `order_products`
--
ALTER TABLE `order_products`
  ADD CONSTRAINT `order_products_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`),
  ADD CONSTRAINT `order_products_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`id_product`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders` (`id_order`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `categories` (`id_category`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
