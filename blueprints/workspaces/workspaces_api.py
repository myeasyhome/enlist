

from flask import Blueprint, request
from flask_restful import Resource, Api, reqparse
from app import mongo_app


workspaces_api = Blueprint('workspaces_api', __name__, template_folder="templates")


@workspaces_api.route('/create_workspace', methods=['POST'])
def create_workspace():
    if request.method == 'POST':
        return 'Posting'


# Test API to acquire some data
@workspaces_api.route('/get_workspaces', methods=['GET'])
def get_workspaces():
    if request.method == 'GET':
        return 'Getting'
