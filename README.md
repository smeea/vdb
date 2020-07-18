# Vtes-Decks

VTES-Decks is card search, deck building and inventory manager for Vampire the Eternal Struggle (VTES) collectible card game. It is successor of vtes-db - https://github.com/smeea/vtes-db.

## Development stack

VTES-Decks consist of two components communicating via API.
Frontent (javascript) render everything for the browser use the following stack:

   ReactJS
   Bootstrap
   Stylus

Backend (python) to perform search in official VTES card database and to store users decks/inventories use the following stack:

   Flask
   SQLite

## Installation

### Local Deployment

Below is local deployment for self-usage/development only!

For Linux:

    git clone https://github.com/smeea/vtes-decks.git
    cd vtes-decks
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    export FLASK_APP=app
    export FLASK_ENV=development
    flask run

For Windows (cmd.exe):

    git clone https://github.com/smeea/vtes-db.git
    cd vtes-db
    python -m venv c:\path\to\vted-db\venv
    venv\Scripts\activate.bat
    pip install -r requirements.txt
    set FLASK_APP=app
    set FLASK_ENV=development
    flask run

### Production Deployment

For production you should at least:
* setup web-server (e.g. `nginx`) and wsgi-server (e.g. `gunicorn`) instead of flask embedded web-server
* change `app.config['SECRET_KEY']`

## LICENSE

MIT
