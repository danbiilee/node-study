# practice-api-2

빠르게 Node.js 실습 후 REST API 만들러 가봅시다요! 


## Package 설치 
**1. 기본 패키지들**
```javascript
$ npm install --save ejs express mongoose
```

**2. nodemon**  
서버를 실행할 때 `node index.js` 명령어 대신 코드 변경시 자동으로 서버를 재시작해주는 `nodemon` 명령어를 사용해보자.   
현재 프로젝트 내부가 아닌 컴퓨터에 직접 설치할 것이므로 `--global` 옵션을 사용해 설치한다.    
```javascript
$ npm install --global nodemon
```

**3. body-parser**   
form으로 전송된 데이터를 서버에서 쉽게 사용하기 위해 설치한다. 
```javascript
$ npm install --save body-parser
```

**4. method-override**  
`HTTP Methods` 중  `put`과 `delete`를 사용하기 위해 설치한다. 대부분 브라우저의 form은 `get`과 `post`말곤 허용하지 않기 때문이다. 
> 브라우저에선 허용하지 않지만 나중에 API로 연결할 땐 문제가 되지 않는다.    
```javascript
$ npm install --save method-override
```


## 셋팅 시 주의 
몽고DB connection string 가져올 때 버전을 `2.2.12 or later`로 해야 에러나지 않는다.




## 참고 사이트 
- [mongoDB Atlas 가입 방법](https://www.a-mean-blog.com/ko/blog/%EB%8B%A8%ED%8E%B8%EA%B0%95%EC%A2%8C/_/mongoDB-Atlas-%EA%B0%80%EC%9E%85-%EB%B0%A9%EB%B2%95-%EB%AC%B4%EB%A3%8C-mongo-DB-%ED%81%B4%EB%9D%BC%EC%9A%B0%EB%93%9C-%EC%84%9C%EB%B9%84%EC%8A%A4)
- [Node JS 첫걸음: 주소록 만들기](https://www.a-mean-blog.com/ko/blog/Node-JS-%EC%B2%AB%EA%B1%B8%EC%9D%8C/%EC%A3%BC%EC%86%8C%EB%A1%9D-%EB%A7%8C%EB%93%A4%EA%B8%B0) 