var express 	= require('express');
var sendgrid  	= require('sendgrid')(process.env.U, process.env.PW);
var router 		= express.Router();
var Hogan 		= require('hogan');
var fs 			= require('fs');
var mailer   	= require("mailer") , username=process.env.U, password=process.env.PW;

//Templates: zurb.com/ink
var template = fs.readFileSync('./views/email.hjs', 'utf-8');
var compileTemplate = Hogan.compile(template);

router.get('/sendEmail', function(req, resp){
	var subject = req.params.subject;
	mailer.send({ 
			host:             "smtp.mandrillapp.com"
			, port:           587
			, to:             process.env.EMAIL
			, from:           process.env.EMAIL
			, subject:        subject //"Test email with Mandrill"
			//, body			  {firstName: 'ewertonsilveira'}
			, html:           compileTemplate.render({title: 'Email sender', firstName: 'Ewerton'})
			, authentication: "login"
			, username:       username
			, password:       password
		}, function(err, result){
			if(err){
				console.log(err);
				resp.status(401);
		 	  	resp.send("Email not send!");
			}
			console.log(result);
		  	resp.send("Email Sent :)");
		  	resp.status(200);
	});
});

//https://mandrillapp.com/account
//https://postmarkapp.com/servers/554123/get_started
//https://github.com/niftylettuce/node-email-templates

// router.get('/sendEmail', function(req, resp){
// 	console.log	(process.env.EMAIL);
// 	console.log	(process.env.U);
// 	console.log	(process.env.PW);
// 	sendgrid.send({
// 	  to:       process.env.EMAIL,//'ewertonsilveira@live.com',
// 	  from:     'donotreply@ewertonsilveira.com.br',
// 	  subject:  'Hello World',
// 	  //text:   'My first email through SendGrid.'
// 	  html: 	compileTemplate.render({title: 'Email sender', firstName: 'Ewerton'})
// 	}, function(err, json) {
// 	  if (err) { 
// 	  	console.error(err); 
// 	  	resp.status(200);	  	
// 	  	resp.send("Email not send!");
// 	  }
// 	  console.log(json);
// 	  resp.send("Sent :)");
// 	  resp.status(200);
// 	});
// });


module.exports = router;