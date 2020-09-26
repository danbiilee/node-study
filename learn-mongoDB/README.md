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

// Promise(비동기) 기반으로 작성
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


## 3. insert 모듈 만들기

이제 MongoDB Collection에 데이터를 insert 할 수 있는 모듈을 만들어보자.

```js
const client = require('./pool'); // 1 

const insert = async () => { // 2
  const db = (await client).db('study'); // 3 
  const collection = db.collection('mongo'); 
  collection.insertOne( // 4
    { title: 'node.js' }, 
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
    });
};

module.exports = insert;
```

**1️⃣ DB client 불러오기**
- `db/pool.js`에 작성했던 유틸 모듈인 client를 불러온다.

**2️⃣ DB 접속 및 생성**
- client가 `Promise` 객체를 리턴하므로, `async`와 `await`를 활용한다. 
- `db()` 와 `collection()` 메소드를 이용해 DB와 Collection을 불러온다. 
- 만약 지정한 이름의 DB와 Collection이 없다면 자동 생성된다. 

**3️⃣ 데이터 1건 insert**
- `insertOne()` 메소드
  - 첫 번째 파라미터: insert하려는 데이터
  - 두 번째 파라미터: 콜백함수. 
    - insert에 실패하면 `err`를, 성공하면 `result`를 반환한다. 
    - 에러 핸들링은 필수이다! 