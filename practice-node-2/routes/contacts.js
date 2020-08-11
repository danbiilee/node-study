const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// 현재 모듈은 /concats일 때만 호출되기 때문에 경로에서 concats 생략함. 

// Contacts - index
router.get('/', (req, res) => {
  // 모델.find(검색조건, 콜백함수)
  // 콜백함수(에러, 검색결과): 검색결과는 항상 array이기 때문에(결과가 없을 땐 빈 배열) contact의 복수형을 사용
  Contact.find({}, (err, contacts) => {
    if(err) return res.json(err);
    res.render('contacts/index', {contacts}); // render시 경로 맨 앞에 슬래시 X(views폴더 아래에서 찾음)
  });
});
// Contacts - new
router.get('/new', (req, res) => {
  res.render('contacts/new');
});
// Contacts - create
router.post('', (req, res) => {
  // 모델.create(생성할 데이터의 object, 콜백함수)
  // bodyParser를 통해 form으로 입력받은 데이터가 req.body로 생성됨
  // 콜백함수(에러, 생성된 데이터): 생성된 데이터는 항상 하나이므로 단수형 사용 
  Contact.create(req.body, (err, contact) => {
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});
// Contacts - show
router.get('/:id', (req, res) => {
  // 라우트에 콜론을 사용하면 해당 위치의 값을 받아 req.params에 넣음
  // model.findOne: 검색결과는 object(없을 땐 null)
  Contact.findOne({_id:req.params.id}, (err, contact) => {
    if(err) return res.json(err);
    res.render('contacts/show', {contact});
  });
});
// Contacts - edit
router.get('/:id/edit', (req, res) => {
  Contact.findOne({_id: req.params.id}, (err, contact) => {
    if(err) return res.json(err);
    res.render('contacts/edit', {contact});
  });
});
// Contacts - update
router.put('/:id', (req, res) => {
  // model.findOneAndUpdate: 해당 모델의 도큐먼트를 하나 찾고, 그 데이터를 수정
  // 업데이트 된 후의 값을 보고 싶으면 콜백함수 전에 파라미터로 {new: true} 전달
  Contact.findOneAndUpdate({_id: req.params.id}, req.body, (err, contact) => {
    if(err) return res.json(err);
    res.redirect('/contacts/'+req.params.id);
  });
});
// Contacts - destroy
router.delete('/:id', (req, res) => {
  // model.deleteOne
  Contact.deleteOne({_id: req.params.id}, (err) => {
    if(err) return res.json(err);
    res.redirect('/contacts');
  });
});

module.exports = router;