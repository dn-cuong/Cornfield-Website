

---

# Cornfield Website

## Introduction

Cornfield Website is an educational platform designed to encourage learning through engaging podcasts and a unique token-based incentive system. This project aims to provide users with a dynamic and interactive learning experience, fostering continuous education and personal growth.

## Demo


https://github.com/user-attachments/assets/32575b98-070a-47af-a084-8540cdb277fc


## Features

- **Interactive Podcasts**: Access a wide range of educational podcasts on various topics.
- **Token-Based Incentive System**: Earn tokens by completing learning modules and quizzes, which can be redeemed for rewards.
- **User Profiles**: Personalized profiles to track progress and achievements.
- **Responsive Design**: Optimized for seamless use on desktops, tablets, and mobile devices.
- **Admin Dashboard**: Manage content, users, and rewards efficiently.

## Technologies Used

- **Frontend**: React, HTML5, CSS3, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Heroku

## Installation

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/dn-cuong/Cornfield-Website.git
   ```
2. Navigate into the project directory:
   ```bash
   cd Cornfield-Website
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:
   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=5000
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```
5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

After setting up the project, you can explore the various features by navigating through the website. Use the admin dashboard to manage content and monitor user activities. The token-based incentive system will enhance user engagement and motivation.

## Project Structure

```
Cornfield-Website/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── ...
├── package.json
├── .env
└── README.md
```

- **`client/src/components/`**: Contains React components for the frontend.
- **`server/`**: Contains backend configurations, controllers, models, and routes.


## Contact

For questions, feedback, or support, please reach out via email: cuong.nguyendang801@gmail.com
