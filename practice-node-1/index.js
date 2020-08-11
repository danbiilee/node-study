const express = require('express');
const app = express();

// 1.
// app.get('/', (req, res) => {
//   res.send('Hello World!');
//   console.log(req);
//   console.log(res);
// });

// 2.
// 서버 요청이 올 때마다 무조건 콜백함수 실행 
// __dirname: Node.js에서 프로그램이 실행중인 파일 위치를 나타내는 전역변수 
// expree.static(__dirname + '/publc') : 현재위치/public 라우트를 static 폴더로 지정하라 
//app.use(express.static(__dirname + '/public')); 

// 3. 
// ejs: Express에서 다이나믹 웹사이트를 만들기 위해 템플릿으로 사용되는 파일
// ejs를 사용하기 위해 express의 view engine에 셋팅 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public')); 

// hello.ejs파일을 사용하기 위해 res.render 사용
// res.render는 ejs를 /views폴더에서 찾으므로 폴더명 변경 불가
// 모든 쿼리들은 req.query에 저장
// 콜론(:)으로 시작하는 라우트는 req.params에 저장 
app.get('/hello', (req, res) => {
  res.render('hello', {name: req.query.nameQuery}); // /hello?nameQuery=aa
});
app.get('/hello/:nameParam', (req, res) => {
  res.render('hello', {name: req.params.nameParam}); // /hello/aa
});


const port = 3000;
app.listen(port, () => {
  console.log('server on! http://localhost:'+port);
})