# Project (Team G56)

Hospital Management System (NODE Express Mongoose)

## Modules :electric_plug:
- Config (Stores configration for MongoDB and JWT)
- Middleware (Verifies data recived that will be stored and also genrates JWT)
- Controllers (User and Authentication controllers)
- Models (Stores schema of each collection)
- Routes (Defines routes and functionality of different APIs)

## List of APIs :page_with_curl:
- APIs are used by [React part of HMS](https://github.com/Yash227/hms-react)

### Authetication :dvd:

NAME             | Method | Use
---------------- | ------ | ------------------------------------------------------------
/api/auth/signup | POST   | SignUp ( Verifies and saves credentials + data of user )
/api/auth/signin | POST   | SignIn ( Verifies credentials and redirets user to dashboard )

### DATA fetch and save :floppy_disk:

NAME                  | Method | Use
--------------------- | ------ | ------------------------------------------------------------
/api/test/patient     | GET    | Verifies if a user has access to patient dashboard or not
/api/test/staff       | GET    | Verifies if a user has access to staff dashboard or not
/api/test/patientdata | GET    | Returns patient prescriptions ( for dashboard )
/api/test/appointment | POST   | Saves data recived via Chatbot for appointment



## Libraries Used :clipboard:
NAME            | USE
--------------- | --------------------------------
axios           | to fetch data from given APIs
bcryptjs        | for encrypting passwords
jsonwebtoken    | to eliminate login process from same system
mongoose        | to interact with MongoDB
express         | for server-side logic
cors            | to enable CORS

