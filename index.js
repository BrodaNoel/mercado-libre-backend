var express = require('express');
var app = express();
const PORT = 9001;

app.get('/api/items', function(req, res){
  res.send({ foo: 'bar' });
});

app.listen(PORT);
console.log(`Express running on port ${PORT}`);
