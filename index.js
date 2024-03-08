const SQLDB = require('./db');

async function main() {
  const db = new SQLDB('data.db');
  await db.init(); // Ensure the database is initialized

  await db.create({ id: 1, name: 'John Doe' }); // Create a new record
  const john = await db.getAll(1); // Get record by ID
  console.log('John Doe:', john);

  await db.update(1, { name: 'Jane Doe' }); // Update the record
  const jane = await db.getAll(1); // Get updated record
  console.log('Jane Doe:', jane);

  await db.delete(1); // Delete the record
  await db.close();
}

main();