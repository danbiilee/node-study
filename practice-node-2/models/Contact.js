const mongoose = require('mongoose');

// DB Schema
const contactSchema = mongoose.Schema({
  name: {type: String, required: true, unique: true},
  email: {type: String},
  phone: {type: String}
});
// DB의 contact라는 데이터 콜렉션을 변수에 연결. 콜렉션이 존재하지 않다면 알아서 해당 이름으로 생성함 
// contact 콜렉션의 형식은 위에서 설정한 contactSchema
const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;