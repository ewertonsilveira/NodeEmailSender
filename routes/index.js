var express = require('express');
var mongoose = require('mongoose');
//var sendgrid  = require('sendgrid')(process.env.U, process.env.PW);
var router = express.Router();



/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// router.get('/', function handleResponse(req, res){
// 	res.render('index', {
// 		title: 'Family application',
// 		name: 'Ewerton',
// 		wife: 'Lucy',
// 		Child: 'The baby'
// 	});
// });
// router.get('/user/:id', function(req, res){
// 	console.log(req.params);
// 	// res.render('index', req.params);
// 	res.send(req.params.id, 200);
// });
// router.get('/list', function(req, res){
// 	console.log(req.query);//params after ? sign
// 	res.send(200);
// });

router.get('/', function(req, res){	
	res.render('index', {title: 'Welcome'});
	res.status(200);
});

router.get('/users', function(req, res){
	mongoose.model('users').find(function(err, dt){
		console.log(dt);
		res.send(dt);
	});
});

router.get('/posts/:userId', function(req, res){
	console.log(req.params.userId);
	mongoose.model('posts').find({user_id: req.params.userId}, function(err, posts){		
		mongoose.model('posts').populate(posts, { path: 'users'}, function(err, posts){			
			res.send(posts);
		});		
	});
});

router.get('/event', function(req, res){
	mongoose.model('event').find(function(err, dt){
		console.log(dt);
		res.send(dt);
	});
});



module.exports = router;
