import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const port = 3000;
const app = express();
const compiler =webpack(config);

//telling our app to use middleware to the compiler
app.use(require('webpack-dev-middleware')(compiler,{
    noInfo:true,
    publicpath:config.output.publicPath
}));

//set the path for connection
app.get('/', function (req, res) {             //tell express which routes should it handle
res.sendFile(path.join(__dirname, '../src/index.html'));

});  

app.listen(port, function(err){
    if(err){
        console.log(err);
    }else{
        open('http://localhost:'+port);
    }
})