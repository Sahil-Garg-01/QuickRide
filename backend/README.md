# UBER Backend

## Overview

This is the backend service for the UBER application. It provides APIs for user registration, authentication, and other functionalities.

The server will run on `http://localhost:3030`.

## API Documentation

### User Registration

#### Endpoint

`POST /users/register`

#### Description

Registers a new user.

#### Input

The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the user (minimum 3 characters).
  - `lastname` (string, optional): The last name of the user (minimum 3 characters).
- `email` (string, required): The email address of the user (must be a valid email).
- `password` (string, required): The password for the user account (minimum 6 characters).

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **Success (201)**: Returns a JSON object containing the authentication token and user details.
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error (400)**: Returns a JSON object containing the validation errors or a message indicating the user already exists.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "User already exist"
  }
  ```

### User Login

#### Endpoint

`POST /users/login`

#### Description

Logs in an existing user.

#### Input
The request body should be a JSON object with the following fields:

- `email` (string, required): The email address of the user (must be a valid email).
- `password` (string, required): The password for the user account (minimum 6 characters).

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

#### Response

- **Success (200)**: Returns a JSON object containing the authentication token and user details.
  ```json
  {
    "token": "jwt_token",
    "user": {
      "_id": "user_id",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  }
  ```

- **Error (400)**: Returns a JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
  - **Error (401)**: Returns a JSON object containing a message indicating invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Get User Profile

#### Endpoint

`GET /users/profile`

#### Description

Fetches the profile of the authenticated user.

#### Response

- **Success (200)**: Returns a JSON object containing the user details.
  ```json
  {
    "_id": "user_id",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
  ```

- **Error (401)**: Returns a JSON object containing a message indicating the user is not authenticated.
  ```json
  {
    "message": "Not authenticated"
  }
  ```

### User Logout

#### Endpoint

`POST /users/logout`

#### Description

Logs out the authenticated user.

#### Response

- **Success (200)**: Returns a JSON object containing a message indicating the user has been logged out.
  ```json
  {
    "message": "User logged out successfully"
  }
  ```

- **Error (401)**: Returns a JSON object containing a message indicating the user is not authenticated.
  ```json
  {
    "message": "Not authenticated"
  }
  ```

### Captain Registration

#### Endpoint

`POST /captains/register`

#### Description

Registers a new captain.

#### Input

The request body should be a JSON object with the following fields:

- `fullname`: An object containing:
  - `firstname` (string, required): The first name of the captain (minimum 3 characters).
  - `lastname` (string, optional): The last name of the captain (minimum 3 characters).
- `email` (string, required): The email address of the captain (must be a valid email).
- `password` (string, required): The password for the captain account (minimum 6 characters).
- `vehicle`: An object containing:
  - `color` (string, required): The color of the vehicle (minimum 3 characters).
  - `plate` (string, required): The plate number of the vehicle (minimum 3 characters).
  - `capacity` (number, required): The capacity of the vehicle (minimum 1).
  - `vehicleType` (string, required): The type of the vehicle (must be one of 'car', 'motorcycle', 'auto').

Example:
```json
{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "jane.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Response

- **Success (201)**: Returns a JSON object containing the authentication token and captain details.
  ```json
  {
    "token": "jwt_token",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (400)**: Returns a JSON object containing the validation errors or a message indicating the captain already exists.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "First name must be at least 3 characters long",
        "param": "fullname.firstname",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      },
      {
        "msg": "Color must be at least 3 characters long",
        "param": "vehicle.color",
        "location": "body"
      },
      {
        "msg": "Plate must be at least 3 characters long",
        "param": "vehicle.plate",
        "location": "body"
      },
      {
        "msg": "Capacity must be at least 1",
        "param": "vehicle.capacity",
        "location": "body"
      },
      {
        "msg": "Invalid vehicle type",
        "param": "vehicle.vehicleType",
        "location": "body"
      }
    ]
  }
  ```
  or
  ```json
  {
    "message": "Captain already exist"
  }
  ```

### Captain Login

#### Endpoint

`POST /captains/login`

#### Description

Logs in an existing captain.

#### Input
The request body should be a JSON object with the following fields:

- `email` (string, required): The email address of the captain (must be a valid email).
- `password` (string, required): The password for the captain account (minimum 6 characters).

Example:
```json
{
  "email": "jane.doe@example.com",
  "password": "password123"
}
```

#### Response

- **Success (200)**: Returns a JSON object containing the authentication token and captain details.
  ```json
  {
    "token": "jwt_token",
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (400)**: Returns a JSON object containing the validation errors.
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      },
      {
        "msg": "Password must be at least 6 characters long",
        "param": "password",
        "location": "body"
      }
    ]
  }
  ```
  - **Error (401)**: Returns a JSON object containing a message indicating invalid email or password.
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Get Captain Profile

#### Endpoint

`GET /captains/profile`

#### Description

Fetches the profile of the authenticated captain.

#### Response

- **Success (200)**: Returns a JSON object containing the captain details.
  ```json
  {
    "captain": {
      "_id": "captain_id",
      "fullname": {
        "firstname": "Jane",
        "lastname": "Doe"
      },
      "email": "jane.doe@example.com",
      "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
      }
    }
  }
  ```

- **Error (401)**: Returns a JSON object containing a message indicating the captain is not authenticated.
  ```json
  {
    "message": "Not authenticated"
  }
  ```

### Captain Logout

#### Endpoint

`POST /captains/logout`

#### Description

Logs out the authenticated captain.

#### Response

- **Success (200)**: Returns a JSON object containing a message indicating the captain has been logged out.
  ```json
  {
    "message": "Captain logged out successfully"
  }
  ```

- **Error (401)**: Returns a JSON object containing a message indicating the captain is not authenticated.
  ```json
  {
    "message": "Not authenticated"
  }
  ```

## Blacklist Token Model

The `blacklist-token-model` is used to store tokens that have been invalidated. This is primarily used for logging out users and ensuring that tokens that have been logged out cannot be used again.

### Usage in Logout

When a user logs out, their token is added to the blacklist. This ensures that even if the token is still valid, it cannot be used to authenticate requests.

### Usage in Authentication

During authentication, the token is checked against the blacklist. If the token is found in the blacklist, the request is denied, ensuring that logged-out tokens cannot be reused.

## License

This project is licensed under the MIT License.