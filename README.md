# lean-gainz-mp
Lean Gainz MP
Lean Gainz MP is a web application that allows users to manage their meals and cart functionalities.

Features
User Authentication: The application integrates with Google OAuth for user authentication.

Meal Management: Users can view available meals, with details such as name, calories, protein, carbs, fat, price, and image.

Cart Functionality: Users can add meals to their cart, edit selected meals, and view their cart. The cart provides functionalities such as adding meal plans, updating selected meals, and clearing the cart.

Database Integration: The application uses MongoDB for data storage and Mongoose for data modeling and database operations.

Setup
Dependencies
Express: Web application framework.
Mongoose: ODM for MongoDB.
Passport: Authentication middleware.
EJS: Embedded JavaScript templating.
Express-Session: Session management.
Dotenv: Environment variable loader.

Directory Structure
controllers/: Contains logic related to cart and meals functionalities.
models/: Contains data models for cart, meals, meal plans, and users.
routes/: Defines routes for cart, meals, and users.
config/: Contains configuration files for the database and authentication.
public/: Contains public assets like images, JavaScript, and stylesheets.
views/: Contains EJS templates for rendering the frontend.

Links
Heroku: https://lean-gainz-meal-prep-ff89a3000376.herokuapp.com/oauth2callback
Github: https://github.com/jmorgainz/lean-gainz-mp

Visuals
![Home page](https://github.com/jmorgainz/lean-gainz-mp/blob/main/Screenshot%202023-09-11%20at%209.01.42%20AM.png)
![Meal page:](https://github.com/jmorgainz/lean-gainz-mp/blob/main/Screenshot%202023-09-11%20at%209.01.06%20AM.png)
![Cart page:](https://github.com/jmorgainz/lean-gainz-mp/blob/main/Screenshot%202023-09-11%20at%209.01.31%20AM.png)

Further implementation
-User will see a message with how many more meals to select
-User will be able to actually checkout in the cart
-User will be able to have a profile with stored information
