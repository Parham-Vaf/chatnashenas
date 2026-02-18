CREATE DATABASE IF NOT EXISTS anonymous_messages CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE anonymous_messages;

-- جدول کاربران
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    profile_image VARCHAR(255) NULL,
    reset_token VARCHAR(100) NULL,
    reset_token_expiry DATETIME NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- جدول پیام‌های ناشناس
CREATE TABLE anonymous_messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    to_user_id INT NOT NULL,
    message TEXT NOT NULL,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (to_user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;