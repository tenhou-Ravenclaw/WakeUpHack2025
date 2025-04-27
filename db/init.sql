CREATE DATABASE IF NOT EXISTS mydatabase;
USE mydatabase;

CREATE TABLE NPO (
    NPOId INT AUTO_INCREMENT PRIMARY KEY,
    mailAddress VARCHAR(255) NOT NULL,
    PWD VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE jobSercher (
    jobSercherId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL UNIQUE,
    sex INT NOT NULL,
    rangeOfBehivior INT[4] NOT NULL,
    transportation INT NOT NULL,
    isEmployed BOOLEAN NOT NULL,
    wantedBuildId INT NOT NULL,
    assignedBuildId INT[] NOT NULL,
    deleteFlag BOOLEAN NOT NULL,
    NPOId INT NOT NULL
);

CREATE TABLE Owner (
    ownerId INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birthday DATE NOT NULL UNIQUE,
    payWay INT NOT NULL, /* ここは要検討 */
    PWD VARCHAR(255) NOT NULL UNIQUE,
    mailAddress VARCHAR(255) NOT NULL
);

CREATE TABLE build (
    buildId INT AUTO_INCREMENT PRIMARY KEY,
    ownerId INT NOT NULL,
    location INT[2] NOT NULL,
    roomSize INT NOT NULL,
    numberOfRooms INT NOT NULL,
    neglectPeriod INT NOT NULL,
    cleaningFrequency INT NOT NULL,
    roomPictureURL VARCHAR(255) NOT NULL,
    deedPictureURL VARCHAR(255) NOT NULL,
    sellIntention BOOLEAN NOT NULL,
    assignedJobSearcherId INT NOT NULL,
    deleteFlag BOOLEAN NOT NULL
);

CREATE TABLE report (
    buildId INT AUTO_INCREMENT PRIMARY KEY,
    reportId INT AUTO_INCREMENT NOT NULL,
    firstReport VARCHAR(255) NOT NULL UNIQUE,
    regularReport VARCHAR(255)[] NOT NULL UNIQUE
);
