const express = require('express');

const app = express();

app.use(express.static('./dist/grant-management-frontend'));

app.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/grant-management-frontend/'}
  );
});

app.listen(process.env.PORT || 8080);