

from flask import Blueprint, request

workspaces_api = Blueprint('workspaces', __name__, template_folder="templates")


@workspaces_api.route('/create_workspace', methods=['POST'])
def create_workspace():
    if request.method == 'POST':
        return 'Posting'


# Test API to acquire some data
@workspaces_api.route('/get_workspaces', methods=['GET'])
def get_workspaces():
    if request.method == 'GET':
        return 'Getting'
