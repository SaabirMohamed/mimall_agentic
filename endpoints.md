# API Endpoints

This document lists all the API endpoints available in the MiMall project.

## Authentication Endpoints

### OAuth Callback
- **URL**: `/auth/callback`
- **Method**: `GET`
- **Description**: Handles OAuth callback from authentication providers (e.g., Google)
- **Parameters**:
  - `code` (query parameter): Authorization code from the OAuth provider
- **Response**: Redirects to `/dashboard` after successful authentication

### Discover Session
- **URL**: `/api/discover_session`
- **Method**: `GET`
- **Description**: Returns the current user's session information and profile data
- **Authentication**: Optional
- **Response Format**:
  - When logged in:
    ```json
    {
      "session_id": "user_uid",
      "email": "user@example.com",
      "auth": {
        "id": "user_uid",
        "email": "user@example.com",
        "phone": "phone_number",
        "created_at": "timestamp",
        "updated_at": "timestamp",
        "last_sign_in_at": "timestamp"
      },
      "user_profile": {
        "id": 1,
        "user_id": "user_uid",
        "first_name": "John",
        "last_name": "Doe",
        "email": "user@example.com",
        "avatar_url": "https://example.com/avatar.jpg",
        "html_content": "",
        "session_id": "session_string",
        "ui_state": {},
        "created_at": "timestamp",
        "updated_at": "timestamp"
      }
    }
    ```
  - When not logged in:
    ```json
    {
      "session_id": "default_session_id",
      "email": null,
      "user_profile": null
    }
    ```

- **Example CURL Commands**:
  ```bash
  # Basic request
  curl -X GET https://mimall.ageye.pro/api/discover_session

  # With credentials (if accessing from browser, cookies will be sent automatically)
  curl -X GET https://mimall.ageye.pro/api/discover_session \
    -H "Cookie: sb-access-token=your_access_token; sb-refresh-token=your_refresh_token"
  ```

## Pages (Not API Endpoints but Available Routes)

### Authentication & User Management
- `/login` - User login page
- `/signup` - User registration page
- `/signup/business` - Business signup page
- `/signup/business/driver` - Driver signup page
- `/signup/business/professional` - Professional signup page
- `/signup/business/retailer` - Retailer signup page
- `/signup/buyer` - Buyer signup page
- `/signup/driver` - Driver signup page
- `/signup/seller` - Seller signup page
- `/signup/user` - User signup page
- `/forgot-password` - Password recovery page
- `/reset-password` - Password reset page

### Dashboard & User Features
- `/dashboard` - Main dashboard
- `/dashboard/add-product` - Add product page
- `/dashboard/analytics` - Analytics dashboard
- `/dashboard/listings` - Product listings management

### Main Application Pages
- `/` - Home page
- `/about` - About page
- `/categories` - Categories listing
- `/locations` - Locations page
- `/stores` - Stores listing
- `/michina` - Michina section
- `/michina/locations` - Michina locations
- `/miia` - MIIA section
- `/hailoride` - HailoRide section
