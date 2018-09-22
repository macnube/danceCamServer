# danceCamServer

## Development

Make sure Docker is installed

Install dependencies

```
npm install -g prisma@beta
npm install
```

Start prisma server locally and deploy schema

```
cd prisma
docker-compose up -d
prisma deploy
```

Start node server locally

```
npm run dev
```

### Changing the Prisma Schema

If you commit changes to the Prisma Schema, you'll have to re-deploy the change to your local prisma server and generate a new prisma client.

Update Prisma Schema

```
prisma/datamodel.prisma 
```

Deploy Prisma Server

```
prisma deploy
```