const express = require('express');
const router = express.Router(); // router함수 초기화

// Home
// app.get() -> router.get() 
router.get('/', (req, res) => {
  res.redirect('/contacts');
});

module.exports = router; // router object가 모듈이 되어 require시에 사용됨 