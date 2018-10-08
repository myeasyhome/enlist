
from flask import Blueprint, render_template

workspaces_routes = Blueprint('workspaces_routes', __name__, template_folder="templates")


@workspaces_routes.route('/create_workspace')
def create_workspace():
    return render_template('create_workspace.html')

"""

@workspaces_routes.route('/get_workspaces')
def get_workspaces():
    return 'Trying to get workspaces'

"""
