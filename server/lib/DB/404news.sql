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
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_authors_slug` (`slug`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_author_user` (`user_id`),
  CONSTRAINT `fk_author_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `authors` */

insert  into `authors`(`id`,`name`,`bio`,`slug`,`avatar`,`user_id`) values 
(1,'Ana Torres','Periodista especializada en inteligencia artificial con más de 10 años de experiencia','ana-torres','',2),
(2,'Carlos Mendoza','Analista de hardware y dispositivos móviles, colaborador habitual en revistas especializadas','carlos-mendoza','',3),
(3,'Laura Vega','Desarrolladora de software y experta en nuevas tecnologías','laura-vega','',4),
(4,'Miguel Ruiz','Ingeniero en sistemas y especialista en hardware de PCs','miguel-ruiz','',5);

/*Table structure for table `categories` */

DROP TABLE IF EXISTS `categories`;

CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `slug` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_categories_slug` (`slug`),
  UNIQUE KEY `slug` (`slug`),
  UNIQUE KEY `unique_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
  `status` enum('draft','review','published') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'draft',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `views` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_news_slug` (`slug`),
  UNIQUE KEY `slug` (`slug`),
  KEY `fk_news_author` (`author_id`),
  KEY `fk_news_category` (`category_id`),
  CONSTRAINT `fk_news_author` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_news_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `news_chk_1` CHECK ((`status` in (_utf8mb4'draft',_utf8mb4'review',_utf8mb4'published')))
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news` */

insert  into `news`(`id`,`title`,`slug`,`excerpt`,`cover_image`,`author_id`,`category_id`,`status`,`created_at`,`updated_at`,`views`) values 
(1,'GPT-5 supera los límites de la generación de texto multimodal','gpt-5-supera-limites-texto-multimodal','OpenAI presenta su modelo más avanzado capaz de entender y generar contenido en múltiples formatos','https://www.iweaver.ai/wp-content/uploads/2025/08/ChatGPT-5.webp',1,1,'draft','2026-02-12 14:31:54','2026-02-19 15:18:42',7),
(2,'Nuevo modelo de IA detecta enfermedades con 98% de precisión','ia-detecta-enfermedades-precision','Sistema de inteligencia artificial revoluciona el diagnóstico médico temprano','https://images.ecestaticos.com/MfuZbXrtEZBJSHTQghygcWF5u-g=/0x0:2272x1515/1200x1200/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2F194%2F3b6%2F83b%2F1943b683bccc82165c4ab61e16e7c727.jpg',1,1,'published','2026-02-02 14:30:00','2026-02-11 20:24:23',1),
(3,'Samsung Galaxy S30 con pantalla plegable sin bisel','samsung-galaxy-s30-pantalla-plegable','El nuevo flagship de Samsung presenta innovaciones en diseño y tecnología flexible','https://revistamercado.do/wp-content/uploads/2025/12/Samsung-lanza-su-tele%CC%81fono-plegable-triple-Galaxy-Z-TriFold-copy.jpg',2,2,'published','2026-02-01 11:45:00','2026-02-11 21:03:38',3),
(4,'Apple iPhone 16: Cámara cuántica y carga inalámbrica a distancia','iphone-16-camara-cuantica','Apple anuncia su nuevo smartphone con tecnología de cámara revolucionaria','https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/121031-iphone-16-pro.png',2,2,'published','2026-01-31 16:20:00','2026-02-11 19:52:17',1),
(5,'Windows 13 incluye asistente de IA nativo','windows-13-asistente-ia-nativo','Microsoft integra Copilot directamente en el sistema operativo','https://i.blogs.es/876678/copilot-novedades/500_333.jpeg',3,3,'published','2026-01-30 10:10:00','2026-02-13 12:31:28',2),
(6,'Nueva versión de Python acelera ejecución en un 40%','python-nueva-version-acelera-ejecucion','Python 3.13 mejora significativamente el rendimiento de aplicaciones','https://pandorafms.com/blog/wp-content/uploads/2018/10/lenguaje-python-featured.png',3,3,'published','2026-01-29 13:55:00','2026-02-13 12:19:56',2),
(7,'Procesadores cuánticos disponibles para computadoras personales','procesadores-cuanticos-pc-personales','IBM lanza el primer procesador cuántico accesible para el mercado de consumo','https://i.blogs.es/491562/intelcuanticaap/1366_2000.jpg',4,4,'published','2026-01-28 15:40:00','2026-02-13 12:19:56',1),
(8,'NVIDIA RTX 5090: 4 veces más rápida que su predecesora','nvidia-rtx-5090-rendimiento','La nueva generación de tarjetas gráficas establece récords de rendimiento','https://www.storagereview.com/wp-content/uploads/2025/01/StorageReview-NVIDIA-RTX5090-Lab-01-1024x615.jpg',4,4,'published','2026-01-27 09:25:00','2026-02-13 12:21:06',1),
(9,'Internet satelital alcanza velocidades de 1 Gbps globalmente','internet-satelital-1gbps-global','Proyectos de constelación satelital democratizan el acceso a internet de alta velocidad','https://www.adslzone.net/app/uploads-adslzone.net/2024/01/nave-espacial-que-orbita-planeta-tierra-comunicaciones-globales-generadas-ia.jpg',3,5,'published','2026-01-26 12:15:00','2026-02-05 20:26:58',0),
(10,'Robots humanoides realizan tareas domésticas complejas','robots-humanoides-tareas-domesticas','Nueva generación de robots asistentes aprenden y se adaptan a entornos domésticos','https://www.infobae.com/new-resizer/tIpR57VRa38zapjgpaE9nl0rObM=/arc-anglerfish-arc2-prod-infobae/public/WPTXEEPKV5CYBHADF3XIWNT3P4.png',1,5,'published','2026-01-25 17:30:00','2026-02-05 20:27:34',0),
(11,'Meta lanza Llama 3.2 con capacidades de razonamiento matemático avanzado','meta-llama-3-2-razonamiento-matematico','Nuevo modelo open-source supera a GPT-4 en tareas de matemáticas y razonamiento lógico','https://i.ytimg.com/vi/94gWFywzNzA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBRkI0sqKa53yrEN5DHbsVIOK32ng',1,1,'published','2026-01-24 08:45:00','2026-02-13 12:19:56',1),
(12,'DeepMind resuelve problema biológico de plegamiento de proteínas con AlphaFold 3','deepmind-alphafold-3-proteínas','IA de Google logra predicción precisa de estructuras de proteínas con aplicaciones médicas revolucionarias','https://s3.abcstatics.com/media/ciencia/2020/12/01/30SCI-DEEPMIND1-superJumbo-kUoF--1248x698@abc.jpg',1,1,'published','2026-02-14 12:22:20','2026-02-14 12:22:24',6),
(13,'ChatGPT obtiene capacidad de memoria a largo plazo','chatgpt-memoria-largo-plazo','OpenAI actualiza su modelo para recordar conversaciones anteriores y preferencias del usuario','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/C2RUS3WYTJBVLEWKMLRNPB2DYQ.png',1,1,'published','2026-01-22 11:30:00','2026-02-05 21:01:47',0),
(14,'Google Pixel 9 Pro con Tensor G4 y cámara térmica','google-pixel-9-pro-camara-termica','Nuevo sensor térmico permite ver temperatura y detectar problemas eléctricos','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTb4elrGyn1Pr8RfiUz2fehsNynWJ3X8XKBw&s',2,2,'published','2026-02-14 12:21:58','2026-02-14 12:23:28',9),
(15,'Xiaomi presenta smartphone con batería de estado sólido de 6000mAh','xiaomi-bateria-estado-solido','Nueva tecnología de batería ofrece carga completa en 8 minutos y mayor seguridad','https://blob.tusbuenasnoticias.com/images/2025/12/30/vale-la-pena-el-poco-c85-con-bateria-de-6000-mah-y-doble-camara-en-remate-706e2adf-focus-0-0-1200-600.webp',2,2,'published','2026-01-20 09:50:00','2026-02-12 14:37:34',1),
(16,'Nothing Phone (3) con pantalla holográfica retroiluminada','nothing-phone-3-pantalla-holografica','Interfaz Glyph Interface evoluciona con efectos de luz 3D y notificaciones contextuales','https://i.blogs.es/2a45d5/nothing3/450_1000.jpeg',2,2,'published','2026-01-19 13:40:00','2026-02-05 21:03:48',0),
(17,'Visual Studio Code integra Copilot Chat de forma nativa','vscode-copilot-chat-nativo','Microsoft fusiona su IDE con herramientas de IA para desarrollo asistido','https://blog.underc0de.org/wp-content/uploads/2026/01/Sin-titulo-5.png',3,3,'published','2026-01-18 10:25:00','2026-02-05 21:04:26',0),
(18,'Kubernetes 1.30 simplifica la gestión de clusters con IA','kubernetes-1-30-gestion-ia','Nueva versión incluye operadores auto-curativos y optimización automática de recursos','https://www.muylinux.com/wp-content/uploads/2023/10/Kubernetes.png',3,3,'published','2026-01-17 15:10:00','2026-02-05 21:04:49',0),
(19,'Linux 6.10 mejora soporte para hardware ARM y RISC-V','linux-6-10-soporte-arm-riscv','Kernel actualizado optimiza rendimiento en procesadores de arquitectura alternativa','https://blog.underc0de.org/wp-content/uploads/2024/07/R.jpg',3,3,'published','2026-01-16 12:05:00','2026-02-05 21:06:05',0),
(20,'AMD Ryzen 9000: hasta 24 núcleos y frecuencia de 6GHz','amd-ryzen-9000-24-nucleos','Nueva arquitectura Zen 5 ofrece mejora del 35% en rendimiento single-thread','https://www.amd.com/content/dam/amd/en/images/products/processors/ryzen/2613900-ryzen-9-9950x.jpg',4,4,'published','2026-02-14 12:20:49','2026-02-14 12:20:51',8),
(21,'Apple MacBook Pro M4 con Neural Engine de 50 TOPS','macbook-pro-m4-neural-engine','Chip M4 incluye acelerador de IA dedicado para aplicaciones de machine learning','https://www.digitaltrends.com/tachyon/2024/11/macbook-pro-m4-pro-01.jpg?resize=1200%2C720',4,4,'published','2026-01-14 08:20:00','2026-02-05 21:07:04',0),
(22,'Framework Laptop 16: modularidad extrema con GPU intercambiable','framework-laptop-16-gpu-intercambiable','Portátil completamente modular permite actualizar CPU, GPU y puertos individualmente','https://i.blogs.es/f37bd3/nuevo-framework-laptop-16-1/840_560.jpeg',4,4,'published','2026-02-14 12:20:53','2026-02-14 12:21:36',11),
(23,'Starlink alcanza 5 millones de usuarios activos globalmente','starlink-5-millones-usuarios','Servicio de internet satelital expande cobertura a 75 países con velocidades mejoradas','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/BD3QN4RGEVAXDGGAAICM3KXQVQ.png',1,5,'published','2026-01-12 11:15:00','2026-02-05 21:08:31',0),
(24,'Tesla Optimus realiza tareas de fábrica en línea de producción real','tesla-optimus-produccion-real','Robot humanoide de Tesla trabaja junto a humanos ensamblando componentes de vehículos','https://clickpetroleoegas.com.br/wp-content/uploads/2026/01/Design-sem-nome-2026-01-29T190106.112.jpg',3,5,'published','2026-01-11 16:50:00','2026-02-05 21:08:56',0),
(25,'Quantum computer de IBM supera los 1000 qubits útiles','ibm-quantum-1000-qubits','Procesador \"Condor\" marca hito en computación cuántica con corrección de errores integrada','https://i.blogs.es/1df1e8/qubit1/450_1000.jpg',4,5,'published','2026-01-10 09:35:00','2026-02-05 21:09:32',0),
(26,'Alphabet emite $15 000 M en bonos para financiar IA','alphabet-emite-bonos-ia-2026','Alphabet reabre mercado de bonos por 15 000 millones para invertir en IA en 2026 con fuerte interés global.','https://www.automatizapro.com.ar/wp-content/uploads/2025/11/alphabet-bonos-financiar-ia.jpg',1,1,'published','2026-02-14 12:21:38','2026-02-14 12:21:41',4),
(27,'Big Tech dispara inversiones en IA y brilla en CES 2026','big-tech-inversiones-ia-ces-2026','Las grandes tecnológicas presentaron innovaciones en IA y dispositivos inteligentes en CES 2026.','https://www.automatizapro.com.ar/wp-content/uploads/2026/02/big-tech-burbuja-financiera-ia-2026.jpg',1,5,'published','2026-01-07 10:30:00','2026-02-09 14:24:56',0),
(28,'Preocupación por aumento de precios de móviles y PCs por IA','aumento-precios-moviles-pcs-ia-2026','Expertos alertan que la demanda de IA encarece componentes clave como memoria y sube los precios.','https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MPKMGMFDZBHTJEEJJ2XN4HLJT4.png',2,2,'published','2026-01-13 15:45:00','2026-02-09 14:25:21',0),
(29,'Robots, pantallas gigantes y nuevos procesadores dominan CES 2026','robots-pantallas-procesadores-ces-2026','La CES 2026 mostró robots autónomos y nuevos procesadores con inteligencia artificial integrada.','https://resizer.glanacion.com/resizer/v2/un-robot-sharpa-cumpliendo-su-rol-de-croupier-en-USYWRGBJBBFXJLKQG6QF37NXT4.JPG?auth=212fe4f448e06ab589fad8cbb19d74a14187a9138a039950027d126e5c59e09f&width=420&height=280&quality=70&smart=true',2,4,'published','2026-01-14 14:20:00','2026-02-09 14:26:34',0),
(30,'Informe muestra que 1/3 de consumidores rechaza IA en dispositivos','tercio-consumidores-rechaza-ia','Un nuevo estudio revela que un tercio de usuarios rechaza la IA en sus dispositivos por privacidad y coste.','https://hardzone.es/app/uploads-hardzone.es/2026/02/IA-en-PC.jpg',3,1,'published','2026-02-06 09:00:00','2026-02-12 12:32:23',2),
(31,'CES 2026: Innovaciones prácticas con IA en dispositivos y robots','ces-2026-innovaciones-practicas-ia','Más de 4 000 expositores en CES 2026 mostraron aplicaciones útiles de IA para robots, teléfonos y pantallas.','https://www.elheraldo.hn/binrepository/1260x945/0c0/0d0/none/45933/QPCK/el-heraldo-18_13182832_20260109141538.jpg',4,5,'published','2026-01-09 11:00:00','2026-02-09 14:27:42',0),
(32,'Proyección: IA alcanzará 5 000 millones de usuarios para 2030','ia-5-mil-millones-usuarios-2030','Expertos proyectan que la IA podría llegar a 5 000 millones de usuarios para 2030 tras CES 2026.','https://www.hostinger.com/es/tutoriales/wp-content/uploads/sites/32/2023/12/Crecimiento-de-la-industria-de-la-IA-al-2030-scaled.png',1,1,'published','2026-01-07 18:30:00','2026-02-09 14:28:23',0),
(33,'OpenAI lanza \"Omni Model\": un solo IA para texto, voz, visión y robótica','openai-omni-model-unificado','Arquitectura única elimina la necesidad de modelos especializados, reduciendo costos 90%','https://imagenes.computerhoy.20minutos.es/files/image_640_360/uploads/imagenes/2025/06/16/68e7f8b26a6e1.jpeg',1,1,'published','2026-02-16 10:06:55','2026-02-16 13:07:15',0),
(34,'iPhone 17 Ultra: batería que se carga con luz ambiental','iphone-17-ultra-carga-solar','Apple integra células fotovoltaicas transparentes en pantalla que generan 30% de energía diaria','https://i.blogs.es/7442e4/analisis-iphone-17-pro-max-28/375_375.jpeg',2,2,'published','2026-02-28 16:10:00','2026-02-15 13:37:22',0),
(35,'Samsung Galaxy Fold 6: pantalla que se auto-repara de rasguños','samsung-fold-6-autoreparacion','Tecnología \"Self-Healing Display\" utiliza polímeros que regeneran micro-rayones en 24 horas','https://www.repuestostic.com/63892-superlarge_default/cambio-pantalla-interna-samsung-galaxy-z-fold-6-f956-original-service-pack.jpg',2,2,'published','2026-02-25 10:15:00','2026-02-15 13:38:22',0),
(36,'Google Project Ara revive: smartphone modular con actualizaciones mensuales','google-project-ara-modular-2026','Nueva versión permite cambiar procesador, cámara y batería como piezas de LEGO','https://www.zdnet.com/a/img/resize/e7aff3398e12f0fa70fd66238d743054c4c8b95e/2018/04/19/092cbf81-acac-4f3a-91a1-5a26abc1721f/postgresql-logo.png?auto=webp&fit=crop&height=900&width=1200',2,2,'published','2026-02-20 13:40:00','2026-02-15 13:41:22',0),
(37,'Windows 12: Sistema operativo que aprende y se adapta a cada usuario','windows-12-os-adaptativo','IA integrada reconfigura interfaz, optimiza recursos y anticipa necesidades en tiempo real','https://i.blogs.es/03dfc6/captura-de-pantalla-2023-03-29-a-las-9.22.11/840_560.jpeg',3,3,'published','2026-02-18 09:25:00','2026-02-15 13:39:24',0),
(38,'Linux anuncia kernel 100% escrito por IA con supervisión humana','linux-kernel-ia-escrito','Torvalds revela que 85% del código de Linux 7.0 fue generado y verificado por sistemas de IA','https://www.somoslibres.org/images/2022/03/03/ialinux.jpg',3,3,'published','2026-02-15 14:50:00','2026-02-15 13:39:53',0),
(39,'PostgreSQL 17: Base de datos con optimizador de consultas basado en IA','postgresql-17-ia-optimizador','Nuevo motor ejecuta consultas 100x más rápido aprendiendo de patrones de uso específicos','https://www.zdnet.com/a/img/resize/e7aff3398e12f0fa70fd66238d743054c4c8b95e/2018/04/19/092cbf81-acac-4f3a-91a1-5a26abc1721f/postgresql-logo.png?auto=webp&fit=crop&height=900&width=1200',3,3,'published','2026-02-12 11:30:00','2026-02-15 13:42:03',0),
(40,'Quantum PC de consumo: 50 qubits en tu escritorio por $5,000','quantum-pc-consumo-50-qubits','Startup \"QubitHome\" lanza primera computadora cuántica asequible para desarrolladores','https://futurism.com/wp-content/uploads/2021/02/quantum-desktop-computer-5000.jpg?quality=85',4,4,'published','2026-02-10 15:45:00','2026-02-15 13:42:27',0),
(41,'NVIDIA RTX 6000 Ada: 4 TB/s de ancho de banda con memoria 3D stacked','nvidia-rtx-6000-4tbs-memoria','Tarjeta gráfica profesional rompe récords con chiplet design y refrigeración por inmersión','https://acf.geeknetic.es/imgri/imagenes/auto/2023/1/23/obe-la-nvidia-rtx-6000-ada-generation-ya-se-puede-comprar-en-la-web-de-nvidia-por-6800-dolares.jpg?f=webp',4,4,'published','2026-02-08 10:20:00','2026-02-15 13:43:13',0),
(42,'AMD APU con 256GB de memoria HBM4 integrada','amd-apu-256gb-hbm4','Chip \"Strix Halo\" elimina necesidad de RAM separada, revolucionando laptops gaming','https://acf.geeknetic.es/imgri/imagenes/auto/2025/11/21/rqe-amd-instinct-mi403x.png?f=webp',4,4,'published','2026-02-05 13:15:00','2026-02-15 13:44:05',0),
(43,'Internet 6G: velocidades de 1 Tbps y latencia de 0.1ms','internet-6g-1tbps-latencia','Primeras redes comerciales 6G activadas en Corea del Sur, Japón y Finlandia','https://inteligenciaargentina.ar/storage/uploads/aABhWWudXYzX1rZU7N5cAWLMuzIRXbw5qpOzPHB4.webp',1,5,'published','2026-02-03 16:30:00','2026-02-15 13:44:25',0),
(44,'Hyperloop comercial conecta NYC-Washington en 25 minutos','hyperloop-nyc-washington-25min','Primera ruta de transporte supersónico subterráneo inaugurada en Estados Unidos','https://i.blogs.es/fc9c44/hyperloop/840_560.png',3,5,'published','2026-02-01 09:40:00','2026-02-15 13:44:50',0),
(45,'Fusión nuclear controlada produce energía neta positiva continua','fusion-nuclear-energia-positiva-continua','Reactor SPARC de MIT logra 24 horas de fusión sostenida, hito histórico energético','https://www.gaceta.unam.mx/wp-content/uploads/2023/01/230109-Aca1-des-f1-fusion-nuclear.jpg',4,5,'published','2026-01-30 14:25:00','2026-02-15 13:45:10',0),
(46,'IA de Michigan lee resonancias magnéticas cerebrales en segundos con 97.5% de precisión','ia-michigan-resonancias-magneticas-cerebrales','Sistema de inteligencia artificial identifica emergencias neurológicas instantáneamente, superando a herramientas avanzadas existentes','https://images-tools.cadena3.com/tools/r/88788f8e-8b07-43d4-8547-e701f0dcec49.jpg?width=1200&height=800',1,1,'published','2026-02-14 09:30:00','2026-02-15 13:46:07',0),
(49,'India AI Summit 2026 reúne a Sundar Pichai, Sam Altman y Bill Gates en Nueva Delhi','india-ai-summit-2026-sundar-pichai-sam-altman','Cumbre tecnológica global busca transformar discusiones sobre IA en desarrollo económico y social para India','https://images.financialexpressdigital.com/2026/02/Untitled-design-2026-02-10T094319.357.jpg',3,1,'published','2026-02-15 16:20:00','2026-02-15 13:47:43',0),
(50,'Desarrollo de nuevo Siri con IA enfrenta retrasos, algunas funciones podrían llegar hasta septiembre','apple-siri-ia-retrasos-ios-27','Problemas en pruebas retrasan el lanzamiento de funciones avanzadas del asistente, ahora previstas para iOS 26.5 o iOS 27','https://www.semana.com/resizer/v2/VOIDQRWMYVCPLIKA4FEJGD63HM.jpg?auth=51df33fe93aa417eb0cf008154f7932a10b5eee68a6bda789a97e3f1f5b319d5&smart=true&quality=75&width=1280',3,1,'published','2026-02-13 10:10:00','2026-02-15 13:48:13',0),
(51,'Elon Musk anuncia plan para construir fábrica de satélites de IA en la Luna','elon-musk-fabrica-satelites-ia-luna','CEO de xAI propone usar la Luna como base para lanzar satélites impulsados por inteligencia artificial y expandir capacidad computacional','https://elnacional.com.do/wp-content/uploads/2026/02/Elon-Musk-anuncia-que-SpaceX-planea-la-construccion-de-una-ciudad-en-la-Luna.jpg',1,1,'published','2026-02-12 08:50:00','2026-02-15 13:48:35',0),
(52,'Mistral AI invierte 1.200 millones de euros en infraestructura en Suecia','mistral-ai-inversion-suecia-infraestructura','La \"OpenAI europea\" construye centro de datos y capacidad de computación avanzada para sus modelos de próxima generación','https://assets.mobileworldlive.com/wp-content/uploads/2016/11/16124852/Sweden.jpg',3,1,'published','2026-02-11 13:30:00','2026-02-15 13:49:17',0),
(53,'Samsung confirma Galaxy Unpacked el 25 de febrero: Galaxy S26 con IA \"personal y adaptativa\"','samsung-galaxy-unpacked-25-febrero-s26-ia','Nueva generación de flagships llegará con Snapdragon 8 Elite Gen 5 y funciones de inteligencia artificial avanzadas','https://www.profesionalreview.com/wp-content/uploads/2025/10/Samsung-Galaxy-S26-Ultra-portada.jpg',2,2,'published','2026-02-11 12:00:00','2026-02-15 13:50:18',0),
(54,'Galaxy S26 Ultra podría sacrificar capa digital del S Pen para incorporar carga magnética Qi2','galaxy-s26-ultra-s-pen-qi2','Samsung evalúa eliminar digitalizador del lápiz para permitir alineación magnética en nueva generación de carga inalámbrica','https://es.digitaltrends.com/tachyon/sites/13/2025/11/Samsung-Galaxy-S25-Ultra-Magnetic-Charging-Cover-4-edited.webp?fit=1529%2C1150',2,2,'published','2026-02-10 15:40:00','2026-02-15 13:50:54',0),
(55,'Galaxy S26 Edge sería uno de los smartphones más delgados del mercado con solo 5.5mm','galaxy-s26-edge-5-5mm-delgado','Modelo ultrafino mantendría diseño diferenciado sin reemplazar a la versión Plus, similar a estrategia de foldables','https://compao.com/wp-content/uploads/2025/08/Samsung-Galaxy-S26-1.webp',2,2,'published','2026-02-09 10:30:00','2026-02-15 13:51:19',0),
(56,'Escasez de chips impulsada por IA dispara precios de smartphones hasta 8% en 2026','escasez-chips-ia-precios-smartphones-2026','Demanda de memoria para inteligencia artificial eleva costos de componentes, fabricantes trasladan aumento a consumidores','https://ipadizate.com/hero/2026/01/chips-apple-para-iphone.png?width=1200&aspect_ratio=16:9',2,2,'published','2026-02-12 09:15:00','2026-02-15 13:51:56',0),
(58,'Inversión tecnológica global en IA alcanzará los 600 mil millones de dólares en 2026','inversion-tecnologica-global-ia-600-mil-millones','Amazon, Google, Meta y Microsoft lideran gasto de capital en inteligencia artificial, generando preocupación en inversores','https://revistamercado.do/wp-content/uploads/2024/08/Captura-de-Pantalla-2024-08-06-a-las-10.25.13-a.-m.translated.jpg',3,3,'published','2026-02-09 14:50:00','2026-02-15 13:52:47',0),
(59,'Venta masiva de acciones tecnológicas: índice de software S&P 500 cae 2.7% por temores de disrupción de IA','venta-acciones-software-sp500-ia-disrupcion','Inversores exigen retornos tangibles en inteligencia artificial mientras empresas tradicionales enfrentan amenaza existencial','https://www.redimin.cl/wp-content/uploads/2026/02/Imagen-Referencial-FU-206.webp',1,3,'published','2026-02-13 16:30:00','2026-02-15 13:53:41',0),
(60,'Cisco sufre caída del 11% en bolsa tras reportar márgenes por debajo de expectativas','cisco-caida-11-bolsa-margenes','Fabricante de equipos de red afectado por transición hacia infraestructura de IA y escasez de componentes','https://cloudfront-us-east-1.images.arcpublishing.com/bloomberglinea/4SCUJ5FYYVC3RIJ3WXXX2OAHRA.jpg',4,3,'published','2026-02-12 13:10:00','2026-02-15 13:54:02',0),
(61,'Lenovo advierte sobre presión en envíos de PC por escasez de chips de memoria','lenovo-presion-envios-pc-escasez-chips','Fabricante chino señala que disponibilidad limitada de semiconductores afectará suministro de computadoras personales','https://www.fayerwayer.com/resizer/v2/DM4TYN6HCZAWTNDHIRFBAINCSY.jpg?auth=bfdac512ca9e94496db30d018ae833700e7ac0d377203701248c0c75f228f3b1&width=800&height=533',4,3,'published','2026-02-11 09:45:00','2026-02-15 13:54:33',0),
(62,'Mercado global de semiconductores crecerá 25% en 2026 hasta alcanzar los 975 mil millones','mercado-semiconductores-crecimiento-25-975-mil-millones','Demanda de chips para IA impulsa expansión récord de la industria, pero tensiona cadenas de suministro globales','https://thelogisticsworld.com/wp-content/uploads/2025/12/panorama-semiconductores-2026.webp',4,4,'published','2026-02-10 11:30:00','2026-02-15 13:55:03',0),
(63,'Precios de chips de memoria aumentaron 50% en 2025, afectando costo de PCs y dispositivos','precios-chips-memoria-aumento-50-2025','Asociación Alemana de Industria Eléctrica advierte que era de almacenamiento barato llega a su fin por demanda de IA','https://www.elheraldo.hn/binrepository/1260x687/0c0/0d0/none/45933/QOFU/diseno-sin-titulo_13479147_20260209165212.jpg',4,4,'published','2026-02-09 15:20:00','2026-02-15 13:55:33',0),
(64,'Corea del Sur lanza proyecto de 687 millones de dólares para desarrollar chips de IA para robótica y autos','corea-sur-proyecto-687-millones-chips-ia','Iniciativa público-privada de 5 años busca producir 10 tipos de semiconductores para dispositivos autónomos y robots humanoides','https://c.files.bbci.co.uk/D040/production/_99221335_78c9d3d9-5492-46cd-abb1-81d4fbaf9e1c.jpg',4,4,'published','2026-02-11 08:30:00','2026-02-15 13:56:06',0),
(65,'NVIDIA, AMD y otras fabricantes de chips caen en bolsa por temores sobre retorno de inversión en IA','nvidia-amd-caida-bolsa-retorno-ia','Philadelphia SE Semiconductor Index retrocede 1.7% mientras mercado cuestiona sostenibilidad del gasto en inteligencia artificial','https://www.bloomberglinea.com/resizer/v2/QPS3RDB2ANBDPAQWBP2R4CJRLY.jpeg?auth=7e43789b8e9057a811e71a3732c0247f1659519248dfe91aae48ed3b512634fc&width=1000&height=577&quality=80&smart=true',4,4,'published','2026-02-12 14:40:00','2026-02-15 13:56:32',0),
(66,'Meta construye centro de datos de 1 gigawatt con inversión superior a 10,000 millones','meta-centro-datos-1-gigawatt-10000-millones','Instalación en Indiana será una de las más grandes del mundo y alimentará cargas de trabajo de IA de próxima generación','https://www.infobae.com/resizer/v2/HKU2NNG57VBNZP3HGKUOVJOFAY.png?auth=1230c61fdac88792e335315ca063022961afa1c07b9378bb481d43f3edc67cbb',3,5,'published','2026-02-12 10:15:00','2026-02-15 13:57:09',0),
(67,'Inversores surcoreanos compran acciones de MiniMax-WP, el modelo chino de IA que desafía a OpenAI','corea-sur-minimax-wp-acciones-ia-china','Interés por inteligencia artificial china crece en mercados asiáticos mientras diversifican apuestas tecnológicas','https://imagenes.businessinsider.es/files/image_1920_1080/uploads/imagenes/2026/01/09/6960b8456df1f2-36347522.jpeg',1,5,'published','2026-02-10 12:45:00','2026-02-15 13:57:47',0),
(68,'NASA completa primer recorrido en Marte planificado íntegramente por inteligencia artificial','nasa-perseverance-marte-ia-planificacion','Rover Perseverance utilizó sistema de visión por computadora para identificar peligros y trazar ruta autónoma en suelo marciano','https://c.files.bbci.co.uk/170CC/production/_117021449_diana6.jpg',3,5,'published','2026-02-08 09:20:00','2026-02-15 13:58:45',0),
(69,'Claude 3.5 introduce nuevas técnicas de entrenamiento que reducen costos de inferencia en 35%','claude-3-5-reduccion-costos-inferencia','La actualización del modelo de Anthropic optimiza recursos y mejora la eficiencia energética en centros de datos','https://iaexpertos.com/wp-content/uploads/2025/05/claude.png',1,1,'published','2026-02-03 10:30:00','2026-02-15 13:59:07',0),
(70,'Llama 3.2 experimenta rápida adopción empresarial como plataforma open source','llama-3-2-adopcion-empresarial-open-source','Empresas de todo el mundo integran el modelo de Meta en sus flujos de trabajo por su flexibilidad y eficacia','https://about.fb.com/ltam/wp-content/uploads/sites/14/2024/09/image2.png?w=1200',1,1,'published','2026-02-03 11:15:00','2026-02-15 13:59:38',0),
(71,'Z.ai lanza GLM-5: modelo de IA open source con 745.000 millones de parámetros entrenado con chips Huawei','zai-glm5-ia-open-source-parametros-huawei','El modelo chino supera en rendimiento a GPT-5.2 con una tasa de alucinación récord y precio competitivo','https://ecosistemastartup.com/wp-content/uploads/2026/02/glm-5-modelo-open-source-menor-alucinaciones-ia-scaled.jpg',3,1,'published','2026-02-12 09:45:00','2026-02-15 14:00:02',0),
(72,'Compañeros de IA generan lazos afectivos: MIT advierte sobre relaciones emocionales con chatbots','ia-compañeros-lazos-afectivos-mit','Expertos señalan la necesidad de regular el uso extendido de asistentes conversacionales que generan vínculos personales','https://www.lavanguardia.com/files/article_gallery_microformat/uploads/2025/09/02/68b71b58a3137.jpeg',1,1,'published','2026-01-14 14:20:00','2026-02-15 14:00:29',0),
(73,'Interpretabilidad mecanicista: nuevas técnicas para entender el funcionamiento interno de los LLMs','interpretabilidad-mecanicista-llms-funcionamiento','Grandes tecnológicas desarrollan métodos para comprender por qué los modelos de IA generan respuestas específicas','https://iaticias.com/wp-content/uploads/2025/04/image-1.png',3,1,'published','2026-01-20 11:10:00','2026-02-15 14:01:04',0),
(74,'Google Gemini 3 mejora capacidades de razonamiento avanzado en tareas complejas','google-gemini-3-razonamiento-avanzado','Nueva versión del modelo multimodal de Google supera a competidores en benchmarks de lógica y matemáticas','https://raona.com/wp-content/uploads/2025/12/gemini-3-novedades.png',3,1,'published','2026-02-14 16:30:00','2026-02-15 14:01:25',0),
(75,'ONU crea panel científico global para gobernanza de inteligencia artificial','onu-panel-cientifico-gobernanza-ia','Organismo internacional busca establecer directrices éticas y marcos regulatorios para el desarrollo de IA','https://centralnoticias.gob.do/wp-content/uploads/2025/08/ONU.webp',1,1,'published','2026-02-14 09:20:00','2026-02-15 14:01:50',0),
(76,'Apple corrige vulnerabilidad zero-day CVE-2026-20700 explotada en ataques sofisticados','apple-corrige-zero-day-cve-2026-20700','iOS 26.3, macOS Tahoe 26.3 y visionOS 26.3 incluyen parche para fallo en enlazador dinámico descubierto por Google TAG','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbWYfD6d-c2Nee6NO4OcwuHakHLwVe80HSmA&s',3,3,'published','2026-02-12 08:15:00','2026-02-15 14:02:19',0),
(77,'Google cancela inesperadamente lanzamiento de Android 17 Beta 1 sin explicación oficial','google-cancela-android-17-beta-1','La compañía pospone la primera beta de su nuevo sistema operativo generando especulaciones sobre problemas internos','https://andro4all.com/hero/2025/10/android-17-permitira-usar-apps-en-pantalla-completa-dentro-del-modo-always-on-display.jpg?width=1200',3,3,'published','2026-02-12 10:30:00','2026-02-15 14:02:42',0),
(78,'Descubren primer complemento malicioso de Outlook que roba más de 4.000 credenciales','outlook-complemento-malicioso-robo-credenciales','Ataque \"AgreeToSteal\" aprovecha vulnerabilidad en proceso de revisión de Microsoft Store para comprometer usuarios','https://web-assets.esetstatic.com/tn/-x700/wls/2025/02-25/spear-phishing-voicemail/spear-phishing-ataque-voicemail-hero.jpeg',3,3,'published','2026-02-12 11:45:00','2026-02-15 14:02:57',0),
(79,'Botnet SSHStalker ataca sistemas Linux con exploits de kernel de 2009','botnet-sshstalker-linux-exploits-antiguos','Malware utiliza IRC como canal de comando y control para comprometer servidores no actualizados desde hace 15 años','https://i0.wp.com/unaaldia.hispasec.com/wp-content/uploads/2022/01/programming-code-abstract-technology-background-of-software-developer-and-computer-script.jpg?fit=6000%2C4000&ssl=1',4,3,'published','2026-02-12 12:20:00','2026-02-15 14:03:45',0),
(81,'Kubernetes 1.30 mejora eficiencia en programación de recursos en 40%','kubernetes-1-30-eficiencia-programacion-recursos','Nueva versión optimiza cargas de trabajo en la nube y consolida GitOps como estándar con ArgoCD','https://www.sredevops.org/content/images/size/w900/format/webp/2024/03/1688281768383.png',3,3,'published','2026-02-03 12:45:00','2026-02-15 14:04:20',0),
(82,'Meta prepara reconocimiento facial \"Name Tag\" para gafas Ray-Ban','meta-name-tag-reconocimiento-facial-ray-ban','Función permitiría identificar personas en la calle mediante IA, aprovechando clima político en EE.UU. para minimizar críticas','https://ecosistemastartup.com/wp-content/uploads/2026/02/meta-reconocimiento-facial-gafas-inteligentes-scaled.jpg',2,2,'published','2026-02-15 08:30:00','2026-02-15 14:04:44',0),
(83,'Elon Musk anuncia plan para construir fábrica de satélites de IA en la Luna','elon-musk-fabrica-satelites-ia-luna-expansion','Proyecto de xAI busca utilizar base lunar para lanzar satélites y expandir capacidad computacional extraterrestre','https://www.argoslatino.com/images/Featured-Images/musk-en-la-luna.webp',1,5,'published','2026-02-12 14:50:00','2026-02-15 14:05:03',0),
(87,'Oracle avanza cerca de 10% en bolsa liderado por resultados en IA','oracle-avance-bolsa-resultados-ia','Compañía tecnológica se beneficia de demanda empresarial por infraestructura para inteligencia artificial','https://s.yimg.com/ny/api/res/1.2/XVRqLGWiy6FbCcoPTquxLg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTY0MDtoPTQyNw--/https://media.zenfs.com/es/benzinga_espana_latam_149/3ecbdbf652a74b6421203f461a4f40b9',4,4,'published','2026-02-10 17:45:00','2026-02-15 14:06:19',0),
(88,'Centros de datos a hiperescala consumen tanta energía como ciudades enteras','centros-datos-hiperescala-consumo-energetico','MIT advierte sobre el impacto ambiental de infraestructuras masivas que requieren agua para refrigeración','https://i.blogs.es/87d97e/guia-de-imagenes-destacadas-1-/1200_900.png',4,4,'published','2026-01-14 15:30:00','2026-02-15 14:06:39',0),
(90,'Baterías de iones de sodio: la alternativa barata y segura al litio','baterias-iones-sodio-alternativa-litio','MIT destaca esta tecnología como tendencia clave para 2026 en almacenamiento energético y vehículos eléctricos','https://www.cambioenergetico.com/wp-content/uploads/Baterias-iones-sodio-CATL-1.jpg',4,5,'published','2026-01-14 12:15:00','2026-02-15 14:07:09',0),
(91,'Energía nuclear de próxima generación: reactores compactos y más seguros','energia-nuclear-proxima-generacion-reactores','Nuevos diseños prometen expandir la energía sin emisiones con materiales innovadores y menor coste','https://blogthinkbig.com/wp-content/uploads/sites/4/2025/02/nuclear-power-plant-rocks-sun.jpg',4,5,'published','2026-01-14 13:40:00','2026-02-15 14:07:25',0),
(92,'Resurrección de genes: bancos de ADN de especies extintas abren nuevas posibilidades','resurreccion-genes-adn-especies-extintas','Científicos estudian información genética antigua para proteger especies actuales y crear plantas resistentes al cambio climático','https://www.cronista.com/resizer/v2/47IDHE3NSNBGJL2OCFCELMQCYE.jpg?auth=df11e4ee39a1939bd877e04ca22679698d86ef439d57315f403f232cb6205956&height=533&width=800&quality=70&smart=true',1,5,'published','2026-01-14 14:50:00','2026-02-15 14:08:03',0),
(93,'Tests genéticos en embriones: avances y dilemas éticos en 2026','tests-geneticos-embriones-avances-etica','MIT señala esta tendencia como una de las que experimentarán impulso durante el año, con debates sobre sus límites','https://www.institutobernabeu.com/wp-content/uploads/2026/01/22-01-land-1-1.jpg',1,5,'published','2026-01-14 15:45:00','2026-02-15 14:08:30',0),
(95,'Traducción simultánea en tiempo real: aprender idiomas dejará de ser imprescindible','traduccion-simultanea-tiempo-real-idiomas','Apple y Google ya tienen sistemas compatibles con auriculares para eliminar barreras lingüísticas','https://s.yimg.com/ny/api/res/1.2/3on7NM503A1zi79M6BSJeg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyNDI7aD02OTk7Y2Y9d2VicA--/https://media.zenfs.com/es/fast_company_mexico_606/bbb60e598aeef3ae09c93eb7a1d10e25',2,2,'published','2026-01-14 17:15:00','2026-02-15 14:09:17',0),
(96,'IA conquista el espacio: primer modelo entrenado en órbita por Nvidia y StarCloud','ia-espacio-modelo-entrenado-orbita','Las condiciones térmicas y energéticas del espacio ofrecen ventajas para centros de datos','https://www.hd-tecnologia.com/imagenes/articulos/2025/10/NVIDIA-llevara-la-inteligencia-artificial-al-espacio-exterior-con-el-primer-centro-de-datos-orbital-del-mundo-2.jpg',3,5,'published','2026-01-14 18:00:00','2026-02-15 14:09:50',0),
(98,'claro claro claro ','claro-claro-claro','claro claro claro claro claro','https://localo.com/es/assets/img/definitions/what-is-google-translate.webp',3,3,'published','2026-02-21 13:01:39','2026-02-21 13:29:44',0);

/*Table structure for table `news_blocks` */

DROP TABLE IF EXISTS `news_blocks`;

CREATE TABLE `news_blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `news_id` int NOT NULL,
  `block_type` enum('paragraph','image','heading') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `alt_text` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `position` int NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `fk_blocks_news` (`news_id`),
  CONSTRAINT `fk_blocks_news` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `news_blocks` */

insert  into `news_blocks`(`id`,`news_id`,`block_type`,`content`,`image_url`,`alt_text`,`position`,`created_at`) values 
(1,1,'heading','La revolución multimodal de la IA','https://blog.donweb.com/wp-content/uploads/2025/08/Lo-nuevo-de-GPT-5.jpeg',NULL,1,'2026-02-05 12:46:12'),
(2,1,'paragraph','OpenAI ha presentado oficialmente GPT-5, su modelo de lenguaje más avanzado hasta la fecha. Lo que diferencia a esta versión es su capacidad nativa para entender y generar contenido en múltiples formatos: texto, imágenes, audio y video.',NULL,NULL,2,'2026-02-05 12:46:12'),
(3,1,'paragraph','Según los desarrolladores, GPT-5 puede mantener conversaciones coherentes mientras analiza documentos visuales, generando respuestas que integran información de todas las modalidades.',NULL,NULL,3,'2026-02-05 12:46:12'),
(4,1,'image','','gpt5-multimodal-diagram.jpg','Arquitectura multimodal de GPT-5',4,'2026-02-05 12:46:12'),
(5,3,'heading','Diseño sin bisel revolucionario',NULL,NULL,1,'2026-02-05 12:46:12'),
(6,3,'paragraph','Samsung ha desvelado el Galaxy S30, su nuevo smartphone insignia que presenta una pantalla plegable completamente libre de biseles. La tecnología \"Flex Infinity Display\" permite un ángulo de visión ininterrumpido de 180 grados.',NULL,NULL,2,'2026-02-05 12:46:12'),
(7,3,'paragraph','El dispositivo utiliza un nuevo tipo de vidrio ultra-flexible desarrollado conjuntamente con Corning, ofreciendo una resistencia al rayado 3 veces mayor que las generaciones anteriores.',NULL,NULL,3,'2026-02-05 12:46:12'),
(8,3,'image','','galaxy-s30-flex.jpg','Samsung Galaxy S30 completamente desplegado',4,'2026-02-05 12:46:12'),
(9,5,'heading','Copilot integrado en el sistema',NULL,NULL,1,'2026-02-05 12:46:12'),
(10,5,'paragraph','Microsoft ha anunciado Windows 13, que incluye por primera vez un asistente de IA nativo llamado \"Windows Copilot\". Esta herramienta está integrada directamente en el sistema operativo y puede ejecutarse localmente sin necesidad de conexión a internet.',NULL,NULL,2,'2026-02-05 12:46:12'),
(11,5,'paragraph','Windows Copilot puede automatizar tareas complejas, optimizar el rendimiento del sistema y ofrecer sugerencias contextuales basadas en el uso del usuario.',NULL,NULL,3,'2026-02-05 12:46:12'),
(12,5,'image','','windows-copilot-interface.jpg','Interfaz de Windows Copilot en acción',4,'2026-02-05 12:46:12'),
(13,7,'heading','La computación cuántica llega al hogar',NULL,NULL,1,'2026-02-05 12:46:12'),
(14,7,'paragraph','IBM ha anunciado el procesador cuántico \"Q-ONE Consumer\", el primero diseñado específicamente para computadoras personales. Con 128 qubits de potencia, ofrece capacidades de cálculo que superan a los supercomputadores de hace una década.',NULL,NULL,2,'2026-02-05 12:46:12'),
(15,7,'paragraph','El procesador viene integrado en placas madre especializadas que mantienen los qubits a temperaturas cercanas al cero absoluto, usando un sistema de refrigeración compacto.',NULL,NULL,3,'2026-02-05 12:46:12'),
(16,7,'image','','quantum-processor-motherboard.jpg','Placa madre con procesador cuántico',4,'2026-02-05 12:46:12'),
(17,9,'heading','Conectividad global a velocidad de fibra',NULL,NULL,1,'2026-02-05 12:46:12'),
(18,9,'paragraph','Varios proyectos de constelación satelital, liderados por SpaceX, Amazon y OneWeb, han alcanzado cobertura global completa. Los usuarios en cualquier punto del planeta pueden acceder a internet de 1 Gbps con latencias menores a 20ms.',NULL,NULL,2,'2026-02-05 12:46:12'),
(19,9,'paragraph','Esta tecnología está revolucionando especialmente las zonas rurales y en desarrollo, donde la infraestructura terrestre es limitada o inexistente.',NULL,NULL,3,'2026-02-05 12:46:12'),
(20,9,'image','','satellite-constellation-globe.jpg','Cobertura global de constelación satelital',4,'2026-02-05 12:46:12'),
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
(34,11,'image','','llama3-2-benchmarks.jpg','Resultados de benchmarks de Llama 3.2 vs competencia',4,'2026-02-05 20:49:46'),
(35,14,'heading','Google innova con sensor térmico en smartphone',NULL,NULL,1,'2026-02-05 20:49:46'),
(36,14,'paragraph','El Google Pixel 9 Pro incluye un sensor térmico FLIR que permite medir temperatura de objetos desde -20°C hasta 400°C. Esta función tiene aplicaciones prácticas en detección de sobrecalentamiento eléctrico, verificación de aislamiento térmico y monitoreo de salud.',NULL,NULL,2,'2026-02-05 20:49:46'),
(37,14,'paragraph','El Tensor G4, fabricado en 3nm, incluye un TPU dedicada para procesamiento de imágenes térmicas en tiempo real.',NULL,NULL,3,'2026-02-05 20:49:46'),
(38,14,'image','','pixel9-thermal-imaging.jpg','Pixel 9 Pro mostrando imagen térmica de un circuito',4,'2026-02-05 20:49:46'),
(39,17,'heading','Desarrollo asistido por IA integrado en VS Code',NULL,NULL,1,'2026-02-05 20:49:46'),
(40,17,'paragraph','Microsoft ha integrado GitHub Copilot Chat directamente en Visual Studio Code como función nativa. Los desarrolladores pueden ahora conversar con la IA sobre su código, pedir explicaciones, refactorizaciones y sugerencias sin cambiar de ventana.',NULL,NULL,2,'2026-02-05 20:49:46'),
(41,17,'paragraph','La versión 1.90 de VS Code incluye también \"Inline Chat\" que permite hacer preguntas contextuales directamente en el editor de código.',NULL,NULL,3,'2026-02-05 20:49:46'),
(42,17,'image','','vscode-copilot-chat.jpg','Interfaz de Copilot Chat en Visual Studio Code',4,'2026-02-05 20:49:46'),
(43,20,'heading','AMD lanza arquitectura Zen 5 con Ryzen 9000',NULL,NULL,1,'2026-02-05 20:49:46'),
(44,20,'paragraph','AMD presenta los procesadores Ryzen 9000 basados en la nueva arquitectura Zen 5. El flagship Ryzen 9 9950X ofrece 24 núcleos/48 hilos con frecuencias boost de hasta 6GHz y TDP de 170W.',NULL,NULL,2,'2026-02-05 20:49:46'),
(45,20,'paragraph','Las mejoras incluyen un 35% más de IPC (Instrucciones Por Ciclo), cache L3 aumentada a 128MB y soporte nativo para DDR5-6400. La fabricación en 4nm TSMC permite mayor eficiencia energética.',NULL,NULL,3,'2026-02-05 20:49:46'),
(46,20,'image','','ryzen-9000-architecture.jpg','Diagrama de arquitectura Zen 5 de AMD',4,'2026-02-05 20:49:46'),
(47,23,'heading','Starlink alcanza hitos de crecimiento masivo',NULL,NULL,1,'2026-02-05 20:49:46'),
(48,23,'paragraph','SpaceX ha anunciado que Starlink supera los 5 millones de usuarios activos en 75 países. El servicio ofrece ahora velocidades de hasta 500 Mbps con latencias de 20ms mediante la constelación de satélites de segunda generación.',NULL,NULL,2,'2026-02-05 20:49:46'),
(49,23,'paragraph','La empresa ha desplegado más de 5,000 satélites activos y planea lanzar la versión \"Mini\" del terminal para movilidad, con 40% menos tamaño y consumo.',NULL,NULL,3,'2026-02-05 20:49:46'),
(50,23,'image','','starlink-global-coverage.jpg','Mapa de cobertura global de Starlink',4,'2026-02-05 20:49:46'),
(89,98,'heading','wow wow wow',NULL,NULL,1,'2026-02-21 13:29:44'),
(90,98,'image','','https://www.gstatic.com/marketing-cms/5e/ec/5b5baeb34571b791b2020d4cacad/meta-image.png','seacrh',2,'2026-02-21 13:29:44'),
(91,98,'paragraph','wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow wow',NULL,NULL,3,'2026-02-21 13:29:44');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('superadmin','admin','support','editor','author') NOT NULL DEFAULT 'editor',
  `active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`username`,`email`,`password`,`role`,`active`,`created_at`) values 
(1,'darlin','darlinlvaldez@gmail.com','$2b$10$2LKClehgb5ifsKKVHQDh/u8E3VmxyjYjVW3Pd0Cuty9vBrkvSraZy','superadmin',1,'2026-02-24 19:52:21'),
(2,'ana torres','anatorres@gmail.com','$2b$10$u1rbukGt2wC9qla7UxwUJ..lJtNTH9chXxArqMwBmBGe24FQoQ/IG','author',1,'2026-02-25 19:36:00'),
(3,'carlos mendoza','carlosmendoza@gmail.com','$2b$10$LsGLMl3rGkp8hWf1KrMBMuTScmSf5yeP8QUKIgQnhi.br/1haltxK','author',1,'2026-02-25 19:37:15'),
(4,'laura vega','lauravega@gmail.com','$2b$10$hTBJsFQ2H3Eu9sJTnfIYCuxq2y37VBHW84xscLDwubL8oKfCkhGKO','author',1,'2026-02-25 19:37:50'),
(5,'miguel ruiz','miguelruiz@gmail.com','$2b$10$oS13OGYebsgM9c31EFOfMOfziqnGX6TFoxeKuG94S/cwIY2q1FCsS','author',1,'2026-02-25 19:38:15');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
