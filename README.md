# AskNutritionist

A containerized Next.js app built with TypeScript, TailwindCSS, and Docker.

## Features

- **TypeScript & ESLint:** Robust setup for type safety and code quality.
- **TailwindCSS:** Custom theme with responsive UI components.
- **Docker & Docker Compose:** Easily run the app in a containerized environment.
- **Pages:** Home, About, Contact, and Chat (integrated for AI interactions).
- **Fully Responsive Design:** Optimized for desktop and mobile.
- **Modern UI Implementation:** Complete overhaul of the user interface (currently on the "#2-Arslan" branch).

## How to Run This Project Locally

### 1. Prerequisites

Ensure you have the following installed:
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- [Node.js](https://nodejs.org/) (if you prefer running without Docker)

### 2. Clone the Repository and Switch to the UI Branch

Since the latest UI changes are in the `#2-Arslan` branch (and have not yet been merged into the default branch), do the following:

git clone https://github.com/SashaLontsi/AskNutritionist.git
cd AskNutritionist
git checkout "#2-Arslan"

## 3. Start the project with Docker
docker compose up

This will build the Docker image (if not already built) and start the Next.js app inside the container.

## 4. Open in your browser

[Go to http://localhost:3000](http://localhost:3000)

This opens the app in your default browser.

## 5. Running with npm (Alternative)
If you prefer running the app locally without Docker, you can use npm.

Install Dependencies
Make sure to install the dependencies first:

npm install
Start the Development Server
Run the development server with:

npm run dev
Then, open your browser and navigate to:

http://localhost:3000

