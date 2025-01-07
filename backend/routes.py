from app import app, db
from flask import request,  jsonify
from models import Friend

#CRUD Operations
#Get all Friends
@app.route("/api/friends",methods=["GET"])
def get_friends():
    try:
        friends = Friend.query.all()
        result = [friend.to_json() for friend in friends]
        #[ {...}, {...}, {...}] //This is what I am storing in the results variable
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#Create a Friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    try:
        #Object to recieve data
        data = request.json

        #Check for required fields
        required_fields = ["name","role","description","gender"]

        for field in required_fields:
            if field not in data:
                return jsonify({"error":f"Missing required field: {field}"}), 501

        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        #fetch avatar image based on genger
        if gender =="male":
            img_url = f"http://avatar.iran.liara.run/public/boy?username={name}"
        elif gender =="female":
            img_url = f"http://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        #Created a new friend
        new_friend = Friend(name=name, role=role, description=description, gender=gender, img_url=img_url)

        #Adding this friend to the database
        db.session.add(new_friend) #This is like staging in git
        db.session.commit() #This is like commit the changed in git to the database

        return jsonify({"msg":"Friends created successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
        
#Delete a Friend
@app.route("/api/friends/<int:id>",  methods=["DELETE"])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        
        if friend is None:
            return jsonify({"error":"msg no name exists in database"}), 404
        db.session.delete(friend)
        db.session.commit()
        return jsonify({"msg": f"{friend} was deleted successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
        
#Update friends information
@app.route("/api/friends/<int:id>",  methods=["PATCH"])
def update_friend(id):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error":"msg no name exists in database"}), 404
        data = request.json #Get data from a HTTP request

        #Changes the data for the object with an ID
        friend.name = data.get("name", friend.name)
        friend.role = data.get("role", friend.role)
        friend.description = data.get("description", friend.description)
        friend.gender = data.get("gender", friend.gender)
        db.session.commit()
        return jsonify({"msg": f"{friend} was updated successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500