import fastify from 'fastify';
import cors from '@fastify/cors';
import axios from 'axios';

type itemType = {
    date: string;
    total_cases: number;
    new_cases: number;
    total_deaths: number;
    new_deaths: number;
};

type dbType = {
    [key: string]: itemType[];
};

const dataSrc = 'https://covid.ourworldindata.org/data/owid-covid-data.json';

const prepareData = async () => {
    const data = await axios.get(dataSrc);

    const formattedData: dbType = {};

    for (let i in data.data) {
        const item = data.data[i];

        if (item?.location === undefined) continue;

        formattedData[item.location] = item.data.map((d: itemType) => ({
            date: d.date,
            total_cases: d.total_cases,
            new_cases: d.new_cases,
            total_deaths: d.total_deaths || 0,
            new_deaths: d.new_deaths || 0,
        }));
    }

    return formattedData;
};

// All this data should be get once and stored in a database. But to save time I did not implement recording and storing
const db = prepareData();

const app = fastify({logger: true});

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST'],
});

app.get<{
    Querystring: api.countries.request;
    ServerResponse: api.countries.response;
}>('/api/countries', async (request, reply) => {
    const data = await db;

    return reply.send(Object.keys(data));
});

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
    Body: api.lineChart.request;
    ServerResponse: api.lineChart.response;
}>('/api/lineChart', async (request, reply) => {
    const {countries, status, timeline} = request.body;
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

app.post<{
    Body: api.barChart.request;
    ServerResponse: api.barChart.response;
}>('/api/barChart', async (request, reply) => {
    const {countries, status} = request.body;
    const rawData = await db;
    const selectedCountries =
        countries.length !== 0 ? countries : Object.keys(rawData);

    const resultSum = selectedCountries.reduce((acc: number[], country) => {
        acc.push(
            rawData[country].at(-1)![
                status === 'confirmed' ? 'total_cases' : 'total_deaths'
                ]
        );

        return acc;
    }, []);

    return reply.send({
        countries: selectedCountries,
        data: resultSum,
    });
});

(async () => {
    try {
        await app.listen({port: 3001});
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
})();
