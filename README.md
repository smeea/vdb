# VDB

VDB is card search, deck building & inventory management tool for Vampire the Eternal Struggle (VTES) collectible card game.
It is a successor of vtes-db - https://github.com/smeea/vtes-db.

## Components

VDB consist of two components communicating with each other.

### Frontend
Uses the following stack to serve UI:
```
   ReactJS - framework
   Bootstrap - components
   Stylus - CSS
```

### Backend
Performs search in official VTES card database and stores account/decks/inventory with:

```
   Flask - framework
   SQLite - database
```

## Installation

### Local Deployment (on Linux)

Below is local deployment for self-usage/development only!

```
    git clone https://github.com/smeea/vdb.git
    cd vdb
```

Start backend:
```
    cd flask-backend
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    export FLASK_APP=api
    export FLASK_ENV=development
    flask run
```

Start frontend:
```
    cd react-backend
    npm install
    parcel serve index.html
```

### Production Deployment

For production you should at least:
* setup web-server (we use `nginx`) instead of `parcel` embedded web-server
* setup wsgi-server (we use `gunicorn`) instead of `flask` embedded web-server
* build frontend for production (see your prefered bundler documentation, for `parcel` use `parcel build index.html`)
* change `app.config['SECRET_KEY']` in `config.py`

## LICENSE

MIT
