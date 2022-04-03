# VDB

VDB is web service for card search, deck building & inventory management for [Vampire the Eternal Struggle (VTES)](https://www.vekn.net/what-is-v-tes) collectible card game.

Public instance is available at https://vdb.smeea.casa.

## COMPONENTS

VDB consist of two components communicating with each other.

### FRONTEND
Uses the following stack to serve UI, accessible with any modern browser:
```
   ReactJS - framework
   React-Bootstrap - CSS components
```

### BACKEND
Performs search in official VTES card database and stores account/decks/inventory with:

```
   Flask - framework
   SQLite - database
```

## INSTALLATION

### FOR DEVELOPMENT

Below is local deployment for test/development (see below for production deployment) for Linux.
On Windows and MacOS commands may be different.

```
    git clone https://github.com/smeea/vdb.git
    cd vdb
```

Start backend:
```
    cd flask-backend
    python -m venv venv
    source venv/bin/activate
    python -m pip install -r requirements.txt
    export FLASK_APP=api
    export FLASK_ENV=development
    flask db init
    flask db migrate
    flask db upgrade
    flask run
```

Start frontend:
```
    cd react-backend
    npm install
    npx parcel serve index.html
```

Now go to http://localhost:1234 in the browser and you are ready to go.

### FOR PRODUCTION

For production, in addition to the steps above, you should at least:
* setup web-server (we use `nginx`) instead of `parcel` embedded server
* setup wsgi-server (we use `gunicorn`) instead of `flask` embedded server
* build frontend for production (see your prefered bundler documentation, for `parcel` use `parcel build index.html`)
* change `app.config['SECRET_KEY']` in `config.py`

For reference:
Public instance at https://vdb.smeea.casa runs from master branch without any changes (except database, which is excluded from this repo) using `gunicorn` and `nginx`.

### UPDATE CARDS, TWD
```
    cd misc/cards-update
    ./download_resources.sh
    ./update_resources.sh
```

## SUPPORT / HELP
If you need support/help don't hesitate to fill Issue or send me an email to smeea@riseup.net.

## CONTRIBUTION
Contributions in both frontend and backend parts are welcome, but please create an issue first to discuss if the feature/fix (and it's particular implementation) can be merged at all before spending any resources.

There are no coding style requirements established.
(Unfortunately) tests coverage for the project is 0%, so no tests required.

## LICENSE

MIT for everything, except:
- Card images and game-related icons at `react-frontend/assets/images/` and card texts which are copyrighted by Paradox Interactive AB and used under [Dark Pack](https://www.worldofdarkness.com/dark-pack) agreement.
