# CRM

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Additional Commands](#additional-commands)
- [License](#license)

## Getting Started

To get started with this project, follow the detailed steps provided in each section below.

## Prerequisites

Before you begin, ensure that you have the following software installed on your machine:

1. **Docker Compose**:
   - Docker Compose is typically included with Docker Desktop. To confirm that Docker Compose is installed, run the following command in your terminal:
   
     ```bash
     docker-compose --version
     ```

## Installation

Follow these steps to set up the projects on your local machine:

1. **Clone the Repository**:

 - Start by cloning the project repository to your local machine:

```bash
git clone https://github.com/hamza3abbas/auth.git
```
```bash
cd auth
```
2. **Install Node.js Dependencies**

```bash
npm install
```

**Important:**Before You Complete Make Sure You Create .env File Simillar To env.text 

3. **Set Up Docker**
```bash
docker-compose up -d
```
⚠️ **_Important:_**BeforeYou Continue Make Sure You Replace Your DATABASE_URL In .env

4. **Prisma**
```bash
npx prisma migrate dev
```
```bash
npx prisma generate
```

## Development 
```bash
npm run build
```
```bash
npm run dev
```

## Additional Commands
1. **To View Database Localy**
  - Open New Terminal And Run:
```bash
npx prisma studio
```
## License

This project is licensed under the ABS SOLUTION COMPANY License .

© [2024] ABS SOLUTION COMPANY. All rights reserved.