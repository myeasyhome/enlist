
from app import mongo_app
import re

class Validators:
    @staticmethod
    def valid_workspace_name(w_name, email):
        work_elem = mongo_app.db.workspaces.find_one({"wName": w_name})

        if work_elem == None:
            return True
        else:
            return False

    @staticmethod
    def has_characters(w_name):
        if re.match("^[A-Za-z0-9_-]*$", re.sub(r'\s+', "", w_name)):
            return False
        else:
            return True
