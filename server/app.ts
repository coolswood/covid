import fastify from 'fastify';
import cookie, { FastifyCookieOptions } from '@fastify/cookie';
import cors from '@fastify/cors';
import axios from 'axios';

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
  const data = await axios.get(
    'https://covid.ourworldindata.org/data/owid-covid-data.json'
  );

  const formattedData: dbType = {};

  for (let i in data.data) {
    // @ts-ignore
    const item = data.data[i];

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

app.get<{ Querystring: {}; ServerResponse: string[] }>(
  '/api/countries',
  async (request, reply) => {
    const data = await db;

    return reply.send(Object.keys(data));
  }
);

const mapData = {
  confirmed: {
    total: 'total_cases',
    new: 'new_cases',
  },
  deaths: {
    total: 'total_deaths',
    new: 'new_deaths',
  },
} as const;

app.post<{
  Body: {
    countries: string[];
    status: 'confirmed' | 'deaths';
    timeline: 'total' | 'new';
  };
  ServerResponse: {
    countries: { country: string; series: number[] }[];
    timeline: string[];
  };
}>('/api/lineChart', async (request, reply) => {
  const { countries, status, timeline } = request.body;
  const rawData = await db;
  const selectedCountries =
    countries.length !== 0 ? countries : Object.keys(rawData);

  const countriesWithData = selectedCountries.map(country => ({
    country,
    series: rawData[country].map(d => d[mapData[status][timeline]]),
  }));

  const dates = new Set();

  selectedCountries.forEach(country => {
    const item = rawData[country];

    item.forEach(i => {
      dates.add(i.date);
    });
  });

  return reply.send({
    countries: countriesWithData,
    dates: Array.from(dates),
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
