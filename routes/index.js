var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Drag and Drop Team Builder - Proof of Concept' , 
    coaches: [
      { id:'01', name:'Aaron Martin'},
      { id:'02', name:'Steve Cassin'},
      { id:'03', name:'Paula Cassin'},
      { id:'04', name:'Julie Landis'},
      { id:'05', name:'Carley Anderson'},
      { id:'06', name:'Matt Earls'},
      { id:'07', name:'Alan Watson'},
      { id:'08',name:'Giulia Brofferio'}
    ],
    divisions: [ 
      { name:'7-8', 
        teams:[
          {id:'01',name:'Team-01',coaches:[],players:[]},
          {id:'02',name:'Team-02',coaches:[],players:[]},
          {id:'03',name:'Team-03',coaches:[],players:[]}
        ],
        players:[ 
          {id:'001', name: 'Joey', age: '8'},
          {id:'002', name: 'Jill', age: '7'},
          {id:'003', name: 'Sabrina', age: '7'}
        ]
      },
      { name:'9-10', 
        teams:[
          {id:'04',name:'Team-04',coaches:[],players:[]},
          {id:'05',name:'Team-05',coaches:[],players:[]},
          {id:'06',name:'Team-06',coaches:[],players:[]}
        ],
        players:[ 
          {id:'0025', name: 'Kelly', age: '9'},
          {id:'0035', name: 'Kim', age: '10'},
          {id:'0043', name: 'Kyle', age: '8'}
        ]
      },
      { name:'11-12', 
        teams:[
          {id:'07',name:'Team-07',coaches:[],players:[]},
          {id:'08',name:'Team-08',coaches:[],players:[]},
          {id:'09',name:'Team-09',coaches:[],players:[]}
        ],
        players:[ 
          {id:'101', name: 'Lola', age: '11'},
          {id:'102', name: 'Lyle', age: '12'},
          {id:'103', name: 'Lovitz', age: '11'}
        ]
      }
    ]
  })
});

module.exports = router;
