-- Tworzenie bazy danych
CREATE DATABASE IF NOT EXISTS dj_site;
USE dj_site;

-- Tabela użytkowników (administratorów)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Tabela rezerwacji
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  event_date DATETIME NOT NULL,
  event_type ENUM('wesele', 'urodziny', 'osiemnastka', 'event_firmowy', 'inne') NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_deleted BOOLEAN DEFAULT FALSE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Tabela odwiedzin stron
CREATE TABLE IF NOT EXISTS page_views (
  id INT AUTO_INCREMENT PRIMARY KEY,
  page VARCHAR(255) NOT NULL,
  user_agent VARCHAR(255),
  device_type ENUM('mobile', 'desktop', 'tablet') DEFAULT 'desktop',
  referrer VARCHAR(255),
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_polish_ci;

-- Utworzenie domyślnego użytkownika administratora
-- Hasło: admin (należy zmienić po pierwszym logowaniu)
INSERT INTO users (email, password) VALUES ('admin@example.com', '$2b$10$3eGxDLXFbM93b4yBxOOXj.3EmK8XmMTmbcWGoe.j.nvqpMm9fzxES');

-- Indeksy dla wydajniejszych zapytań
CREATE INDEX idx_bookings_event_date ON bookings(event_date);
CREATE INDEX idx_bookings_event_type ON bookings(event_type);
CREATE INDEX idx_bookings_created_at ON bookings(created_at);
CREATE INDEX idx_page_views_page ON page_views(page);
CREATE INDEX idx_page_views_timestamp ON page_views(timestamp); 