//Install express server    
const express = require('express');
const path = require('path');   
const app = express();
const PORT = process.env.PORT || 5000

// Serve only the static files from the dist directory    
app.use(express.static(__dirname + '/dist/service-app'));

app.get('/*', function(req,res) {  
    res.sendFile(path.join(__dirname + '/dist/service-app/index.html'));   
});  

// Start the app by listening on the default Heroku port    
app.listen(PORT);