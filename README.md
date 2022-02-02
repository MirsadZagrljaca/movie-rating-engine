## Welcome to Movie Rating Enging

### Mistral's Assignment for Technical Interview

### Description and info

Web app designed for displaying and rating movies. It has theese features:

- Search Engine -- that works with movie textual info, as well as next keywords:
- - stars, example 5 stars returns all movies with 5 stars
- - at least, example at least 3 stars returns all movies with at least 3 stars
- - before, example before 2015 returns all movies made before 2015
- - after, example after 1997 returns all movies made after 1997
- - older than, older than 5 returns all movies that are older then 5 years
- Login and create account -- even tho this was optional step I've implemented it, it serves not much features but still you are able to login and get your token
- Header with 2 dropdown menus -- one on the left is for browsing through site, with Top movies and All movies, second one on the right with user Login and Create Account for non logged in users and for logged in user Logout
- Top Movies are sorted based on default and with view more button you can add more to the screen (unfortunatly due to time limit I didn't have time to implement slow loading, and load 10 at the time, so I keep all results in state and with this button user is presented with more)
- Rating movies -- On All movies tab, you can see all movies and rate one at the time, once pressed on Rate Movie user is presented with Modal to choose how many starts he wants to give to his user, after selecting stars and pressing Rate once again movie is rated and rating will update on page
- Backend Routes are protected and can only be used from application itself, I get before every request for movies, I keep default user in property.js I know it's not best practice and that I should keep it in .env but it's for your convenience so that you don't have add .env file
- Also in config.js on backend I've added my atlas url, still I know its not best practice but its just so I have db ready
- Enjoy!

### Technologies

MERN stack app (MongoDB, Express, React and NodeJS with Mongoose)

### To run it you should

- git clone https://github.com/MirsadZagrljaca/movie-rating-engine
- cd client && npm install && npm start and open browser at localhost:3000
- cd server && npm install && npm start

### If you want to use your db you should add .env file in server folder with this variables

That env file should consist of:

- JWT_SECRET
- MONGO_USER
- MONGO_PASS
- PROJECT_NUMBER
- MONGO_CLUSTER

### If you want you can add your account for authorisation on client side by adding your user info in property.js in client server

This file should consist of:

- email
- password

### Hope I covered everything, Enjoy This App!

### Thank you for consideration
