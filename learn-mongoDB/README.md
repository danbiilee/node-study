# MongoDB 배우기


## 1. 설치

프로젝트 생성 후 package.json을 생성한다. 

```js
$ npm init
```

그 다음 필요한 `mongodb` 패키지를 설치한다.   
> ❗ `--save` 해야 설치한 패키지가 package.json의 `dependencies`에 추가된다. 

```js
$ npm i mongodb --save
```


## 2. MongoDB 접속하기 

DB 접속은 CRUD를 함에 있어서 공통적이고 필수적인 부분이다.   
따라서 DB Connection과 관련된 로직은 `db` 라는 새로운 디렉터리 생성 후 Utility Function으로서 사용될 공통 모듈로 분리하여 작업한다. 

> **✨ `Utility Function` 이란?**   
다른 함수의 작업(CRUD)을 도와주기 위한 즉, 기능적으로 활용할 수 있는 함수를 의미한다. 

 
```js
// db/pool.js
// mongoDB 클라이언트 즉, DB pool 만들기

const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017'; // mongoDB의 default server

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

module.exports = client; // Utility Function인 client 완성!
```

