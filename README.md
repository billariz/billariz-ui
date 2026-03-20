# billariz-ui

Frontend of the Billariz platform — open-source billing solution for utilities.

Built with **React** and **Material UI**, it provides a full management interface for customers, contracts, and invoices.

[![License: AGPL-3.0](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

---

## Features

- Customer management dashboard
- Contract and subscription management
- Invoice consultation and tracking
- Multi-language support (FR, EN, ES)
- Responsive design

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | JavaScript (React) |
| UI Library | Material UI |
| State Management | Redux |
| Build Tool | React App Rewired |
| Container | Docker |

---

## Getting Started

### Prerequisites

- Node.js 16+
- Yarn
- A running instance of [billariz-corp](../billariz-corp)

### Local setup

**1. Clone the repository**
```bash
git clone https://github.com/billariz/billariz-ui.git
cd billariz-ui
```

**2. Configure your local environment**
```bash
cp .env.example .env
# Edit .env with your local API URL and Cognito settings
```

**3. Install dependencies and start**
```bash
yarn install
yarn start
```

The app will be available at `http://localhost:3000`

---

## Local authentication with cognito-local

In local mode, authentication is handled by [cognito-local](https://github.com/jagregory/cognito-local) instead of AWS Cognito. Follow these steps to set up a local user and connect to the backend.

### 1. Start cognito-local

```bash
docker run -p 9229:9229 jagregory/cognito-local
```

### 2. Create a User Pool and client

```bash
aws --endpoint http://localhost:9229 cognito-idp create-user-pool \
  --pool-name billariz-local

aws --endpoint http://localhost:9229 cognito-idp create-user-pool-client \
  --user-pool-id <UserPoolId> \
  --client-name billariz-ui

aws --endpoint http://localhost:9229 cognito-idp update-user-pool-client \
  --user-pool-id <UserPoolId> \
  --client-id <ClientId> \
  --explicit-auth-flows USER_PASSWORD_AUTH
```

### 3. Create the generic local user and assign a group

```bash
aws --endpoint http://localhost:9229 cognito-idp admin-create-user \
  --user-pool-id <UserPoolId> \
  --username admin@billariz.com \
  --temporary-password Test1234! \
  --message-action SUPPRESS

aws --endpoint http://localhost:9229 cognito-idp create-group \
  --user-pool-id <UserPoolId> \
  --group-name Local

aws --endpoint http://localhost:9229 cognito-idp admin-add-user-to-group \
  --user-pool-id <UserPoolId> \
  --username admin@billariz.com \
  --group-name Local
```

### 4. Configure `.env.local`

Create a `.env.local` file at the root of the project:

```env
REACT_APP_ENV=local
REACT_APP_HOST_API=http://localhost:8080/v1/
REACT_APP_COGNITO_USER_POOL_ID=<UserPoolId>
REACT_APP_COGNITO_CLIENT_ID=<ClientId>
REACT_APP_AWS_REGION=local
REACT_APP_COGNITO_DOMAIN=localhost
REACT_APP_COGNITO_REDIRECT_URI=http://localhost:3000/callback
```

### 5. Configure billariz-corp for local JWT validation

In `billariz-corp/app/src/main/resources/application-local.yaml`, add:

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: http://localhost:9229/<UserPoolId>/.well-known/jwks.json
```

### 6. Log in

Start the app (`yarn start`) and log in with:

- **Email**: `admin@billariz.com`
- **Password**: `Test1234!`

> On first login, Cognito will prompt you to set a new password.

---

### Run with Docker Compose (full stack)

```bash
docker compose up -d
```

See the root [`docker-compose.yml`](../docker-compose.yml).

---

## License

Licensed under **AGPL-3.0** — see [LICENSE](LICENSE) for details.
For commercial licensing: contact@billariz.com

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
