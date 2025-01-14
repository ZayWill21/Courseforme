from app import db

class Course(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    course_name = db.Column(db.String(100), nullable=False)
    professor = db.Column(db.String(50), nullable=False)
    description = db.Column(db.Text, nullable=False)
    pass_fail = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(200), nullable=False)

    def to_json(self):
        return {
            "id":self.id,
            "course_name":self.course_name,
            "professor":self.professor,
            "description":self.description,
            "pass_fail":self.pass_fail,
            "imgUrl":self.img_url,
        }

