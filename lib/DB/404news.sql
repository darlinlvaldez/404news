/*
SQLyog Community v13.3.1 (64 bit)
MySQL - 8.0.44 : Database - 404news
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`404news` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `404news`;

/*Table structure for table `authors` */

DROP TABLE IF EXISTS `authors`;

CREATE TABLE `authors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `bio` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_authors_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `authors` */

insert  into `authors`(`id`,`name`,`bio`,`slug`,`avatar`,`active`) values 
(1,'Ana Tech','Periodista especializada en tecnología y startups.','ana-tech','/avatars/ana-tech.jpg',1),
(2,'Carlos Byte','Analista de software y tendencias digitales.','carlos-byte','/avatars/carlos-byte.jpg',1),
(3,'Lucía AI','Redactora enfocada en inteligencia artificial y ciencia.','lucia-ai','/avatars/lucia-ai.jpg',1);

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categories` */

insert  into `categories`(`id`,`name`,`slug`,`created_at`,`active`) values 
(1,'Inteligencia Artificial','inteligencia-artificial','2026-02-03 12:01:14',1),
(2,'Dispositivos Móviles','dispositivos-moviles','2026-02-03 12:01:14',1),
(3,'Software','software','2026-02-03 12:01:14',1),
(4,'PCs','tecnologia-general','2026-02-03 12:01:14',1),
(5,'Tecnología General','mundo-computadoras-pc','2026-02-03 20:19:34',1);

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `excerpt` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `cover_image` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `author_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'draft',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_news_slug` (`slug`),
  KEY `fk_news_author` (`author_id`),
  KEY `fk_news_category` (`category_id`),
  CONSTRAINT `fk_news_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_news_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `news_chk_1` CHECK ((`status` in (_utf8mb3'draft',_utf8mb3'review',_utf8mb3'published')))
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news` */

insert  into `news`(`id`,`title`,`slug`,`excerpt`,`content`,`cover_image`,`author_id`,`category_id`,`status`,`created_at`,`updated_at`,`active`) values 
(1,'La IA generativa redefine el desarrollo de software en 2025','ia-generativa-desarrollo-software-2025','Nuevas herramientas basadas en IA están cambiando la forma de programar.','La inteligencia artificial generativa se ha convertido en una aliada clave para los desarrolladores. Plataformas modernas permiten escribir, depurar y optimizar código en menos tiempo, reduciendo errores y acelerando los ciclos de desarrollo.','https://revistamercado.do/wp-content/uploads/2025/09/el-uso-de-IA-alcanza-el-90-y-redefine-el-trabajo-de-los-programadores.jpg',3,1,'published','2026-02-01 12:04:45','2026-02-03 19:23:21',1),
(2,'Samsung y Apple apuestan fuerte por la IA en sus nuevos smartphones','samsung-apple-ia-smartphones','Los nuevos teléfonos integran funciones inteligentes avanzadas.','Las principales marcas de móviles están incorporando IA para mejorar fotografía, batería y asistentes personales. Esta tendencia marca un nuevo estándar en la experiencia de usuario.','https://elceo.com/wp-content/uploads/2024/12/Smartphones_IA_apple_samsung.jpg',1,2,'published','2026-02-02 12:04:45','2026-02-03 19:23:27',1),
(3,'Next.js 15 mejora el rendimiento y la experiencia del desarrollador','nextjs-15-novedades-rendimiento','La nueva versión de Next.js trae mejoras clave para proyectos modernos.','Next.js 15 introduce optimizaciones en el enrutamiento, mejor manejo del caché y una experiencia más fluida tanto para desarrolladores como para usuarios finales.','https://img-c.udemycdn.com/course/750x422/6239633_20d6.jpg',2,3,'published','2026-02-02 12:04:45','2026-02-03 19:23:51',1),
(4,'Aumentan los ataques de phishing impulsados por inteligencia artificial','phishing-impulsado-por-ia','La IA está siendo usada para crear estafas más creíbles.','Expertos en ciberseguridad alertan sobre el crecimiento de ataques de phishing que utilizan IA para personalizar mensajes y engañar a más usuarios.','https://www.redseguridad.com/wp-content/uploads/sites/2/2024/08/gettyimages-1779158338.jpg',2,5,'published','2026-01-27 12:04:45','2026-02-04 19:35:36',1),
(5,'La tecnología 5G sigue expandiéndose en América Latina','expansion-5g-america-latina','Cada vez más países adoptan redes 5G.','La expansión del 5G promete mejorar la conectividad, reducir la latencia y abrir nuevas oportunidades para aplicaciones como IoT y realidad aumentada.','https://dplnews.com/wp-content/uploads/2024/12/dplnews_5g-smartphone_mc31224.jpeg',1,4,'published','2026-01-27 12:04:45','2026-02-03 12:27:46',1);

/*Table structure for table `news_blocks` */

DROP TABLE IF EXISTS `news_blocks`;

CREATE TABLE `news_blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `block_type` enum('paragraph','image','heading') COLLATE utf8mb4_general_ci NOT NULL,
  `content` text COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alt_text` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_blocks_news` (`news_id`),
  CONSTRAINT `fk_blocks_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news_blocks` */

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin','support','editor') NOT NULL DEFAULT 'editor',
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
