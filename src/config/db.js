const mongoose = require('mongoose');
const options = {
  // user: 'user',
  // pass: 'pass',
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}
mongoose.connect('mongodb://127.0.0.1/dbb', options).then(() => {
  console.log("Connected to Database");
}).catch((err) => {
  console.log("Not Connected to Database ERROR! ", err);
});;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;