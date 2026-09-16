# URL Shortener Backend

A simple URL shortener backend built with **Node.js, Express.js, and MongoDB**.

### Features

* Generate unique short URLs
* Redirect to original URLs
* Track visit history
* View URL analytics

### Tech Stack

**Node.js | Express.js | MongoDB | Mongoose**

### Run Locally

```bash
npm install
node index.js
```

Server runs on:

```text
http://localhost:8001
```

### API

```text
POST /url
GET  /:shortId
GET  /url/analytics/:shortId
```

Built as a backend development project to practice **REST APIs, Express.js, MongoDB, and Mongoose**.
