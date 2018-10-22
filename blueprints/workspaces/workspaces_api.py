

from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api, reqparse
from app import mongo_app, bcrypt_app

from .helpers.validators import Validators


workspaces_api = Blueprint('workspaces_api', __name__, template_folder="templates")
api = Api(workspaces_api)


# No hay nada que pueda perder, que no puede ser, que no pueda amar
# QUE PUEDA SOÑAR!

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
        'password': bcrypt_app.generate_password_hash(call_data['password']),
        'userType': 'mod'
        }

        try:
            # Validate if a workspace has already been created with the following w_name and email address
            # Validate w_name length and characters

            if Validators.valid_workspace_name(call_data['w-name'], call_data['email']):
                # Verify if a w_name contains special characters
                if not Validators.has_characters(call_data['w-name']):

                    mongo_app.db.workspaces.insert({
                    'wName': call_data['w-name'],
                    'projects': [],
                    'owner': call_data['email'],
                    'users': [user_data]
                    })
                    return jsonify(status="success", message="Saved to database")
                return jsonify(status="error", message="Special characters are not allowed")
            return jsonify(status="error", message="Workspace already exists")
        except:
             return jsonify(status="error")



api.add_resource(CreateWorkspace, '/create_workspace')
