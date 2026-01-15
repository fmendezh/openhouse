# REST API Documentation

This document describes the REST API endpoints available in the OpenHouse Volunteer Management Platform.

## Authentication

All API endpoints require authentication using NextAuth.js. Include the session cookie in your requests.

## Base URL

```
http://localhost:3000/api
```

## Endpoints

### Users

#### GET /api/users
List all users (Admin only)

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "email": "string",
    "role": "ADMIN | ORGANIZER | VOLUNTEER",
    "createdAt": "datetime",
    "updatedAt": "datetime",
    "volunteer": { ... },
    "eventsCreated": [...]
  }
]
```

#### GET /api/users/:id
Get a specific user

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string",
  "volunteer": { ... },
  "eventsCreated": [...]
}
```

#### PUT /api/users/:id
Update a user (Admin or own profile)

**Request Body:**
```json
{
  "name": "string",
  "role": "ADMIN | ORGANIZER | VOLUNTEER" // Admin only
}
```

#### DELETE /api/users/:id
Delete a user (Admin only)

---

### Volunteers

#### GET /api/volunteers
List all volunteer profiles

**Response:**
```json
[
  {
    "id": "string",
    "userId": "string",
    "phone": "string",
    "address": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "skills": ["string"],
    "interests": ["string"],
    "availability": ["string"],
    "bio": "string",
    "user": { ... },
    "registrations": [...],
    "hours": [...]
  }
]
```

#### POST /api/volunteers
Create a volunteer profile

**Request Body:**
```json
{
  "userId": "string",
  "phone": "string",
  "address": "string",
  "city": "string",
  "state": "string",
  "zipCode": "string",
  "skills": ["string"],
  "interests": ["string"],
  "availability": ["string"],
  "bio": "string",
  "emergencyContact": "string",
  "emergencyPhone": "string"
}
```

#### GET /api/volunteers/:id
Get a specific volunteer profile

#### PUT /api/volunteers/:id
Update a volunteer profile

**Request Body:** Same as POST (all fields optional)

#### DELETE /api/volunteers/:id
Delete a volunteer profile (Admin only)

---

### Events

#### GET /api/events
List all events

**Query Parameters:**
- `status`: Filter by event status (UPCOMING, ONGOING, COMPLETED, CANCELLED)

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "description": "string",
    "location": "string",
    "startDate": "datetime",
    "endDate": "datetime",
    "capacity": "number",
    "status": "UPCOMING | ONGOING | COMPLETED | CANCELLED",
    "organizer": { ... },
    "registrations": [...]
  }
]
```

#### POST /api/events
Create a new event (Admin or Organizer)

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "location": "string",
  "startDate": "datetime",
  "endDate": "datetime",
  "capacity": "number"
}
```

#### GET /api/events/:id
Get a specific event

#### PUT /api/events/:id
Update an event (Organizer or Admin)

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "location": "string",
  "startDate": "datetime",
  "endDate": "datetime",
  "capacity": "number",
  "status": "UPCOMING | ONGOING | COMPLETED | CANCELLED"
}
```

#### DELETE /api/events/:id
Delete an event (Organizer or Admin)

---

### Event Registrations

#### GET /api/registrations
List all event registrations

**Query Parameters:**
- `eventId`: Filter by event ID
- `volunteerId`: Filter by volunteer ID
- `status`: Filter by status (PENDING, CONFIRMED, CANCELLED, COMPLETED)

**Response:**
```json
[
  {
    "id": "string",
    "eventId": "string",
    "volunteerId": "string",
    "status": "PENDING | CONFIRMED | CANCELLED | COMPLETED",
    "checkedIn": "boolean",
    "checkedInAt": "datetime",
    "notes": "string",
    "event": { ... },
    "volunteer": { ... }
  }
]
```

#### POST /api/registrations
Register a volunteer for an event

**Request Body:**
```json
{
  "eventId": "string",
  "volunteerId": "string",
  "notes": "string"
}
```

#### GET /api/registrations/:id
Get a specific registration

#### PUT /api/registrations/:id
Update a registration

**Request Body:**
```json
{
  "status": "PENDING | CONFIRMED | CANCELLED | COMPLETED",
  "checkedIn": "boolean",
  "notes": "string"
}
```

#### DELETE /api/registrations/:id
Cancel a registration

---

### Volunteer Hours

#### GET /api/hours
List volunteer hours

**Query Parameters:**
- `volunteerId`: Filter by volunteer ID
- `verified`: Filter by verification status (true/false)

**Response:**
```json
[
  {
    "id": "string",
    "volunteerId": "string",
    "date": "datetime",
    "hours": "number",
    "description": "string",
    "verified": "boolean",
    "verifiedBy": "string",
    "volunteer": { ... }
  }
]
```

#### POST /api/hours
Log volunteer hours

**Request Body:**
```json
{
  "volunteerId": "string",
  "date": "datetime",
  "hours": "number",
  "description": "string"
}
```

#### GET /api/hours/:id
Get a specific hours entry

#### PUT /api/hours/:id
Update hours entry

**Request Body:**
```json
{
  "date": "datetime",
  "hours": "number",
  "description": "string",
  "verified": "boolean", // Admin/Organizer only
  "verifiedBy": "string"  // Admin/Organizer only
}
```

#### DELETE /api/hours/:id
Delete hours entry

---

### Authentication

#### POST /api/auth/register
Register a new user

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "user": {
    "id": "string",
    "name": "string",
    "email": "string"
  }
}
```

---

## Error Responses

All endpoints return standard error responses:

```json
{
  "error": "Error message"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting in production.

## CORS

CORS is configured through Next.js and allows requests from the same origin by default.
