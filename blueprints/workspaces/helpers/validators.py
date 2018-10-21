
from app import mongo_app

class Validators:
    @staticmethod
    def valid_workspace(w_name, email):
        work_elem = mongo_app.db.workspaces.find_one({"wName": w_name})

        print(work_elem)

        if work_elem == None:
            return True
        else:
            return False
