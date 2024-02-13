# Taxes Payment App

## Description

This app enables the online payment of admission/accomodation/study taxes at the University of Bucharest.

## Built with

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Development instructions

### Dependencies

You need to have the latest stable versions of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed.

If it is the first time you're running the app, you will have to install all of the required package dependencies by running `npm install` in the root directory.

### Database setup

The app requires a [PostgreSQL](https://www.postgresql.org/) database to be available. The easiest way to spin up one locally is by installing [Docker](https://www.docker.com/) and then running:

```bash
docker compose up
```

[Prisma](https://www.prisma.io/) is our chosen [ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping). Some useful commands:

- To use the Prisma CLI with the development database:

  ```bash
  npm run prisma
  ```

- To initialize the database, or to push changes without creating a migration:

  ```bash
  npm run prisma:push
  ```

- To synchronize the database and create a migration:

  ```bash
  npm run prisma:migrate --name "migration name"
  ```

- To generate or update the Prisma client:

  ```bash
  npm run prisma:generate
  ```

  This step is required after every schema change, because the Prisma client is dynamically generated and stored in a subdirectory of the `node_modules` folder, which is not commited into version control.

- To seed the database with some fake data for development purposes:

  ```bash
  npm run seed:dev
  ```

### Authentification config

The app uses [NextAuth.js](https://next-auth.js.org/) to provide support for authentication using [Microsoft Entra ID (formerly Azure AD)](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id). In development, you have to create a `.env.local` file in the root directory and define the following environment variables:

```
AZURE_AD_TENANT_ID=<ID of tenant in which app resides>
AZURE_AD_CLIENT_ID=<client ID of app registration>
AZURE_AD_CLIENT_SECRET<client secret created for app>
```

### ReCAPTCHA config

The app utilizes [Google ReCAPTCHA v2 Checkbox](https://developers.google.com/recaptcha/docs/display). In development, please add the following keys to your `.env.local` file:

```
NEXT_PUBLIC_RECAPTCHA=<The site/public key>
RECAPTCHA_SERVER=<Your private key for verifying the reCAPTCHA token>
```

### Useful development commands

To start a local development server, use:

```bash
npm run dev
```

To format the code automatically using [Prettier](https://prettier.io/), use:

```bash
npm run format
```

To check for code issues using [ESLint](https://eslint.org/), run:

```bash
npm run lint
```

## Deployment instructions

The following environment variables must be defined for the app to function properly:

```
NEXTAUTH_URL=<app's canonical base URL>
NEXTAUTH_SECRET=<cryptographically secure secret key, to be used for encryption>
AZURE_AD_TENANT_ID=<ID of tenant in which app resides>
AZURE_AD_CLIENT_ID=<client ID of app registration>
AZURE_AD_CLIENT_SECRET<client secret created for app>
NEXT_PUBLIC_RECAPTCHA=<The site/public key>
RECAPTCHA_SERVER=<Your private key for verifying the reCAPTCHA token>
```
