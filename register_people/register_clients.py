class Client:
    def __init__(self, name, age, email):
        self.name = name
        self.email = email
        self.age = age
        self.faces_images = []
        self.available_meet_times = []


print("Hello, welcome to the company!")

name = input("What is your name?: ")
age = input("What is your age?: ")
email = input("What is your email?: ")

first_customer = Client(name, age, email)

