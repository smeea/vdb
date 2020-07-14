# vtes-db

Vampire the Eternal Struggle (VTES) web card database.

## Installation

### Requirements

Global:
* Python 3.7+

Virtual Environement:
* See ./requirements.txt

### Local Deployment

Below is local deployment for self-usage/development only!

For Linux:

    git clone https://github.com/smeea/vtes-db.git
    cd vtes-db
    python -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    export FLASK_APP=app
    export FLASK_ENV=development
    flask run
    // Or if you want to have access from local network e.g. by wifi at http://HOST_IP:port
    // flask run --host 0.0.0.0
    open http://127.0.0.1:5000/crypt

For Windows (cmd.exe):

    git clone https://github.com/smeea/vtes-db.git
    cd vtes-db
    python -m venv c:\path\to\vted-db\venv
    venv\Scripts\activate.bat
    pip install -r requirements.txt
    set FLASK_APP=app
    set FLASK_ENV=development
    flask run
    // Or if you want to have access from local network e.g. by wifi at http://HOST_IP:port
    // flask run --host 0.0.0.0
    open http://127.0.0.1:5000/crypt

### Production Deployment

For production you should at least:
* setup web-server (e.g. `nginx`) and wsgi-server (e.g. `gunicorn`) instead of flask embedded web-server
* change `app.config['SECRET_KEY']`
