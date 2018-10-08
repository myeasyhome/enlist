

# Project 01: Enlist -- Devoid Labs

# Main imports
from flask import Flask 
from flask_pymongo import PyMongo
import private


# Configuration and setup

app = Flask(__name__)
app.config['SERVER_NAME'] = "localdev:5000"
app.config['MONGO_URI'] = private.MONGO_URL

mongo_app = PyMongo(app)


# Blueprints
from blueprints.workspaces.workspaces_api import workspaces_api
from blueprints.workspaces.routes import workspaces_routes


# BLueprints registration

app.register_blueprint(workspaces_api)
app.register_blueprint(workspaces_routes)


@app.route('/')
def homepage():
    return 'Hello'


@app.route('/', subdomain="<workspace>")
def workspace_homepage(workspace):
    return "On workspace: %s" % workspace

if __name__ == '__main__':
    app.run(debug=True)

