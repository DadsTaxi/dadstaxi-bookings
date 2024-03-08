const SQLDB = require('./db');

async function main() {
  const db = new SQLDB('data.db');
  await db.init(); // Ensure the database is initialized

  await db.create({ 
    id: 'DOE', 
    name: 'John Doe',
    website: 'https://example.com',
    pickupAddress: '123 Main St',
    pickupTime: '1015'
  }); // Create a new record
  const john = await db.get('DOE'); // Get record by ID
  console.log('John Doe:', john);

  john.name = 'Jane Doe'; // Update the name

  //log the updated record
  console.log('Updated John Doe:', john);
  await db.update('DOE', john); // Update the record with the values from updatedJohn


  const jane = await db.get('DOE'); // Get updated record
  console.log('Jane Doe:', jane);

  //add another record BD baby doe
  await db.create({ 
    id: 'BABY', 
    name: 'Baby Doe',
    website: 'https://example.com',
    pickupAddress: '123 Main St',
    pickupTime: '1115'
  });

  //output all records
  const all = await db.getAll();
  console.log('All:', all);

  await db.delete('DOE'); // Delete the record
  await db.delete('BABY'); // Delete the record
  await db.close();
}

main();