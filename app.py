

# Project 01 -- Devoid Labs
from flask import Flask 

from blueprints.workspaces.workspaces_api import workspaces_api


app = Flask(__name__)
app.config['SERVER_NAME'] = "localdev:5000"

# BLueprints

app.register_blueprint(workspaces_api)


@app.route('/')
def homepage():
    return 'Hello'


@app.route('/', subdomain="<workspace>")
def workspace_homepage(workspace):
    return "On workspace: %s" % workspace

if __name__ == '__main__':
    app.run(debug=True)

