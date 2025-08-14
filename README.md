# FaBTierList-server

## Overview
This is a Node.js + Express + GraphQL backend for managing a Flesh and Blood Tier List application.
It uses TypeORM for database interaction with MySQL, bcrypt for password hashing, and a modular resolver structure for GraphQL queries and mutations.

## Tech Stack
- Apollo Server
- Graphql
- Express js
- Typescript

## Feature
- GraphQL API with Queries & Mutations
- Hero CRUD operations
- Time Period tracking for stats
- MySQL with TypeORM
- Error handling with custom responses

## Getting Started
### Clone Repo
```bash
git clone https://github.com/BennettSRobinson/FaBTierList-server.git
cd FabTierList-server
```

### Install Dep
```bash
npm install
```

### Configure Env file
```
DATABASE_HOST="serverhost"
DATABASE_USER="serveruser"
DATABASE_PASS="serverpass"
PORT=4000
```

### Run server
```bash
npm run dev
```
