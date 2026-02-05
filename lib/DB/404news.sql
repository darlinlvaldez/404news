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
(1,'Ana Torres','Periodista especializada en inteligencia artificial con más de 10 años de experiencia','ana-torres','ana-torres-avatar.jpg',1),
(2,'Carlos Mendoza','Analista de hardware y dispositivos móviles, colaborador habitual en revistas especializadas','carlos-mendoza','carlos-mendoza-avatar.jpg',1),
(3,'Laura Vega','Desarrolladora de software y experta en nuevas tecnologías','laura-vega','laura-vega-avatar.jpg',1),
(4,'Miguel Ruiz','Ingeniero en sistemas y especialista en hardware de PCs','miguel-ruiz','miguel-ruiz-avatar.jpg',1);

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
(1,'Inteligencia Artificial','IA-inteligencia-artificial','2026-02-03 12:01:14',1),
(2,'Dispositivos Móviles','dispositivos-moviles','2026-02-03 12:01:14',1),
(3,'Software','desarrollo-software-app','2026-02-03 12:01:14',1),
(4,'Computadoras (PC)','computadoras-pc','2026-02-03 12:01:14',1),
(5,'Tecnología General','tecnologia-tecnology','2026-02-03 20:19:34',1);

/*Table structure for table `news` */

DROP TABLE IF EXISTS `news`;

CREATE TABLE `news` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `excerpt` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
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
  CONSTRAINT `news_chk_1` CHECK ((`status` in (_utf8mb4'draft',_utf8mb4'review',_utf8mb4'published')))
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news` */

insert  into `news`(`id`,`title`,`slug`,`excerpt`,`cover_image`,`author_id`,`category_id`,`status`,`created_at`,`updated_at`,`active`) values 
(1,'GPT-5 supera los límites de la generación de texto multimodal','gpt-5-supera-limites-texto-multimodal','OpenAI presenta su modelo más avanzado capaz de entender y generar contenido en múltiples formatos','https://www.iweaver.ai/wp-content/uploads/2025/08/ChatGPT-5.webp',1,1,'published','2026-02-03 09:15:00','2026-02-05 13:22:53',1),
(2,'Nuevo modelo de IA detecta enfermedades con 98% de precisión','ia-detecta-enfermedades-precision','Sistema de inteligencia artificial revoluciona el diagnóstico médico temprano','ia-medicina-cover.jpg',1,1,'published','2026-02-02 14:30:00','2026-02-05 12:45:56',1),
(3,'Samsung Galaxy S30 con pantalla plegable sin bisel','samsung-galaxy-s30-pantalla-plegable','El nuevo flagship de Samsung presenta innovaciones en diseño y tecnología flexible','galaxy-s30-cover.jpg',2,2,'published','2026-02-01 11:45:00','2026-02-05 12:45:56',1),
(4,'Apple iPhone 16: Cámara cuántica y carga inalámbrica a distancia','iphone-16-camara-cuantica','Apple anuncia su nuevo smartphone con tecnología de cámara revolucionaria','iphone16-cover.jpg',2,2,'published','2026-01-31 16:20:00','2026-02-05 12:45:56',1),
(5,'Windows 13 incluye asistente de IA nativo','windows-13-asistente-ia-nativo','Microsoft integra Copilot directamente en el sistema operativo','windows13-cover.jpg',3,3,'published','2026-01-30 10:10:00','2026-02-05 12:45:56',1),
(6,'Nueva versión de Python acelera ejecución en un 40%','python-nueva-version-acelera-ejecucion','Python 3.13 mejora significativamente el rendimiento de aplicaciones','python-cover.jpg',3,3,'published','2026-01-29 13:55:00','2026-02-05 12:45:56',1),
(7,'Procesadores cuánticos disponibles para computadoras personales','procesadores-cuanticos-pc-personales','IBM lanza el primer procesador cuántico accesible para el mercado de consumo','pc-cuantica-cover.jpg',4,4,'published','2026-01-28 15:40:00','2026-02-05 12:45:56',1),
(8,'NVIDIA RTX 5090: 4 veces más rápida que su predecesora','nvidia-rtx-5090-rendimiento','La nueva generación de tarjetas gráficas establece récords de rendimiento','rtx5090-cover.jpg',4,4,'published','2026-01-27 09:25:00','2026-02-05 12:45:56',1),
(9,'Internet satelital alcanza velocidades de 1 Gbps globalmente','internet-satelital-1gbps-global','Proyectos de constelación satelital democratizan el acceso a internet de alta velocidad','internet-satelital-cover.jpg',3,5,'published','2026-01-26 12:15:00','2026-02-05 12:45:56',1),
(10,'Robots humanoides realizan tareas domésticas complejas','robots-humanoides-tareas-domesticas','Nueva generación de robots asistentes aprenden y se adaptan a entornos domésticos','robots-cover.jpg',1,5,'published','2026-01-25 17:30:00','2026-02-05 12:45:56',1);

/*Table structure for table `news_blocks` */

DROP TABLE IF EXISTS `news_blocks`;

CREATE TABLE `news_blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `block_type` enum('paragraph','image','heading') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_blocks_news` (`news_id`),
  CONSTRAINT `fk_blocks_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news_blocks` */

insert  into `news_blocks`(`id`,`news_id`,`block_type`,`content`,`image_url`,`alt_text`,`position`,`created_at`) values 
(1,1,'heading','La revolución multimodal de la IA','https://blog.donweb.com/wp-content/uploads/2025/08/Lo-nuevo-de-GPT-5.jpeg',NULL,1,'2026-02-05 12:46:12'),
(2,1,'paragraph','OpenAI ha presentado oficialmente GPT-5, su modelo de lenguaje más avanzado hasta la fecha. Lo que diferencia a esta versión es su capacidad nativa para entender y generar contenido en múltiples formatos: texto, imágenes, audio y video.',NULL,NULL,2,'2026-02-05 12:46:12'),
(3,1,'paragraph','Según los desarrolladores, GPT-5 puede mantener conversaciones coherentes mientras analiza documentos visuales, generando respuestas que integran información de todas las modalidades.',NULL,NULL,3,'2026-02-05 12:46:12'),
(4,1,'image',NULL,'gpt5-multimodal-diagram.jpg','Arquitectura multimodal de GPT-5',4,'2026-02-05 12:46:12'),
(5,3,'heading','Diseño sin bisel revolucionario',NULL,NULL,1,'2026-02-05 12:46:12'),
(6,3,'paragraph','Samsung ha desvelado el Galaxy S30, su nuevo smartphone insignia que presenta una pantalla plegable completamente libre de biseles. La tecnología \"Flex Infinity Display\" permite un ángulo de visión ininterrumpido de 180 grados.',NULL,NULL,2,'2026-02-05 12:46:12'),
(7,3,'paragraph','El dispositivo utiliza un nuevo tipo de vidrio ultra-flexible desarrollado conjuntamente con Corning, ofreciendo una resistencia al rayado 3 veces mayor que las generaciones anteriores.',NULL,NULL,3,'2026-02-05 12:46:12'),
(8,3,'image',NULL,'galaxy-s30-flex.jpg','Samsung Galaxy S30 completamente desplegado',4,'2026-02-05 12:46:12'),
(9,5,'heading','Copilot integrado en el sistema',NULL,NULL,1,'2026-02-05 12:46:12'),
(10,5,'paragraph','Microsoft ha anunciado Windows 13, que incluye por primera vez un asistente de IA nativo llamado \"Windows Copilot\". Esta herramienta está integrada directamente en el sistema operativo y puede ejecutarse localmente sin necesidad de conexión a internet.',NULL,NULL,2,'2026-02-05 12:46:12'),
(11,5,'paragraph','Windows Copilot puede automatizar tareas complejas, optimizar el rendimiento del sistema y ofrecer sugerencias contextuales basadas en el uso del usuario.',NULL,NULL,3,'2026-02-05 12:46:12'),
(12,5,'image',NULL,'windows-copilot-interface.jpg','Interfaz de Windows Copilot en acción',4,'2026-02-05 12:46:12'),
(13,7,'heading','La computación cuántica llega al hogar',NULL,NULL,1,'2026-02-05 12:46:12'),
(14,7,'paragraph','IBM ha anunciado el procesador cuántico \"Q-ONE Consumer\", el primero diseñado específicamente para computadoras personales. Con 128 qubits de potencia, ofrece capacidades de cálculo que superan a los supercomputadores de hace una década.',NULL,NULL,2,'2026-02-05 12:46:12'),
(15,7,'paragraph','El procesador viene integrado en placas madre especializadas que mantienen los qubits a temperaturas cercanas al cero absoluto, usando un sistema de refrigeración compacto.',NULL,NULL,3,'2026-02-05 12:46:12'),
(16,7,'image',NULL,'quantum-processor-motherboard.jpg','Placa madre con procesador cuántico',4,'2026-02-05 12:46:12'),
(17,9,'heading','Conectividad global a velocidad de fibra',NULL,NULL,1,'2026-02-05 12:46:12'),
(18,9,'paragraph','Varios proyectos de constelación satelital, liderados por SpaceX, Amazon y OneWeb, han alcanzado cobertura global completa. Los usuarios en cualquier punto del planeta pueden acceder a internet de 1 Gbps con latencias menores a 20ms.',NULL,NULL,2,'2026-02-05 12:46:12'),
(19,9,'paragraph','Esta tecnología está revolucionando especialmente las zonas rurales y en desarrollo, donde la infraestructura terrestre es limitada o inexistente.',NULL,NULL,3,'2026-02-05 12:46:12'),
(20,9,'image',NULL,'satellite-constellation-globe.jpg','Cobertura global de constelación satelital',4,'2026-02-05 12:46:12'),
(21,2,'heading','IA transforma el diagnóstico médico',NULL,NULL,1,'2026-02-05 12:46:24'),
(22,2,'paragraph','El sistema \"MediScan AI\" ha demostrado una precisión del 98% en la detección temprana de cáncer de pulmón, mama y próstata en estudios clínicos.',NULL,NULL,2,'2026-02-05 12:46:24'),
(23,4,'heading','La fotografía cuántica llega al iPhone',NULL,NULL,1,'2026-02-05 12:46:24'),
(24,4,'paragraph','Apple integra sensores cuánticos que capturan fotones individuales, permitiendo imágenes en condiciones de luz extremadamente bajas.',NULL,NULL,2,'2026-02-05 12:46:24'),
(25,6,'heading','Python más rápido que nunca',NULL,NULL,1,'2026-02-05 12:46:24'),
(26,6,'paragraph','Python 3.13 incluye un nuevo compilador JIT que mejora el rendimiento de aplicaciones científicas y de datos en un 40%.',NULL,NULL,2,'2026-02-05 12:46:24'),
(27,8,'heading','NVIDIA redefine el rendimiento gráfico',NULL,NULL,1,'2026-02-05 12:46:24'),
(28,8,'paragraph','La RTX 5090 utiliza arquitectura \"Blackwell\" con 24,576 núcleos CUDA y 48GB de memoria GDDR7.',NULL,NULL,2,'2026-02-05 12:46:24'),
(29,10,'heading','Robots que aprenden como humanos',NULL,NULL,1,'2026-02-05 12:46:24'),
(30,10,'paragraph','La nueva generación de robots humanoides utiliza aprendizaje por refuerzo para dominar tareas domésticas complejas.',NULL,NULL,2,'2026-02-05 12:46:24');

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
