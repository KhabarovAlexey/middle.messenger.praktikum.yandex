const express = require('express');
const path = require('path');
const env = process.env;
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(env.PORT, () => {
  console.log(`app listening on port ${env.PORT}`);
});
