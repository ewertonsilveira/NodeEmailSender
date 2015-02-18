var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
	name: String
	, age: String
	, users: Schema.ObjectId
});

mongoose.model('event', schema);