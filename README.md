# ArtiFact Project

Welcome to the ArtiFact Project repository. This project provides a robust implementation of a picture search system that integrates a Spring Boot backend and an Angular frontend. The solution fetches data from the Art Institute of Chicago's API to search for artwork based on user queries.

## Table of Contents

- Project Overview
- Features
- Technologies Used
- Project Structure
- Setup and Installation
- Running the Application
- CI/CD Documentation
- Docker Setup
- Contributing
- License

## Project Overview

The ArtiFact Project is a web application that allows users to search for artwork using the Art Institute of Chicago's API. It showcases a full-stack solution with:

- A Spring Boot backend handling API requests and processing data.
- An Angular frontend for a user-friendly interface.
- CI/CD Documentation for ArtiFact Project.

## Features

- RESTful API endpoint for querying artworks.
- Interactive frontend to display search results.
- Data processing to filter and present useful artwork details.
- Fully containerized solution using Docker.
- CI/CD pipeline to automate testing, building, and deployment.

## Technologies Used

- Spring Boot
- Angular
- Docker and Docker Compose
- Jenkins for CI/CD
- MySQL for data storage
- Maven for dependency management

## Project Structure

ArtiFact-project/
├── backend/                # Spring Boot application
├── frontend/               # Angular application
├── docker-compose.yml      # Docker Compose configuration
├── Dockerfile              # Docker configuration for backend
├── Jenkinsfile             # CI/CD pipeline configuration
├── README.md               # Project documentation
└── ci_cd_documentation.docx # Detailed CI/CD documentation

## Setup and Installation

### Prerequisites

- Docker and Docker Compose installed
- Maven installed
- Node.js and Angular CLI installed

### Backend Setup

1. Navigate to the `backend/` directory.
2. Run `mvn clean install` to build the backend.

### Frontend Setup

1. Navigate to the `frontend/` directory.
2. Run `npm install` to install dependencies.

## Running the Application

### Using Docker Compose

1. Run `docker-compose up` to build and start both the backend and frontend services.
2. Access the application at `http://localhost:9090`.

## CI/CD Documentation

In this section, the process for setting up CI/CD for the ArtiFact Project is outlined. Note that **CI/CD has not been implemented**, but the following provides guidance for its setup:

### CI Pipeline Overview

- **Repository Cloning**: The CI pipeline will be triggered when changes are pushed to the repository.
- **Backend Build**: Maven will be used to build and test the Spring Boot backend.
- **Automated Tests**: The pipeline will run unit and integration tests to ensure the backend works as expected.
- **Docker Build**: The backend and frontend applications will be containerized using Docker, and the Docker containers will be built and deployed.

### CD Pipeline Overview

- **Docker Containers**:
  - A MySQL container for database management.
  - A Spring Boot container for the backend.
  - A frontend container for the Angular application.
- **Deployment**: The CI/CD pipeline should deploy the containers in a predefined environment (e.g., staging or production).
- **Automated Deployment**: Upon successful build and test execution, the application will be deployed to a server or cloud environment.

For a more detailed guide on how to set up the CI/CD pipeline, refer to the `ci_cd_documentation.docx` file in the repository.

## Docker Setup

The application uses Docker for containerization:

- **Dockerfile**: Defines the backend image.
- **docker-compose.yml**: Configures services for backend, frontend, and database.

### Docker Commands

- Build the Docker image: `docker build -t ArtiFact .`
- Start the containers: `docker-compose up`

## Contributing

Contributions are welcome! Please fork the repository and create a pull request.

## License

This project is licensed.
