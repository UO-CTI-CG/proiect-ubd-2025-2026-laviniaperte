CREATE DATABASE  IF NOT EXISTS `biblioteca` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `biblioteca`;
-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: biblioteca
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `auth_users`
--

DROP TABLE IF EXISTS `auth_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_users`
--

LOCK TABLES `auth_users` WRITE;
/*!40000 ALTER TABLE `auth_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `year` int DEFAULT NULL,
  `available` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (8,'Ink Heart','Cornelia Funke',NULL,2011,1),(10,'Ana','Mae',NULL,2004,1),(11,'Poezii','Mihai Eminescu',NULL,1998,1),(12,'Amintiri din copilarie','Ion Creanga',NULL,2011,1),(13,'Harry Potter','J K Rowling',NULL,2012,1),(14,'Percy Jackson','Rick Riordan',NULL,2020,1),(15,'Poezii','MihaiEminescu',NULL,1987,1),(16,'5FeetApart','Haley Ruchardson',NULL,2019,1),(18,'Reverie cu flori de cireș','Gwyneth Rees',NULL,2015,1),(21,'Si soarele e o stea','John Green',NULL,2016,1);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `librarians`
--

DROP TABLE IF EXISTS `librarians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `librarians` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `librarians`
--

LOCK TABLES `librarians` WRITE;
/*!40000 ALTER TABLE `librarians` DISABLE KEYS */;
INSERT INTO `librarians` VALUES (1,'laviniaperte@gmail.com','scrypt:32768:8:1$RnqH9E8wc5arGUDd$5cb05183da3f98330013d92a2d6abae0fb9255c5bff95c46baf53d6a90eadc2b3725d75f528f734a65864788746665a8159246808de0a3c901e0876d121035e6'),(2,'nyanya@gmail.com','scrypt:32768:8:1$pFWw4WSFOgWMMaKO$fd9a977f8a4667d14a5090160ecfb45fc7881154b5a33b54176407508afbb27e7c48ee3f5d035ef63394d59b28d44d078118538e71ef25893f272b3c7718a76d'),(3,'stefaniaperte@gmail.com','scrypt:32768:8:1$WWjyxGB15sRf6PIA$b2470a55c6e38bfc46d6a8350c8b1a841202d884f9a89927fd02aa955d4adeb5a63100fc8dd0e1794fde79078c9a495b067af8c0a82db22688136805e7b401c8'),(4,'lavynya','scrypt:32768:8:1$n3SS7J8RlLaGrtM3$36b75c5d5409d37ab467c870b4fef43f0e9dac4ea2f18f51bf876cd9fad70205121c0e3cd86fc9d68885499c5bf45022563ec5c1033d0696a2678fe8732563f3');
/*!40000 ALTER TABLE `librarians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loans`
--

DROP TABLE IF EXISTS `loans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loans` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `book_id` int NOT NULL,
  `loan_date` date DEFAULT NULL,
  `return_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `book_id` (`book_id`),
  CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loans`
--

LOCK TABLES `loans` WRITE;
/*!40000 ALTER TABLE `loans` DISABLE KEYS */;
INSERT INTO `loans` VALUES (1,2,8,'2025-12-19','2025-12-27'),(2,2,10,'2025-11-19','2025-12-02'),(3,4,10,'2024-07-07','2024-09-08'),(4,5,14,'2024-07-05','2025-04-06'),(5,4,10,'2025-07-12','2025-07-26'),(10,4,13,'2025-12-08','2025-12-18'),(12,8,16,'2025-12-09','2025-12-28'),(15,8,8,'2025-11-02','2025-11-09'),(16,3,10,'2025-12-02','2025-12-11'),(17,12,21,'2025-12-15','2025-12-28');
/*!40000 ALTER TABLE `loans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_username_email` (`username`,`email`),
  UNIQUE KEY `unique_email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'Lavinia',NULL,'pertelaviniaioanamaria@gmail.com','0746116771','Oradea'),(3,'pertelaviniaioana',NULL,'ioanamariaa7@gmail.com','0746213792','Alesd'),(4,'stefaniaclaraa',NULL,'nyalavinya1@gmail.com','0752343693','Alesd'),(5,'claradariamartis',NULL,'claradarya123@gmail.com','0745443216','Oradea'),(8,'Stefania  P',NULL,'pertestefania@gmail.com','0752343693','Alesd'),(9,'lavynya',NULL,'perte.laviniaioanamaria@student.uoradea.ro','074616771','Oradea'),(10,'anaanaa123',NULL,'anamaria@gmail.com','0789224765','Oradea'),(11,'nyaalavy7',NULL,'nyalavinya@gmail.com','0736892938','Alesd'),(12,'Nicoleta Marinela Iona',NULL,'nycoletaiona@gmail.com','0752346785','Alesd'),(13,'johndoe',NULL,'johndoe1@gmail.com','0746116771','Alesd'),(16,'johndoe',NULL,'johndoe@gmail.com','0746116771','Oradea'),(29,'jessicamarie',NULL,'jmarie@gmail.com','0746789045','Alesd');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-20  4:46:42
