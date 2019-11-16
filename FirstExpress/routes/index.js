var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('loginSignup',{title:"Authentication", success: req.session.success, errors:req.session.errors ,headlines:'Main Website'});
  req.session.success = null;
  req.session.errors = null;
});

router.get('/main',function(req,res,next){
  res.render('index', { title: 'SuNiL',condition: true,anyArray:[1,2,3] });
});

router.get('/test/:id',function(req,res,next){
  res.render('test',{output:req.params.id});    //accessing view file...
});

router.post('/test/submit',function(req,res,next){
  var id=req.body.id;
  res.redirect('/test/'+id);
});

router.post('/auth',function(req,res,next){

  console.log("hello");

  req.check('email','Invalid Email Address').isEmail();
  req.check('password','password is invalid').isLength({min:4}).equals(req.body.confirmPassword);
  var errors = req.validationErrors();
  if(errors)
  {
    req.session.errors = errors;
    req.session.success = false;
  }
  else{
    req.session.success = true;
  }
  res.redirect('/');
});

module.exports = router;
