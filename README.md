# VDB

VDB is web service for card search, deck building & inventory management for [Vampire the Eternal Struggle (VTES)](https://www.vekn.net/what-is-v-tes) collectible card game.

Public instance is available at https://vdb.im.

## COMPONENTS

VDB consist of two components communicating with each other.

### FRONTEND
Serve the UI for the modern browsers using:
```
   ReactJS (v18)
   Tailwind CSS
```

### BACKEND
Store user accounts (decks/inventory), generate proxy cards, using:

```
   Python (v3.10+)
   Flask
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
    python -m venv venv                                  # ONLY ON FIRST RUN
    source venv/bin/activate
    python -m pip install -r requirements.txt            # ONLY ON FIRST RUN
    flask db init                                        # ONLY ON FIRST RUN
    flask db migrate                                     # ONLY ON FIRST RUN
    flask db upgrade                                     # ONLY ON FIRST RUN
    flask run
```

Start frontend:
```
    cd backend
    npm install                                          # ONLY ON FIRST RUN
    npm run start
```

Now go to http://localhost:5173 in the browser and you are ready to go.

### FOR PRODUCTION

For production, in addition to the steps above, you should at least:
* setup web-server instead of `npm run start` (`vite`) embedded server
* setup wsgi-server instead of `flask run` embedded server
* build frontend for production (`npm run build`)
* change `app.config['SECRET_KEY']` in `backend/config.py`

For reference:
Public instance at https://vdb.im runs from master branch without any changes using `gunicorn` (`gunicorn wsgi:app`) and `nginx` (sample configuration is in `misc/nginx.conf`).


## MAINTENANCE

### UPDATE CARDS, RULINGS, TWD, IMAGES

To update with new Set/Precons edit the following files:
```
    vim misc/cards-update/generate_precons.py            # ADD SET/PRECONS
    vim frontend/src/assets/data/setsAndPrecons.json     # ADD SET/PRECONS
```

To update with new Playtest edit the following files:
```
    vim misc/cards-update/generate_precons.py            # EDIT PLAYTEST PRECONS
    vim misc/cards-update/generate_playtest_precons.py   # EDIT PLAYTEST FILES
```

Download source files from upstream and create new resources (it will copy files where necessary):
```
    cd misc/cards-update
    python -m venv venv                                  # ONLY ON FIRST RUN
    source venv/bin/activate
    python -m pip install -r requirements.txt            # ONLY ON FIRST RUN
    ./download_resources.sh
    ./create_resources.sh
    python download_card_images.py                       # ONLY ENGLISH
```
Other than English languages and card scans from different sets only updated manually in `~/frontend/dist/images/cards/`.

### PASSWORD CHANGE
```
    cd backend
    source venv/bin/activate
    python change_password $ACCOUNT_NAME x               # RANDOM PASWORD
    python change_password $ACCOUNT_NAME $PASSWORD       # PASSWORD OF YOUR CHOICE
```

### PLAYTESTING ACCESS
Playtesting of new cards enabled by Playtest Admins from web interface.
To toggle Admin status for account:
```
    cd backend
    source venv/bin/activate
    python change_playtest_admin.py $ACCOUNT_NAME
```

## SUPPORT / HELP
If you need support/help don't hesitate to fill Issue or send me an email to smeea@riseup.net.

## CONTRIBUTION
Contributions in both frontend and backend parts are welcome, but please create an issue first to discuss if the feature/fix (and its particular implementation) are confirmed before spending any resources.

There are no coding style or test requirements established.

## LICENSE

MIT for everything, except:
- Card texts, card images and game-related icons in `frontend/assets/images/`, which are copyrighted by Paradox Interactive AB and used under [Dark Pack](https://www.worldofdarkness.com/dark-pack) agreement.
