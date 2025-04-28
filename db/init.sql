-- データベース作成（なければ作成）
CREATE DATABASE IF NOT EXISTS mydatabase
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;
USE mydatabase;

-- NPOテーブル
CREATE TABLE IF NOT EXISTS NPO (
    NPOId INT AUTO_INCREMENT PRIMARY KEY,
    mailAddress VARCHAR(255) NOT NULL,
    PWD VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- jobSearcherテーブル
CREATE TABLE IF NOT EXISTS jobSearcher (
    jobSearcherId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    sex INT NOT NULL,
    rangeOfBehavior JSON NOT NULL,
    transportation INT NOT NULL,
    isEmployed BOOLEAN NOT NULL,
    wantedBuildId INT NOT NULL,
    assignedBuildId JSON NOT NULL,
    deleteFlag BOOLEAN NOT NULL,
    NPOId INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ownerテーブル
CREATE TABLE IF NOT EXISTS Owner (
    ownerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL,
    payWay INT NOT NULL,
    PWD VARCHAR(255) NOT NULL UNIQUE,
    mailAddress VARCHAR(255) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- buildテーブル
CREATE TABLE IF NOT EXISTS build (
    buildId INT AUTO_INCREMENT PRIMARY KEY,
    ownerId INT NOT NULL,
    location JSON NOT NULL,
    roomSize INT NOT NULL,
    numberOfRooms INT NOT NULL,
    neglectPeriod INT NOT NULL,
    cleaningFrequency INT NOT NULL,
    roomPictureURL VARCHAR(255) NOT NULL,
    deedPictureURL VARCHAR(255) NOT NULL,
    sellIntention BOOLEAN NOT NULL,
    assignedJobSearcherId INT,
    deleteFlag BOOLEAN NOT NULL,
    FOREIGN KEY (ownerId) REFERENCES Owner(ownerId),
    FOREIGN KEY (assignedJobSearcherId) REFERENCES jobSearcher(jobSearcherId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- reportテーブル
CREATE TABLE IF NOT EXISTS report (
    reportId INT AUTO_INCREMENT PRIMARY KEY,
    buildId INT NOT NULL,
    firstReport VARCHAR(255) NOT NULL,
    regularReport JSON NOT NULL,
    FOREIGN KEY (buildId) REFERENCES build(buildId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
