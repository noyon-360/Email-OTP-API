# Email OTP API

A simple and secure API for generating and verifying One-Time Passwords (OTPs) sent to users via email. This API can be used in web and mobile applications to add an additional layer of security for user authentication and verification.

## Features

- Generates secure OTPs with customizable expiration time.
- Sends OTP to user-provided email.
- Verifies OTP within a specified timeframe.
- Customizable settings for OTP length, expiration, and email service.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) and npm (or yarn)
- A valid email account with SMTP credentials (e.g., Gmail, SendGrid, etc.)
- [Git](https://git-scm.com/) (optional, for cloning the repository)

## Getting Started

To get a local copy up and running, follow these steps.

### Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/noyon-360/Email-OTP-API.git
    cd Email-OTP-API
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Configure environment variables** (see [Configuration](#configuration)).

## Configuration

To configure the API, you need to set up environment variables. Create a `.env` file in the root of the project with the following content:

```env
PORT=3000                      # Port on which the server will run
OTP_EXPIRATION_MINUTES=5       # OTP expiration time in minutes
OTP_LENGTH=6                   # Length of the OTP

EMAIL_SERVICE=smtp_provider    # e.g., 'gmail', 'sendgrid'
EMAIL_USER=your_email@example.com
EMAIL_PASSWORD=your_email_password
