#Need to update for deployment

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

#Need to pass this 
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) #Allows the server to receive request and send data to client

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///courses.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["DEBUG"] = True  # Enable debugging
db = SQLAlchemy(app)

import routes

#This is for opumization "With app.app_context"
with app.app_context():
    db.create_all() #This will create all the tables needed in our code

#This helps so when I import this file to another app it doesnt run twice/
if __name__ == "__main__":
    app.run(debug=True)