const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Index
router.get('/', (req, res) => {
  // usernmae을 기준으로 오름차순(1). 내림차순은 -1
  // 중간에 sort와 같은 함수가 끼어들 땐 exec 함수를 사용
  User.find({})
    .sort({username: 1})
    .exec((err, users) => {
      if(err) return res.json(err);
      res.render('users/index', {users});
    });
});

// New
router.get('/new', (req, res) => {
  res.render('users/new');
});

// Create
router.post('/', (req, res) => {
  User.create(req.body, (err, user) => {
    if(err) return res.json(err);
    res.redirect('/users');
  });
});

// Show
router.get('/:username', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if(err) return res.json(err);
    res.render('users/show', {user});
  });
});

// Edit
router.get('/:username/edit', (req, res) => {
  User.findOne({username: req.params.username}, (err, user) => {
    if(err) return res.json(err);
    res.render('users/edit', {user});
  });
});

// Update
router.put('/:username', (req, res, next) => {
  // findOneAndUpdate함수 대신 findOne + save함수를 이용
  // 단순히 값을 바꾸는 게 아니라 비밀번호 조건에 맞게 바꿔줘야하기 때문
  // User Schema에서 password값을 읽어오지 않도록 설정했지만 select함수를 이용해 변경 가능 
  // 안 읽어오게 할 땐 select(-항목명)
  // .select('password -name'): password는 읽어오고 name은 안 읽어옴
  User.findOne({username: req.params.username})
    .select('password')
    .exec((err, user) => {
      if(err) res.json(err);

      // update user object
      user.originalPassword = user.password;
      user.password = req.body.newPassword ? req.body.newPassword : user.password;
      for(let p in req.body) { // DB에서 읽어온 user를 form에 입력된 req.body로 덮어씀 
        user[p] = req.body[p];
      }

      // save updated user
      user.save((err, user) => {
        if(err) return res.json(err);
        res.redirect('/users/'+user.username);
      });
    }); 
});

// destroy
router.delete('/:username', (req, res) => {
  User.deleteOne({username: req.params.username}, (err) => {
    if(err) return res.json(err);
    res.redirect('/users');
  });
});

module.exports = router;