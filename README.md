# VDB

VDB is web service for card search, deck building & inventory management for [Vampire the Eternal Struggle (VTES)](https://www.vekn.net/what-is-v-tes) collectible card game.

Public instance is available at https://vdb.im.

## COMPONENTS

VDB consist of two components communicating with each other.

### FRONTEND
Serve the UI for the modern browsers using:
```
   ReactJS (tested with Node.js v16)
   React-Bootstrap
```

### BACKEND
Store user accounts (decks/inventory), generate proxy cards, using:

```
   Python (v3.10+)
   Flask
   SQLite
```

## INSTALLATION

### FOR DEVELOPMENT

Below is local deployment for test/development for Linux.
On Windows and MacOS commands may be different (I recommend using WSL on Windows, it works well with commands below).

```
    git clone https://github.com/smeea/vdb.git
    cd vdb
```

Start backend:
```
    cd backend
    python -m venv venv
    source venv/bin/activate
    python -m pip install -r requirements.txt
    flask db init
    flask db migrate
    flask db upgrade
    flask run
```

Start frontend:
```
    cd backend
    npm install
    npx parcel serve index.html
```

Now go to http://localhost:1234 in the browser and you are ready to go.

### FOR PRODUCTION

For production, in addition to the steps above, you should at least:
* setup web-server instead of `parcel serve` embedded server
* setup wsgi-server instead of `flask run` embedded server
* build frontend for production (see your prefered bundler documentation, for `parcel` use `parcel build --no-cache index.html`)
* change `app.config['SECRET_KEY']` in `backend/config.py`

For reference:
Public instance at https://vdb.im runs from master branch without any changes using `gunicorn` (`gunicorn wsgi:app`) and `nginx` (sample configuration is in `/misc/nginx.conf`).

### UPDATE CARDS, RULINGS, TWD, IMAGES
```
    cd misc/cards-update
    source venv/bin/activate
    ./download_resources.sh          # DOWNLOAD OFFICIAL CARDBASE/RULINGS/TWD FILES
    ./create_resources.sh            # GENERATE VDB FILES FROM DOWNLOADED RESOURCES
    python download_card_images.py   # UPDATE IMAGES (ONLY ENGLISH)
```

## SUPPORT / HELP
If you need support/help don't hesitate to fill Issue or send me an email to smeea@riseup.net.

## CONTRIBUTION
Contributions in both frontend and backend parts are welcome, but please create an issue first to discuss if the feature/fix (and its particular implementation) are confirmed before spending any resources.

There are no coding style or test requirements established.

## LICENSE

MIT for everything, except:
- Card texts, card images and game-related icons in `frontend/assets/images/`, which are copyrighted by Paradox Interactive AB and used under [Dark Pack](https://www.worldofdarkness.com/dark-pack) agreement.
