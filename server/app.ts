import fastify from 'fastify';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';
import data from './data';

type dbType = {
  [key: string]: {
    date: string;
    total_cases: number;
    new_cases: number;
    total_deaths: number;
    new_deaths: number;
  }[];
};

const prepareData = async () => {
  // const data = await axios.get(
  //   'https://covid.ourworldindata.org/data/owid-covid-data.json'
  // );

  const formattedData: dbType = {};

  for (let i in data) {
    // @ts-ignore
    const item = data[i];

    if (item?.location === undefined) continue;

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

const db = prepareData();

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

app.get('/api/lineChart', async (request, reply) => {
  // const { countries } = request.query;
  const countries = ['Afghanistan'];
  const rawData = await db;

  const countriesWithData = countries.map(country => ({
    country,
    series: rawData[country].map(d => d.new_deaths),
  }));

  const timeLine = new Set();

  countries.forEach(country => {
    const item = rawData[country];

    item.forEach(i => {
      timeLine.add(i.date);
    });
  });

  return reply.send({
    countries: countriesWithData,
    timeLine: Array.from(timeLine),
  });
});

app.get('/api/barChart', async (request, reply) => {
  const countries = ['Afghanistan'];
  const rawData = await db;
  const keys = Object.keys(rawData);

  const resultSum = keys.map(country => ({
    [country]: rawData[country].reduce((acc, cur) => {
      acc += cur.total_deaths;
      return acc;
    }, 0),
  }));

  console.log(resultSum);

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
