import fastify from 'fastify';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';
import data from './data';

const prepareData = (data: any) => {
  const formattedData: any = {};

  for (let i in data) {
    const item = data[i];

    formattedData[item.location] = item.data.map((d: any) => ({
      date: d.date,
      total_cases: d.total_cases,
      new_cases: d.new_cases,
      total_deaths: d.total_deaths || 0,
      new_deaths: d.new_deaths || 0,
    }));
  }

  return formattedData;
};

const db = prepareData(data);

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

app.get('/api/countries', async (request, reply) => {
  return reply.send(Object.keys(db));
});

(async () => {
  try {
    await app.listen({ port: 3001 });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
})();
