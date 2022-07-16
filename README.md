# Covid Project

### Project startup

The project uses the `pnpm` package manager and commands will be given with it. But you are free to use `npm`.
The project consists of a server part and a front end.

There was no server startup task in the problem statement. But processing a large data set on the front end is bad
practice. It is quite possible to get a non-working application on weak user devices. So I made a simple server
implementation to store/process the data.

To start the server:

```
cd server/
pnpm i
pnpm run start
```

To start the front end:

```
pnpm i
pnpm run dev
```

### Main technologies used

- `pnpm` - package manager
- `vite` - project builder
- `typescript` - for typing
- `react` - a library for creating components
- `fastify` - for work with the server