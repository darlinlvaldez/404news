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
(1,'Inteligencia Artificial','ia-inteligencia-artificial','2026-02-03 12:01:14',1),
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news` */

insert  into `news`(`id`,`title`,`slug`,`excerpt`,`cover_image`,`author_id`,`category_id`,`status`,`created_at`,`updated_at`,`active`) values 
(1,'GPT-5 supera los límites de la generación de texto multimodal','gpt-5-supera-limites-texto-multimodal','OpenAI presenta su modelo más avanzado capaz de entender y generar contenido en múltiples formatos','https://www.iweaver.ai/wp-content/uploads/2025/08/ChatGPT-5.webp',1,1,'published','2026-02-03 09:15:00','2026-02-05 13:22:53',1),
(2,'Nuevo modelo de IA detecta enfermedades con 98% de precisión','ia-detecta-enfermedades-precision','Sistema de inteligencia artificial revoluciona el diagnóstico médico temprano','https://images.ecestaticos.com/MfuZbXrtEZBJSHTQghygcWF5u-g=/0x0:2272x1515/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F194%2F3b6%2F83b%2F1943b683bccc82165c4ab61e16e7c727.jpg',1,1,'published','2026-02-02 14:30:00','2026-02-05 20:20:21',1),
(3,'Samsung Galaxy S30 con pantalla plegable sin bisel','samsung-galaxy-s30-pantalla-plegable','El nuevo flagship de Samsung presenta innovaciones en diseño y tecnología flexible','https://revistamercado.do/wp-content/uploads/2025/12/Samsung-lanza-su-tele%CC%81fono-plegable-triple-Galaxy-Z-TriFold-copy.jpg',2,2,'published','2026-02-01 11:45:00','2026-02-05 20:21:45',1),
(4,'Apple iPhone 16: Cámara cuántica y carga inalámbrica a distancia','iphone-16-camara-cuantica','Apple anuncia su nuevo smartphone con tecnología de cámara revolucionaria','https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121031-iphone-16-pro.png',2,2,'published','2026-01-31 16:20:00','2026-02-05 20:22:31',1),
(5,'Windows 13 incluye asistente de IA nativo','windows-13-asistente-ia-nativo','Microsoft integra Copilot directamente en el sistema operativo','https://i.blogs.es/876678/copilot-novedades/500_333.jpeg',3,3,'published','2026-01-30 10:10:00','2026-02-05 20:23:28',1),
(6,'Nueva versión de Python acelera ejecución en un 40%','python-nueva-version-acelera-ejecucion','Python 3.13 mejora significativamente el rendimiento de aplicaciones','https://pandorafms.com/blog/wp-content/uploads/2018/10/lenguaje-python-featured.png',3,3,'published','2026-01-29 13:55:00','2026-02-05 20:24:05',1),
(7,'Procesadores cuánticos disponibles para computadoras personales','procesadores-cuanticos-pc-personales','IBM lanza el primer procesador cuántico accesible para el mercado de consumo','https://i.blogs.es/491562/intelcuanticaap/1366_2000.jpg',4,4,'published','2026-01-28 15:40:00','2026-02-05 20:24:58',1),
(8,'NVIDIA RTX 5090: 4 veces más rápida que su predecesora','nvidia-rtx-5090-rendimiento','La nueva generación de tarjetas gráficas establece récords de rendimiento','https://www.storagereview.com/wp-content/uploads/2025/01/StorageReview-NVIDIA-RTX5090-Lab-01-1024x615.jpg',4,4,'published','2026-01-27 09:25:00','2026-02-05 20:25:56',1),
(9,'Internet satelital alcanza velocidades de 1 Gbps globalmente','internet-satelital-1gbps-global','Proyectos de constelación satelital democratizan el acceso a internet de alta velocidad','https://www.adslzone.net/app/uploads-adslzone.net/2024/01/nave-espacial-que-orbita-planeta-tierra-comunicaciones-globales-generadas-ia.jpg',3,5,'published','2026-01-26 12:15:00','2026-02-05 20:26:58',1),
(10,'Robots humanoides realizan tareas domésticas complejas','robots-humanoides-tareas-domesticas','Nueva generación de robots asistentes aprenden y se adaptan a entornos domésticos','https://www.infobae.com/new-resizer/tIpR57VRa38zapjgpaE9nl0rObM=/arc-anglerfish-arc2-prod-infobae/public/WPTXEEPKV5CYBHADF3XIWNT3P4.png',1,5,'published','2026-01-25 17:30:00','2026-02-05 20:27:34',1),
(11,'Meta lanza Llama 3.2 con capacidades de razonamiento matemático avanzado','meta-llama-3-2-razonamiento-matematico','Nuevo modelo open-source supera a GPT-4 en tareas de matemáticas y razonamiento lógico','https://i.ytimg.com/vi/94gWFywzNzA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBRkI0sqKa53yrEN5DHbsVIOK32ng',1,1,'published','2026-01-24 08:45:00','2026-02-05 21:00:29',1),
(12,'DeepMind resuelve problema biológico de plegamiento de proteínas con AlphaFold 3','deepmind-alphafold-3-proteínas','IA de Google logra predicción precisa de estructuras de proteínas con aplicaciones médicas revolucionarias','https://s3.abcstatics.com/media/ciencia/2020/12/01/30SCI-DEEPMIND1-superJumbo-kUoF--1248x698@abc.jpg',1,1,'published','2026-01-23 14:20:00','2026-02-05 21:01:19',1),
(13,'ChatGPT obtiene capacidad de memoria a largo plazo','chatgpt-memoria-largo-plazo','OpenAI actualiza su modelo para recordar conversaciones anteriores y preferencias del usuario','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/C2RUS3WYTJBVLEWKMLRNPB2DYQ.png',1,1,'published','2026-01-22 11:30:00','2026-02-05 21:01:47',1),
(14,'Google Pixel 9 Pro con Tensor G4 y cámara térmica','google-pixel-9-pro-camara-termica','Nuevo sensor térmico permite ver temperatura y detectar problemas eléctricos','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTb4elrGyn1Pr8RfiUz2fehsNynWJ3X8XKBw&s',2,2,'published','2026-01-21 16:15:00','2026-02-05 21:02:15',1),
(15,'Xiaomi presenta smartphone con batería de estado sólido de 6000mAh','xiaomi-bateria-estado-solido','Nueva tecnología de batería ofrece carga completa en 8 minutos y mayor seguridad','https://blob.tusbuenasnoticias.com/images/2025/12/30/vale-la-pena-el-poco-c85-con-bateria-de-6000-mah-y-doble-camara-en-remate-706e2adf-focus-0-0-1200-600.webp',2,2,'published','2026-01-20 09:50:00','2026-02-05 21:03:00',1),
(16,'Nothing Phone (3) con pantalla holográfica retroiluminada','nothing-phone-3-pantalla-holografica','Interfaz Glyph Interface evoluciona con efectos de luz 3D y notificaciones contextuales','https://i.blogs.es/2a45d5/nothing3/450_1000.jpeg',2,2,'published','2026-01-19 13:40:00','2026-02-05 21:03:48',1),
(17,'Visual Studio Code integra Copilot Chat de forma nativa','vscode-copilot-chat-nativo','Microsoft fusiona su IDE con herramientas de IA para desarrollo asistido','https://blog.underc0de.org/wp-content/uploads/2026/01/Sin-titulo-5.png',3,3,'published','2026-01-18 10:25:00','2026-02-05 21:04:26',1),
(18,'Kubernetes 1.30 simplifica la gestión de clusters con IA','kubernetes-1-30-gestion-ia','Nueva versión incluye operadores auto-curativos y optimización automática de recursos','https://www.muylinux.com/wp-content/uploads/2023/10/Kubernetes.png',3,3,'published','2026-01-17 15:10:00','2026-02-05 21:04:49',1),
(19,'Linux 6.10 mejora soporte para hardware ARM y RISC-V','linux-6-10-soporte-arm-riscv','Kernel actualizado optimiza rendimiento en procesadores de arquitectura alternativa','https://blog.underc0de.org/wp-content/uploads/2024/07/R.jpg',3,3,'published','2026-01-16 12:05:00','2026-02-05 21:06:05',1),
(20,'AMD Ryzen 9000: hasta 24 núcleos y frecuencia de 6GHz','amd-ryzen-9000-24-nucleos','Nueva arquitectura Zen 5 ofrece mejora del 35% en rendimiento single-thread','https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2613900-ryzen-9-9950x.jpg',4,4,'published','2026-01-15 17:30:00','2026-02-05 21:06:33',1),
(21,'Apple MacBook Pro M4 con Neural Engine de 50 TOPS','macbook-pro-m4-neural-engine','Chip M4 incluye acelerador de IA dedicado para aplicaciones de machine learning','https://www.digitaltrends.com/tachyon/2024/11/macbook-pro-m4-pro-01.jpg?resize=1200%2C720',4,4,'published','2026-01-14 08:20:00','2026-02-05 21:07:04',1),
(22,'Framework Laptop 16: modularidad extrema con GPU intercambiable','framework-laptop-16-gpu-intercambiable','Portátil completamente modular permite actualizar CPU, GPU y puertos individualmente','https://i.blogs.es/f37bd3/nuevo-framework-laptop-16-1/840_560.jpeg',4,4,'published','2026-01-13 14:45:00','2026-02-05 21:07:49',1),
(23,'Starlink alcanza 5 millones de usuarios activos globalmente','starlink-5-millones-usuarios','Servicio de internet satelital expande cobertura a 75 países con velocidades mejoradas','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/BD3QN4RGEVAXDGGAAICM3KXQVQ.png',1,5,'published','2026-01-12 11:15:00','2026-02-05 21:08:31',1),
(24,'Tesla Optimus realiza tareas de fábrica en línea de producción real','tesla-optimus-produccion-real','Robot humanoide de Tesla trabaja junto a humanos ensamblando componentes de vehículos','https://clickpetroleoegas.com.br/wp-content/uploads/2026/01/Design-sem-nome-2026-01-29T190106.112.jpg',3,5,'published','2026-01-11 16:50:00','2026-02-05 21:08:56',1),
(25,'Quantum computer de IBM supera los 1000 qubits útiles','ibm-quantum-1000-qubits','Procesador \"Condor\" marca hito en computación cuántica con corrección de errores integrada','https://i.blogs.es/1df1e8/qubit1/450_1000.jpg',4,5,'published','2026-01-10 09:35:00','2026-02-05 21:09:32',1),
(26,'Alphabet emite $15 000 M en bonos para financiar IA','alphabet-emite-bonos-ia-2026','Alphabet reabre mercado de bonos por 15 000 millones para invertir en IA en 2026 con fuerte interés global.','https://www.automatizapro.com.ar/wp-content/uploads/2025/11/alphabet-bonos-financiar-ia.jpg',1,1,'published','2026-02-09 12:00:00','2026-02-09 14:24:25',1),
(27,'Big Tech dispara inversiones en IA y brilla en CES 2026','big-tech-inversiones-ia-ces-2026','Las grandes tecnológicas presentaron innovaciones en IA y dispositivos inteligentes en CES 2026.','https://www.automatizapro.com.ar/wp-content/uploads/2026/02/big-tech-burbuja-financiera-ia-2026.jpg',1,5,'published','2026-01-07 10:30:00','2026-02-09 14:24:56',1),
(28,'Preocupación por aumento de precios de móviles y PCs por IA','aumento-precios-moviles-pcs-ia-2026','Expertos alertan que la demanda de IA encarece componentes clave como memoria y sube los precios.','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MPKMGMFDZBHTJEEJJ2XN4HLJT4.png',2,2,'published','2026-01-13 15:45:00','2026-02-09 14:25:21',1),
(29,'Robots, pantallas gigantes y nuevos procesadores dominan CES 2026','robots-pantallas-procesadores-ces-2026','La CES 2026 mostró robots autónomos y nuevos procesadores con inteligencia artificial integrada.','https://resizer.glanacion.com/resizer/v2/un-robot-sharpa-cumpliendo-su-rol-de-croupier-en-USYWRGBJBBFXJLKQG6QF37NXT4.JPG?auth=212fe4f448e06ab589fad8cbb19d74a14187a9138a039950027d126e5c59e09f&width=420&height=280&quality=70&smart=true',2,4,'published','2026-01-14 14:20:00','2026-02-09 14:26:34',1),
(30,'Informe muestra que 1/3 de consumidores rechaza IA en dispositivos','tercio-consumidores-rechaza-ia','Un nuevo estudio revela que un tercio de usuarios rechaza la IA en sus dispositivos por privacidad y coste.','https://hardzone.es/app/uploads-hardzone.es/2026/02/IA-en-PC.jpg',3,1,'published','2026-02-06 09:00:00','2026-02-09 14:27:04',1),
(31,'CES 2026: Innovaciones prácticas con IA en dispositivos y robots','ces-2026-innovaciones-practicas-ia','Más de 4 000 expositores en CES 2026 mostraron aplicaciones útiles de IA para robots, teléfonos y pantallas.','https://www.elheraldo.hn/binrepository/1260x945/0c0/0d0/none/45933/QPCK/el-heraldo-18_13182832_20260109141538.jpg',4,5,'published','2026-01-09 11:00:00','2026-02-09 14:27:42',1),
(32,'Proyección: IA alcanzará 5 000 millones de usuarios para 2030','ia-5-mil-millones-usuarios-2030','Expertos proyectan que la IA podría llegar a 5 000 millones de usuarios para 2030 tras CES 2026.','https://www.hostinger.com/es/tutoriales/wp-content/uploads/sites/32/2023/12/Crecimiento-de-la-industria-de-la-IA-al-2030-scaled.png',1,1,'published','2026-01-07 18:30:00','2026-02-09 14:28:23',1);

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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(30,10,'paragraph','La nueva generación de robots humanoides utiliza aprendizaje por refuerzo para dominar tareas domésticas complejas.',NULL,NULL,2,'2026-02-05 12:46:24'),
(31,11,'heading','Meta avanza en IA open-source con Llama 3.2',NULL,NULL,1,'2026-02-05 20:49:46'),
(32,11,'paragraph','Meta ha lanzado Llama 3.2, la última versión de su modelo de lenguaje open-source que destaca especialmente en razonamiento matemático y lógico. En benchmarks como GSM8K y MATH, supera a GPT-4 con un 85% de precisión.',NULL,NULL,2,'2026-02-05 20:49:46'),
(33,11,'paragraph','El modelo está disponible en tres tamaños: 8B, 70B y 405B parámetros, siendo esta última versión la que compite directamente con los modelos premium del mercado.',NULL,NULL,3,'2026-02-05 20:49:46'),
(34,11,'image',NULL,'llama3-2-benchmarks.jpg','Resultados de benchmarks de Llama 3.2 vs competencia',4,'2026-02-05 20:49:46'),
(35,14,'heading','Google innova con sensor térmico en smartphone',NULL,NULL,1,'2026-02-05 20:49:46'),
(36,14,'paragraph','El Google Pixel 9 Pro incluye un sensor térmico FLIR que permite medir temperatura de objetos desde -20°C hasta 400°C. Esta función tiene aplicaciones prácticas en detección de sobrecalentamiento eléctrico, verificación de aislamiento térmico y monitoreo de salud.',NULL,NULL,2,'2026-02-05 20:49:46'),
(37,14,'paragraph','El Tensor G4, fabricado en 3nm, incluye un TPU dedicada para procesamiento de imágenes térmicas en tiempo real.',NULL,NULL,3,'2026-02-05 20:49:46'),
(38,14,'image',NULL,'pixel9-thermal-imaging.jpg','Pixel 9 Pro mostrando imagen térmica de un circuito',4,'2026-02-05 20:49:46'),
(39,17,'heading','Desarrollo asistido por IA integrado en VS Code',NULL,NULL,1,'2026-02-05 20:49:46'),
(40,17,'paragraph','Microsoft ha integrado GitHub Copilot Chat directamente en Visual Studio Code como función nativa. Los desarrolladores pueden ahora conversar con la IA sobre su código, pedir explicaciones, refactorizaciones y sugerencias sin cambiar de ventana.',NULL,NULL,2,'2026-02-05 20:49:46'),
(41,17,'paragraph','La versión 1.90 de VS Code incluye también \"Inline Chat\" que permite hacer preguntas contextuales directamente en el editor de código.',NULL,NULL,3,'2026-02-05 20:49:46'),
(42,17,'image',NULL,'vscode-copilot-chat.jpg','Interfaz de Copilot Chat en Visual Studio Code',4,'2026-02-05 20:49:46'),
(43,20,'heading','AMD lanza arquitectura Zen 5 con Ryzen 9000',NULL,NULL,1,'2026-02-05 20:49:46'),
(44,20,'paragraph','AMD presenta los procesadores Ryzen 9000 basados en la nueva arquitectura Zen 5. El flagship Ryzen 9 9950X ofrece 24 núcleos/48 hilos con frecuencias boost de hasta 6GHz y TDP de 170W.',NULL,NULL,2,'2026-02-05 20:49:46'),
(45,20,'paragraph','Las mejoras incluyen un 35% más de IPC (Instrucciones Por Ciclo), cache L3 aumentada a 128MB y soporte nativo para DDR5-6400. La fabricación en 4nm TSMC permite mayor eficiencia energética.',NULL,NULL,3,'2026-02-05 20:49:46'),
(46,20,'image',NULL,'ryzen-9000-architecture.jpg','Diagrama de arquitectura Zen 5 de AMD',4,'2026-02-05 20:49:46'),
(47,23,'heading','Starlink alcanza hitos de crecimiento masivo',NULL,NULL,1,'2026-02-05 20:49:46'),
(48,23,'paragraph','SpaceX ha anunciado que Starlink supera los 5 millones de usuarios activos en 75 países. El servicio ofrece ahora velocidades de hasta 500 Mbps con latencias de 20ms mediante la constelación de satélites de segunda generación.',NULL,NULL,2,'2026-02-05 20:49:46'),
(49,23,'paragraph','La empresa ha desplegado más de 5,000 satélites activos y planea lanzar la versión \"Mini\" del terminal para movilidad, con 40% menos tamaño y consumo.',NULL,NULL,3,'2026-02-05 20:49:46'),
(50,23,'image',NULL,'starlink-global-coverage.jpg','Mapa de cobertura global de Starlink',4,'2026-02-05 20:49:46');

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
