module.exports = function(app, db) {

  app.get('/questions/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('questions').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });	

  app.get('/questionsforuser/:id', (req, res) => {
    const id = req.params.id;
    const details = { userId:id };
    db.collection('questions').find(details).toArray(function(err, results){
      console.log(results)
      res.send(results);
      
   });

  });	

  app.get('/questionsforDoctor/:id', (req, res) => {
    const id = req.params.id;
    const details = { doctor:id };
    db.collection('questions').find(details).toArray(function(err, results){
      console.log(results)
      res.send(results);
      
   });

  });	
  
  app.get('/questions', (req, res) => {
    const details = { doctor: { $exists: false} };

    db.collection('questions').find({ doctor: { $exists: false} }).toArray(function(err, results){
      console.log(results)
      res.send(results);
      //res.json(200, {'flag': true});
   });
 
    // var stream = db.collection('questions').find().stream();
    // stream.on('data', function(doc) {
    //     res.send(doc);
    // });
    // stream.on('error', function(err) {
    //     res.send(err);
    // });
    // stream.on('end', function() {
    //     console.log('All done!');
    // });
  });
	
	
  app.post('/questions', (req, res) => {
    const note = { userId:req.body.userId,doctor: "No Doctor Viewed this question",title:req.body.title, question: req.body.question,date : new Date() };
    db.collection('questions').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
  
  app.put('/questions/:id', (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    const details = { '_id': ObjectId(id) };
    var test={};
    test.userId =req.body.userId;
    test.doctor =req.body.doctor;
    test.title =req.body.title;
    test.question =req.body.question;
    test.date =new Date();
    const note = test;
    db.collection('questions').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
  
  app.delete('/questions/:id', (req, res) => {
    const id = req.params.id;
    var ObjectId = require('mongodb').ObjectID;
    const details = { '_id': new ObjectId(id) };
    db.collection('questions').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  
  });

  app.get('/users/:email', (req, res) => {
    const email = req.params.email;
    const details = { 'email': email };
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      } 
    });
  });	
  
  app.get('/users', (req, res) => {

    db.collection('users').find({}).toArray(function(err, results){
      console.log(results)
      res.send(results);
      //res.json(200, {'flag': true});
   });
  });
		
  app.post('/users', (req, res) => {
    const note = { name:req.body.name,email: req.body.email, password: req.body.password,usertype:"P" };
    //const note =req.body;
    db.collection('users').insert(note, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
   
  app.put('/users/:username', (req, res) => {
    const username = req.params.username;
    const details = { 'username': username };
    const note = { text: req.body.body, title: req.body.title };
    db.collection('users').update(details, note, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(note);
      } 
    });
  });
  
  app.delete('/users/:username', (req, res) => {
    const username = req.params.username;
    const details = { 'username': username };
    db.collection('users').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Note ' + id + ' deleted!');
      } 
    });
  
  });

  app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const details = { 'email': email,'password':password };

    //const note =req.body;
    db.collection('users').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });


};