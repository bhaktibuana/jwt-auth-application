const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  res.json({
    text: 'my api'
  });
});

app.listen(3001, () => {
  console.log('listening on port 3001!');
});