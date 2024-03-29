const port = process.env.PORT || 4000;
const SQLDB = require('./db');
const express = require('express');
const app = express();
app.use(express.json());

(async () => {
  const db = new SQLDB('data.db');
  await db.init(); // Ensure the database is initialized

  app.get('/api/seed', async (req, res) => {
    const john = {
      id: 1,
      name: 'John Doe',
      website: 'https://osm.org/go/uN~RapNx?m=',
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
      website: 'https://osm.org/go/euu6ARXXm-?m=',
      pickupAddress: '123 Main St',
      pickupTime: '1115'
    };
    await db.create(baby);

    //add a dog doe
    const dog = {
      id: 3,
      name: 'Dog Doe',
      website: 'https://osm.org/go/euutfFQrz-?m=',
      pickupAddress: '123 Main St',
      pickupTime: '1215'
    };
    await db.create(dog);

    //add a cat doe
    const cat = {
      id: 4,
      name: 'Cat Doe',
      website: 'https://osm.org/go/WPokyaLhS?m=',
      pickupAddress: '123 Main St',
      pickupTime: '1315'
    };
    await db.create(cat);

    const all = await db.getAll();
    res.json(all);
  });


  app.get('/api/create', async (req, res) => {
    const record = {
      name: req.query.name,
      website: req.query.website,
      pickupTime: req.query.pickupTime
    };
    await db.create(record);
    res.status(201).send('Record created');
  });

  app.get('/api/all', async (req, res) => {
    const all = await db.getAll();
    res.json(all);
  });

  //updatewebsite by id
  app.get('/api/updateWebsite', async (req, res) => {
    const id = req.query.id;
    const website = req.query.website;
    await db.updateWebsite(id, website);
    res.status(200).send(`Record updated with id ${id}`);
  });

  //when a user requests / then return the api-home.html
  app.get('/api', (req, res) => {
    res.sendFile('web/api-home.html', { root: __dirname });
  });

  app.use(express.static('web')); // Serve static files from 'web' directory

  app.listen(port, () => console.log('Server started on  http://localhost:' + port));
})();