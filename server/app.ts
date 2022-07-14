import fastify from 'fastify';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';

const app = fastify({ logger: true });

app.register(cookie, {
  parseOptions: {
    sameSite: true,
    path: '/',
  },
} as FastifyCookieOptions);

app.register(cors, {
  origin: '*',
  methods: ['GET', 'POST', 'PUT'],
});

app.put<{ Body: api.auth.request; Reply: api.auth.response }>(
  '/api/auth',
  async (request, reply) => {
    const user = request.body.user;

    // This assumes the addition to the database, encryption and other things. But since this is not a condition of the test job,
    // I will just use the username in the cookie

    reply.setCookie('user', user);

    return reply.send({});
  }
);

(async () => {
  try {
    await app.listen({ port: 3001 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
