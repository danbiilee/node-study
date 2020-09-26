const client = require('./pool');

const insert = async () => {
  const db = (await client).db('study');
  const collection = db.collection('mongo');
  collection.insertOne({ title: 'node.js' }, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
  });
};

module.exports = insert;
