import app from '../src/app';
import bodyParser from 'body-parser'
const port = normalizaPort(process.env.PORT || '3001');
function normalizaPort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        return val;
    }
if (port >= 0) {
        return port;
    }
return false;
}
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
  }));

// parse application/json
// app.use(bodyParser.json())

app.listen(port, function () {
    console.log(`app listening on port ${port}`)
})