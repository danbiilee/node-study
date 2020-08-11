const mongoose = require('mongoose');

// schema
const userSchema = mongoose.Schema({
  // require에 배열 전달. 첫번째는 true/false값, 두번째는 에러메시지
  // select 속성: false로 설정하면 DB에서 해당 항목값을 읽어오지 않음
  username: {type: String, required: [true, 'Username is required!'], unique: true},
  password: {type: String, required: [true, 'Password is required!'], select: false},
  name: {type: String, required: [true, 'Name is required!']},
  email: {type: String}
}, {
  toObject: {virtuals: true}
});
// toObject: {virtuals: true} 쓰는 이유 
/*
mongoose의 model은 toObject함수를 사용해서 plain javascrirpt object로 변경될 수 있음.
기본적으로 virtual들은 console.log에서 표시되지 않으나 virtuals: true로 설정하면
직접 toObject 함수를 사용하지 않더라도 toObject함수가 자동으로 먼저 호출되서 로그에 잘 찍힘. 
여기선 update user object 시 디버깅용으로 사용한 것 
*/

// virtuals
// DB에 저장될 필욘 없지만 model에서 사용하고 싶은 항목들
userSchema.virtual('passwordConfirmation')
  .get(function(){ return this._passwordConfirmation; })
  .set(function(value){ this._passwordConfirmation=value; });

userSchema.virtual('originalPassword')
  .get(function(){ return this._originalPassword; })
  .set(function(value){ this._originalPassword=value; });

userSchema.virtual('currentPassword')
  .get(function(){ return this._currentPassword; })
  .set(function(value){ this._currentPassword=value; });

userSchema.virtual('newPassword')
  .get(function(){ return this._newPassword; })
  .set(function(value){ this._newPassword=value; });

// password validation
userSchema.path('password').validate(function(v) {
  const user = this; // this는 User 모델 
  // * validate의 콜백함수로 화살표 함수 쓰면 user에서 invalidate함수를 찾을 수 없다는 에러 뜸

  // create user
  if(user.isNew){
    if(!user.passwordConfirmation){
      user.invalidate('passwordConfirmation', 'Password Confirmation is required.');
    }

    if(user.password !== user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
    }
  }
  
  // update user
  if(!user.isNew){
    if(!user.currentPassword){
      user.invalidate('currentPassword', 'Current Password is required!');
    }
    else if(user.currentPassword != user.originalPassword){
      user.invalidate('currentPassword', 'Current Password is invalid!');
    }

    if(user.newPassword !== user.passwordConfirmation) {
      user.invalidate('passwordConfirmation', 'Password Confirmation does not matched!');
    }
  }
});

// model & export
const User = mongoose.model('user', userSchema);
module.exports = User;


