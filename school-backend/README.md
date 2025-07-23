# School Backend API

## Overview

This project is a backend API for managing a school's digital platform. It provides comprehensive functionality for managing gallery entries, faculty information, testimonials, and user authentication. The API supports file uploads for images and media content across different modules.

## Technologies Used

- Node.js
- Express.js
- Sequelize (for MySQL database)
- JSON Web Tokens (JWT) for authentication
- Nodemailer for email services
- Middleware for rate limiting and request validation
- Express File Upload for handling file uploads
- bcrypt for password hashing

## Project Structure

```
school-backend
├── src
│   ├── config
│   │   └── database.js
│   ├── controllers
│   │   ├── authController.js
│   │   ├── facultyController.js
│   │   ├── galleryController.js
│   │   └── testimonialController.js
│   ├── middleware
│   │   ├── auth.js
│   │   ├── rateLimiter.js
│   │   └── validation.js
│   ├── models
│   │   ├── index.js
│   │   ├── User.js
│   │   ├── Gallery.js
│   │   ├── Faculty.js
│   │   └── Testimonial.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── gallery.js
│   │   ├── faculty.js
│   │   └── testimonials.js
│   ├── utils
│   │   ├── jwt.js
│   │   └── emailService.js
│   └── app.js
├── uploads
│   ├── faculty
│   ├── gallery
│   └── testimonials
├── package.json
└── README.md
```

## Setup Instructions

1. **Clone the repository**

   ```
   git clone <repository-url>
   cd school-backend
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory with your database credentials and other configuration:

   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=school_db
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=your_email_host
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   ```

4. **Configure the database**
   Update the database configuration in `src/config/database.js` with your MySQL credentials if not using environment variables.

5. **Run the application**

   ```
   npm start
   ```

   For development with auto-restart:

   ```
   npm run dev
   ```

6. **API Endpoints**

   - **Authentication**

     - `POST /api/auth/register` - Register a new user
     - `POST /api/auth/login` - Log in an existing user
     - `POST /api/auth/logout` - Log out user
     - `POST /api/auth/forgot-password` - Send password reset email
     - `POST /api/auth/reset-password` - Reset user password

   - **Gallery**

     - `POST /api/gallery` - Create a new gallery entry (with file upload)
     - `GET /api/gallery` - Retrieve all gallery entries
     - `GET /api/gallery/:id` - Retrieve a specific gallery entry
     - `PUT /api/gallery/:id` - Update a specific gallery entry
     - `DELETE /api/gallery/:id` - Delete a specific gallery entry

   - **Faculty**

     - `POST /api/faculty` - Create a new faculty member (with file upload)
     - `GET /api/faculty` - Retrieve all faculty members
     - `GET /api/faculty/:id` - Retrieve a specific faculty member
     - `PUT /api/faculty/:id` - Update a specific faculty member
     - `DELETE /api/faculty/:id` - Delete a specific faculty member

   - **Testimonials**
     - `POST /api/testimonials` - Create a new testimonial (with file upload)
     - `GET /api/testimonials` - Retrieve all testimonials
     - `GET /api/testimonials/:id` - Retrieve a specific testimonial
     - `PUT /api/testimonials/:id` - Update a specific testimonial
     - `DELETE /api/testimonials/:id` - Delete a specific testimonial

## Features

- **User Authentication**: JWT-based authentication with registration, login, and password reset
- **File Upload Management**: Support for image and media file uploads with organized storage
- **Rate Limiting**: Built-in request rate limiting for API protection
- **Input Validation**: Comprehensive request validation middleware
- **Email Services**: Integrated email functionality for notifications and password resets
- **Database ORM**: Sequelize ORM for MySQL database operations
- **CORS Support**: Cross-origin resource sharing enabled
- **Static File Serving**: Direct access to uploaded files via URL

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
