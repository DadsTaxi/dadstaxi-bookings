const SQLDB = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

(async () => {
  const db = new SQLDB('data.db');
  await db.init(); // Ensure the database is initialized

  app.get('/seed', async (req, res) => {
    const john = {
      id: 1,
      name: 'John Doe',
      website: 'https://example.com',
      pickupAddress: '123 Main St',
      pickupTime: '1015'
    };
    try {
      await db.create(john);
    } catch (error) {
      // Assuming you're using Express.js or a similar framework
      res.status(500).send('Already seeded');

      return;
    }

    const baby = {
      id: 2,
      name: 'Baby Doe',
      website: 'https://example.com',
      pickupAddress: '123 Main St',
      pickupTime: '1115'
    };
    await db.create(baby);

    //add a dog doe
    const dog = {
      id: 3,
      name: 'Dog Doe',
      website: 'https://example.com',
      pickupAddress: '123 Main St',
      pickupTime: '1215'
    };
    await db.create(dog);

    //add a cat doe
    const cat = {
      id: 4,
      name: 'Cat Doe',
      website: 'https://example.com',
      pickupAddress: '123 Main St',
      pickupTime: '1315'
    };
    await db.create(cat);

    res.status(201).send('Records created');
  });


  app.get('/create', async (req, res) => {
    const record = req.body;
    await db.create(record);
    res.status(201).send('Record created');
  });

  app.get('/all', async (req, res) => {
    const all = await db.getAll();
    res.json(all);
  });

  //updatewebsite by id
  app.get('/updateWebsite', async (req, res) => {
    const id = req.query.id;
    const website = req.query.website;
    await db.updateWebsite(id, website);
    res.status(200).send(`Record updated with id ${id}`);
  });

  //when a user requests / then return the api-home.html
  app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
  });

  //when a user requests / then return the api-home.html
  app.get('/api', (req, res) => {
    res.sendFile('api-home.html', { root: __dirname });
  });

  app.listen(4000, () => console.log('Server started on  http://localhost:4000'));
})();