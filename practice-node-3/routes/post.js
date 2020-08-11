var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

// Index
router.get('/', (req, res) => {
  // .sort(String|Object):  
  // String을 전달할 경우 항목명을 기준으로 오름차순 정렬, -붙이면 내림차순 정렬
  // Object를 전달할 경우 오름차순 {createdAt: 1}, 내림차순 {createdAt: -1}
  Post.find({})
    .sort('-cratedAt')
    .exec((err, posts) => {
      if(err) return res.json(err);
      res.render('posts/index', {posts});
    });
});

// New
router.get('/new', (req, res) => {
  res.render('posts/new');
});

// Create
router.post('/', (req, res) => {
  Post.create(req.body, (err, post) => {
    if(err) return res.json(err);
    res.redirect('/posts');
  });
});

// Show
router.get('/:id', (req, res) => {
  Post.findOne({_id: req.params.id}, (err, post) => {
    if(err) return res.json(err);
    res.render('posts/show', {post});
  });
});

// Edit
router.get('/:id/edit', (req, res) => {
  Post.findOne({_id: req.params.id}, (err, post) => {
    if(err) return res.json(err);
    res.render('posts/edit', {post});
  });
});

// Update
router.put('/:id', (req, res) => {
  req.body.updatedAt = Date.now(); // 수정날짜 기록
  Post.findOneAndUpdate({_id: req.params.id}, req.body, (err, post) => {
    //console.log(post);
    if(err) return res.json(err);
    res.redirect('/posts/'+req.params.id);
  });
});

// Destroy
router.delete('/:id', (req, res) => {
  Post.deleteOne({_id: req.params.id}, (err) => {
    if(err) return res.json(err);
    res.redirect('/posts');
  });
})

module.exports = router;