import os

class Key():
    def __init__(self):
        self.AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY', 'ACCESS_KEY')
        self.AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY', 'SECRET_KEY')
    
    def get_access_key(self):
        return self.AWS_ACCESS_KEY

    def get_secret_key(self):
        return self.AWS_SECRET_KEY
