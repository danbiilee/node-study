// mongoDB 클라이언트 즉, DB pool 만들기
const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'; // mongoDb의 default server

const client = new Promise((resolve, reject) => {
  MongoClient.connect(
    url,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, client) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(client);
    },
  );
});

module.exports = client;
