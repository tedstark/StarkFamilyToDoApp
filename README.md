# StarkFamToDoApp.NodeJS
## Personal Development Project for the GCU Full Stack Development w/ Java Programming Bootcamp

This project is hosted online [here](https://tws-app01.herokuapp.com/).

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Acknowledgements](#acknowledgements)
- [Application Screenshots](#application-screenshots)

---
## Description
Our personal project was very open-ended giving us full creative control on what to make and/or what to do. Once our [scope](https://docs.google.com/document/d/1CXKu2SBiXJTveR-7KPmo8l-QiKO1IWxiq9o06056mg0/edit?usp=sharing) was approved by the instructor, we had two weeks of class time along with a third week of Spring break in the middle of those two weeks.  

Originally, I had planned to do this project in Java with Spring, however, after most of my first week, spent in development and research, I failed to have significant progress on the project and began learning Node and Express on my own for the login, RESTful API, and other functionality.  I was able to successfully finish almost all Primary and Secondary pieces of functionality of the application in the next two weeks.

This project took place in the third month of the bootcamp after 9 weeks of full-time instruction/learning.  

---
## Technologies Used:
- [**Node.js**](https://nodejs.org/en/)
  - Express
- jQuery
- Pug
- HTML 5
- [Skeleton CSS Framework](http://getskeleton.com/)
  - Custom, responsive navbar
- MongoDB Atlas
- [Heroku](https://www.heroku.com/)
- Atom Editor

---
## Acknowledgements:

- The bootcamp instructional staff at [Grand Canyon University](https://www.gcu.edu/degree-programs/java-programming-certificate)
- [Node.js & Express tutorial series](https://www.youtube.com/playlist?list=PLillGF-RfqbYRpji8t4SxUkMxfowG4Kqp) on YouTube by [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)

---
## Application Screenshots

### **Login Page**
The initial landing page allows a family user to enter their username and password and log into the app.
![login.jpg](/screenshots/login.jpg)

### **Home Page**
The Home page after login will display a snapshot of tasks based on logged in user's role.  Parents see Child tasks.  And Children see their own tasks.
![landingpage.jpg](/screenshots/landingpage.jpg)

### **Navbar Menus**
The Skeleton CSS framework does not have a responsive navbar out of the box. I had to build this from scratch and add it to the application.
![navbar.jpg](/screenshots/navbar.jpg)

### **My Tasks Page**
The 'My Tasks' page lists all tasks, open and closed, assigned to the current logged in user.
![mytasks.jpg](/screenshots/mytasks.jpg)

### **Child Tasks Pages**
A Parent user has the menu option to see each Child's tasks on separate pages.
![seanstasks.jpg](/screenshots/seanstasks.jpg)

### **All Tasks Page**
The 'All Tasks' page lists all tasks, open and closed, for all users. 
![alltasks.jpg](/screenshots/alltasks.jpg)

### **Add a Task**
Allows any user to add a task for themselves, or if a Parent, for a Child.
![addatask.jpg](/screenshots/addatask.jpg)

### **Edit a Task**
Allows any user to edit their own tasks themselves, or if a Parent, edit any task for any user..
![editatask.jpg](/screenshots/editatask.jpg)

### **User List**
Parent users can administer all application users except for my own login.  Any changes for my credentials will need to be done through code.
![userlist.jpg](/screenshots/userlist.jpg)

### **Edit a User Page**
Parent users can edit users through the Edit User page.
![editauser.jpg](/screenshots/editauser.jpg)
