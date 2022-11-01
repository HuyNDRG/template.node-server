# Read this before coding 😁

## Project Documentation

1. Packages management using `yarn` instead of `npm`

## Prepare Prisma stuff

### Generate client, model

Generate client for connection, model for table within schema specified. Do NOT change schema to change to newest database. Use Update schema below instead

```sh
yarn prisma:generate
```

### Update schema

Update schema to match with newest version on database

```sh
yarn prisma:update
```

---
