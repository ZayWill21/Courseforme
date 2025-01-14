from app import app, db
from flask import request,  jsonify
from models import Course

#CRUD Operations
#Get all courses
@app.route("/api/courses",methods=["GET"])
def get_Courses():
    try:
        courses = Course.query.all()
        result = [Course.to_json() for Course in courses]
        #[ {...}, {...}, {...}] //This is what I am storing in the results variable
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
#Create a Course
@app.route("/api/courses",methods=["POST"])
def create_Course():
    try:
        #Object to recieve data
        data = request.json
        #Check for required fields
        required_fields = ["course_name","professor","description","pass_fail"]
        for field in required_fields:
            if field not in data:
                return jsonify({"error":f"Missing required field: {field}"}), 501

        course_name = data.get("course_name")
        professor = data.get("professor")
        description = data.get("description")
        pass_fail = data.get("pass_fail")

        #fetch avatar image based on genger
        if pass_fail =="pass":
            img_url = f"http://avatar.iran.liara.run/public/boy?username={course_name}"
        elif pass_fail =="fail":
            img_url = f"http://avatar.iran.liara.run/public/girl?username={course_name}"
        else:
            img_url = None

        #Created a new Course
        new_Course = Course(course_name=course_name, professor=professor, description=description, pass_fail=pass_fail, img_url=img_url)

        #Adding this Course to the database
        db.session.add(new_Course) #This is like staging in git
        db.session.commit() #This is like commit the changed in git to the database

        return jsonify({"msg":"courses created successfully"}), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
        
#Delete a Course
@app.route("/api/courses/<int:id>",  methods=["DELETE"])
def delete_Course(id):
    try:
        Course = Course.query.get(id)
        
        if Course is None:
            return jsonify({"error":"msg no name exists in database"}), 404
        db.session.delete(Course)
        db.session.commit()
        return jsonify({"msg": f"{Course} was deleted successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500
        
#Update courses information
@app.route("/api/courses/<int:id>",  methods=["PATCH"])
def update_Course(id):
    try:
        Course = Course.query.get(id)
        if Course is None:
            return jsonify({"error":"msg no name exists in database"}), 404
        data = request.json #Get data from a HTTP request

        #Changes the data for the object with an ID
        Course.course_name = data.get("course_name", Course.course_name)
        Course.professor = data.get("professor", Course.professor)
        Course.description = data.get("description", Course.description)
        Course.pass_fail = data.get("pass_fail", Course.pass_fail)
        db.session.commit()
        return jsonify({"msg": f"{Course} was updated successfully"}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error":str(e)}), 500