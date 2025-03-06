# **Postman Documentation for User Authentication API**

## **Base URL:**
```
http://localhost:5000/api
```

---

## **1️⃣ Register User**
**Endpoint:**
```
POST /api/register
```
**Description:** Registers a new user.

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
```json
{
  "username": "JohnDoe",
  "email": "johndoe@example.com",
  "password": "password123",
  "role": "user"
}
```

**Success Response:**
```json
{
  "message": "User registered successfully"
}
```

**Error Responses:**
- `400` Email already exists.
- `400` Missing fields.
- `500` Internal server error.

---

## **2️⃣ Login User**
**Endpoint:**
```
POST /api/login
```
**Description:** Logs in a user and returns a JWT token.

**Headers:**
```
Content-Type: application/json
```

**Request Body (JSON):**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Success Response:**
```json
{
  "message": "Login successful",
  "token": "your-jwt-token"
}
```

**Error Responses:**
- `400` Invalid email or password.
- `500` Server error.

---

## **3️⃣ Protected Route**
**Endpoint:**
```
GET /api/protected
```
**Description:** Requires authentication. Returns user details if token is valid.

**Headers:**
```
Authorization: Bearer your-jwt-token
```

**Success Response:**
```json
{
  "message": "You have accessed a protected route",
  "user": {
    "id": "user_id",
    "role": "user"
  }
}
```

**Error Responses:**
- `401` Access Denied (No token provided).
- `403` Invalid Token.

---

## **4️⃣ Admin-Only Route**
**Endpoint:**
```
GET /api/admin
```
**Description:** Accessible only to users with `admin` role.

**Headers:**
```
Authorization: Bearer your-jwt-token
```

**Success Response:**
```json
{
  "message": "Welcome Admin, this is a secure route"
}
```

**Error Responses:**
- `403` Forbidden (User is not an admin).
- `401` Access Denied (No token provided).
- `403` Invalid Token.

---

## **Notes:**
- Always include the `Authorization` header with the JWT token in protected routes.
- Replace `your-jwt-token` with the actual token received from login.
- Ensure MongoDB is running and `.env` file contains valid credentials before testing.

