# Rogue Energy Flask App

This Flask application is a small web app for the brand **Rogue Energy**. It serves a main landing page and provides backend APIs for contact submission and future shopping cart/checkout support.

## Project Description

The app is built using Flask and exposes the following functionality:

- `GET /`
  - Renders the homepage using `template/index.html`.
- `POST /submit_contact`
  - Accepts contact form submissions via HTML form or JSON/AJAX.
  - Saves customer messages into a MySQL database table named `messages`.
- `GET /api/cart`
  - Returns the current shopping cart from session storage.
  - Intended for future cart integration.
- `POST /api/cart/add`
  - Adds a product item to the cart.
  - Increments quantity when the same item is added again.
- `POST /api/cart/checkout`
  - Processes checkout data including cart contents and shipping address.
  - Validates required customer and address fields.
  - Saves order details into a MySQL database table named `orders`.

## Data and Persistence

- Uses a MySQL database for persistent storage.
- Reads database connection settings from environment variables:
  - `DB_HOST`
  - `DB_USER`
  - `DB_PASSWORD`
  - `DB_NAME`
- Falls back to local default values if the environment variables are missing.

## Project Structure

- `app.py` — Flask application and route logic
- `template/index.html` — main HTML template
- `static/css/style.css` — styling
- `static/js/script.js` — client-side scripts
- `static/img/` — image assets
- `static/video/` — video assets

## Technologies Used

- **Python**
- **Flask** — web framework
- **mysql-connector-python** — MySQL database driver
- **MySQL** — relational database backend
- **HTML / CSS / JavaScript** — front-end presentation and behavior
- **Static assets** served from `static/`

## Runtime Details

- Default application port: `5000`
- Development mode: `debug=True` in `app.py`
- Template folder: `template`
- Static folder: `static`

## Setup

1. Create and activate a Python virtual environment.
2. Install requirements from `requirements.txt`.
3. Run `python app.py` to start the app.

## Notes

- The app currently stores cart state in session support paths, but the session implementation in `app.py` is incomplete and would need proper Flask session configuration for production.
- The checkout payload saves cart items as a string in the `orders` table.
