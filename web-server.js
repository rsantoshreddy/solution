var express = require('express'),
    http = require('http'),
    path = require('path'),
    history = require('connect-history-api-fallback');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/view');
app.set('view engine', 'ejs');


app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'app')));
app.use(app.router);
app.use(history());

var contacts = [{
    id: 1,
    name: 'Terrence S. Hatfield',
    tel: '651-603-1723',
    email: 'TerrenceSHatfield@rhyta.com'
}, {
    id: 2,
    name: 'Chris M. Manning',
    tel: '513-307-5859',
    email: 'ChrisMManning@dayrep.com'
}, {
    id: 3,
    name: 'Ricky M. Digiacomo',
    tel: '918-774-0199',
    email: 'RickyMDigiacomo@teleworm.us'
}, {
    id: 4,
    name: 'Michael K. Bayne',
    tel: '702-989-5145',
    email: 'MichaelKBayne@rhyta.com'
}, {
    id: 5,
    name: 'John I. Wilson',
    tel: '318-292-6700',
    email: 'JohnIWilson@dayrep.com'
}, {
    id: 6,
    name: 'Rodolfo P. Robinett',
    tel: '803-557-9815',
    email: 'RodolfoPRobinett@jourrapide.com'
}];
var next_id = 7;


app.get('/contacts', function(req, res) {
    // Simulate delay in server
    res.send(contacts);
});

app.post('/contacts', function(req, res) {
    var contact = {};
    contact.id = next_id++;
    contact.name = req.body.name;
    contact.tel = req.body.tel;
    contact.email = req.body.email;
    contacts.push(contact);
    res.send(200);
})

app.put('/contacts/:id', function(req, res) {
    var userId = req.params.id,
        key = getIndexByKey(userId);
    console.log(req.body, key);
    if (key >= 0) {
        contacts[key].name = req.body.name;
        contacts[key].tel = req.body.tel;
        contacts[key].email = req.body.email;
        res.send(200);
    } else {
        res.send(400);
    }
})

app.get('/contacts/:id', function(req, res) {
    var userId = req.params.id,
        key = getIndexByKey(userId);

    res.send(contacts[key]);
})

app.delete('/contacts/:id', function(req, res) {
    var userId = req.params.id,
        key = getIndexByKey(userId);

    contacts.splice(key, 1);
    res.send(200);
});

function getIndexByKey(userId) {
    return contacts.findIndex(function(contact) {
        return (contact.id == userId)
    });
}

function defaultPage(req, res) {
    console.log("index file served");
    res.render('index');
}

app.get('/', defaultPage);

// app.use(function(req, res) {
//     res.redirect('/');
// });

app.get('/*', function(req, res) {
    console.log("check");
    res.redirect('/');
})



http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
