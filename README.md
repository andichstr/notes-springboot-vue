Frontend:
Vue 2
Vuex
Vue router
Bootstrap vue
It starts running at http://localhost:8081/notes
I reserved http://localhost:8081/ for login, and when you're logged in, it redirects to notes
------------------------------------------

Backend:
Java 17
Spring boot 2.7.5 with this dependencies:
#Spring web
#Spring data JPA
#Lombok
#MySQL Driver

It starts running at http://localhost:8080, and has endpoints at /notes and /categories

------------------------------------------
Database:
MariaDB 10.4.24
user: root
password:

Database configuration is located in ./backend/src/main/resources/aplication.properties
Hibernate creates the database and tables if don't exist when you run the application.