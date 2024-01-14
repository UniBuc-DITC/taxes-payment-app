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
