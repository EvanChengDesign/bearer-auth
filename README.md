# Bearer Auth Project

Author: Evan Cheng  

Version: 1.0.0

Authentication Server Phase 2: Token (Bearer) Authentication
 
## Project Overview:
The authentication server is now capable of handling basic user account creation and authentication. Users can sign up for new accounts and securely log in using their username and password. Upon successful login (a "good" login), the server verifies the credentials and authenticates the user. Once authenticated, the server generates a JSON Web Token (JWT) as a signed token and returns it to the application. This token provides proof of authentication and can be used for subsequent requests, ensuring secure access to the application's protected resources.

## Design Philosophy:

1. **Security and Reliability:** Implementing best practices, such as JWT (JSON Web Token) for secure, stateless session management, ensures user authentication is reliable and tamper-proof. Passwords are handled securely, and sensitive operations are protected to maintain user data integrity.

2. **Modular and Scalable Architecture:** The logic is separated into well-defined modules that handle specific functions like user registration, authentication, and token generation. This modular approach allows for scalability, making it easier to adapt or extend the system to meet future requirements.

3. **User-Centric Experience:** The authentication flow is designed to offer a seamless and intuitive user experience. Account creation and login processes are straightforward, reducing friction and ensuring that authenticated users can access protected resources efficiently.

## Server Initialization:

The server is initialized in src/server.js, which sets up middleware, routes, and starts the Express application.

## Middleware Modules:

Middleware modules are utilized to handle JSON payloads, logging, and Sequelize session transactions. They are initialized in `src/server.js` and configured to ensure smooth operation between requests and database interactions.

## Error Handling Modules"

Error handling is critical for gracefully managing and logging issues that arise during API operations. Our implementation includes:

- `404.js`: Handles not found errors when a route is undefined.
- `500.js`: Manages internal server errors and unexpected conditions.

These are located under `src/middleware`.

## UML 
![image](./images/bearerAuthUML.png)

## Deployment

The server is deployed to the cloud. The live API can be accessed at:

[Render URL](postgres://evancheng:oW0au80BHy8ZUsos3GrBQahMJdP4fdfB@dpg-copasr4f7o1s73c8ukk0-a.oregon-postgres.render.com/api_server_db_ek8r)

(postgres://evancheng:oW0au80BHy8ZUsos3GrBQahMJdP4fdfB@dpg-copasr4f7o1s73c8ukk0-a.oregon-postgres.render.com/api_server_db_ek8r)