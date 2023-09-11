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