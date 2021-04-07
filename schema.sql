CREATE DATABASE bonbonfactorydb;
USE bonbonfactorydb;

CREATE TABLE
IF NOT EXISTS `products`
(
`id` int
(11) NOT NULL,
`product_name` varchar
(200) NOT NULL,
`price` decimal
(10,2) NOT NULL DEFAULT 1,
`image_url` varchar
(200),
`delivery_in_days` int NOT NULL DEFAULT 4,
`category` enum
('Cakes', 'CupCakes', 'Lozina', 'Cookies', 'Cake Pops')
);

ALTER TABLE `products`
ADD PRIMARY KEY
(`id`);
ALTER TABLE `products` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT;

INSERT INTO `products` (`
id`,
`product_name
`, `price`, `category`) VALUES
(1, 'Cake-1', 100, 'Cakes'),
(2, 'CupCake-1', 5, 'CupCakes'),
(3, 'Cookies-1', 3, 'Cookies'),
(4, 'Cake-2', 110, 'Cakes'),
(5, 'CupCake-2', 6, 'CupCakes');

INSERT INTO `products` (`
id`,
`product_name
`, `price`, `category`) VALUES
(7, 'Cake Pops-1', 2.50, 'Cake Pops'),
(8, 'CupCake-3', 5, 'CupCakes'),
(9, 'Lozina-1', 3, 'Lozina');

CREATE TABLE
IF NOT EXISTS `cart_items`
(
`id` int
(11) NOT NULL,
`Item_name` varchar
(200) NOT NULL,
`price` decimal
(10,2) NOT NULL DEFAULT 1,
`image_url` varchar
(200),
`quantity` int NOT NULL DEFAULT 1
);

ALTER TABLE `cart_items`
ADD PRIMARY KEY
(`id`);
ALTER TABLE `cart_items` MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT;
