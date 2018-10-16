

from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api, reqparse
from app import mongo_app


workspaces_api = Blueprint('workspaces_api', __name__, template_folder="templates")
api = Api(workspaces_api)


class CreateWorkspace(Resource):
    def post(self):
        reg_parser = reqparse.RequestParser()
        help_message = "This field cannot be blank"

        # Add required arguments
        reg_parser.add_argument('f-name', help=help_message, required=True)
        reg_parser.add_argument('l-name', required=False)
        reg_parser.add_argument('email', help=help_message, required=True)
        reg_parser.add_argument('password', help=help_message, required=True)
        reg_parser.add_argument('w-name', help=help_message, required=True)

        call_data = reg_parser.parse_args()

        user_data = {
        'email': call_data['email'],
        'fName': call_data['f-name'],
        'lName': call_data['l-name'],
        'password': call_data['password'],
        'userType': 'member'
        }

        try:

            # Restricions, validation and password hash coming soon

            mongo_app.db.workspaces.insert({
            'wName': call_data['w-name'],
            'projects': [],
            'owner': call_data['email'],
            'users': [user_data]
            })
            return jsonify(status="success")
        except:
             return jsonify(status="error")

api.add_resource(CreateWorkspace, '/create_workspace')
