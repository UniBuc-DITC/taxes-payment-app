# Taxes Payment App

## Description

This app enables the online payment of admission/accomodation/study taxes at the University of Bucharest.

## Built with

- [Typescript](https://www.typescriptlang.org/)
- [React](https://react.dev/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Development instructions

You need to have the latest stable versions of [Node.js](https://nodejs.org/en) and [npm](https://www.npmjs.com/) installed.

If it is the first time you're running the app, you will have to install all of the required package dependencies by running `npm install` in the root directory.

The app requires a [PostgreSQL](https://www.postgresql.org/) database to be available. The easiest way to spin up one locally is by installing [Docker](https://www.docker.com/) and then running:

```bash
docker compose up
```

in this directory.

The app uses [NextAuth.js](https://next-auth.js.org/) to provide support for authentication using [Microsoft Entra ID (formerly Azure AD)](https://www.microsoft.com/en-us/security/business/identity-access/microsoft-entra-id). In development, you have to create a `.env.local` file in the root directory and define the following environment variables:

```
AZURE_AD_TENANT_ID=<ID of tenant in which app resides>
AZURE_AD_CLIENT_ID=<client ID of app registration>
AZURE_AD_CLIENT_SECRET<client secret created for app>
```

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
```
