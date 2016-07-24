var express = require('express');
var router = express.Router();

// data is defined once in the app for now
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Drag and Drop Team Builder - Proof of Concept' ,
    coaches: coachData,
    divisions: divisionData
  })
});

module.exports = router;
