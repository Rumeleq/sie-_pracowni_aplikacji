from dataclasses import dataclass

@dataclass
class Student:
    student_id: int
    first_name: str
    last_name: str
    age: int
    courses: list[str]

    def __repr__(self):
        return f"{self.first_name} {self.last_name} ({self.age} lat): {', '.join(self.courses)}"

    def create_student_txt(self):
        with open(f"{self.first_name}_{self.last_name}.txt", "w", encoding="utf-8") as f:
            f.write("Kursy:\n")
            f.write("\n".join(f"- {course}" for course in self.courses))

@dataclass
class Course:
    student_id: int
    course_name: str

def main():
    student_course_pairs: list[Course] = []
    with open("courses.txt", "r", encoding="utf-8") as f:
        for line in f.readlines():
            student_id, course_name = line.strip().split(",")
            student_course_pairs.append(Course(int(student_id), course_name))

    students_list: list[Student] = []
    with open("students.txt", "r", encoding="utf-8") as f:
        for line in f.readlines():
            student_id, first_name, last_name, age = line.strip().split(",")
            courses_list = []
            for student_course_pair in student_course_pairs:
                if student_course_pair.student_id == int(student_id):
                    courses_list.append(student_course_pair.course_name)
            students_list.append(Student(int(student_id), first_name, last_name, int(age), courses_list))

    for student in students_list:
        student.create_student_txt()
        print(student)

if __name__ == "__main__":
    main()