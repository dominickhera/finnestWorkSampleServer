// Example express application adding the parse-server module to expose Parse
// compatible API routes.

var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
var transactionArray = [
  {
      description: "POS Walmart",
      amount: '200',
      date: '2018-02-10T14:21:19.465Z'
    },
    {
      description: 'POS chipotle',
      amount: '1000',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Kmart',
      amount: '3000',
      date: '2018-11-10T14:21:19.465Z'
    },
    {
      description: 'POS Macdonalds',
      amount: '400',
      date: '2018-09-10T14:21:19.465Z'
    },
    {
      description: 'POS alcohol stuff',
      amount: '2500',
      date: '2018-08-10T14:21:19.465Z'
    },
    {
      description: 'POS google',
      amount: '1200',
      date: '2018-09-10T14:21:19.465Z'
    },
    {
      description: 'POS apple',
      amount: '9920',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS über',
      amount: '20',
      date: '2018-02-10T14:21:19.465Z'
    },
    
    {
      description: 'Greatest Finnest',
      amount: '20226',
      date: '2018-03-10T14:21:19.465Z'
    },
    {
      description: 'sop dog',
      amount: '2660',
      date: '2018-04-10T14:21:19.465Z'
    },
    {
      description: 'stoff',
      amount: '2450',
      date: '2018-05-10T14:21:19.465Z'
    },
    {
      description: 'POS Metro',
      amount: '2054',
      date: '2018-07-10T14:21:19.465Z'
    },
    {
      description: 'POS Walgreens',
      amount: '1000',
      date: '2018-06-10T14:21:19.465Z'
    },
    {
      description: 'POS samsung',
      amount: '7600',
      date: '2018-09-10T14:21:19.465Z'
    },
    {
      description: 'POS twitter',
      amount: '2029',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Burger King',
      amount: '1997',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Walmart',
      amount: '2000',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS chipotle',
      amount: '1000',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Kmart',
      amount: '3000',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Macdonalds',
      amount: '400',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS alcohol stuff',
      amount: '2500',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS google',
      amount: '1200',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS apple',
      amount: '9920',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS über',
      amount: '20',
      date: '2018-10-10T14:21:19.465Z'
    },
    
    {
      description: 'Greatest Finnest',
      amount: '20226',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'sop dog',
      amount: '2660',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'stoff',
      amount: '2450',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Metro',
      amount: '2054',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Walgreens',
      amount: '1000',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS samsung',
      amount: '7600',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS twitter',
      amount: '2029',
      date: '2018-10-10T14:21:19.465Z'
    },
    {
      description: 'POS Burger King',
      amount: '1997',
      date: '2018-10-10T14:21:19.465Z'
    }
];
if (!databaseUri) {
  console.log('DATABASE_URI not specified, falling back to localhost.');
}

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js',
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || '', //Add your master key here. Keep it secret!
  serverURL: process.env.SERVER_URL || 'http://finnestworksampleserver.herokuapp.com/parse',  // Don't forget to change to https if needed
  liveQuery: {
    classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  }
});
// Client-keys like the javascript key or the .NET key are not necessary with parse-server
// If you wish you require them, you can set them as options in the initialization above:
// javascriptKey, restAPIKey, dotNetKey, clientKey

var app = express();

// Serve static assets from the /public folder
app.use('/public', express.static(path.join(__dirname, '/public')));

// Serve the Parse API on the /parse URL prefix
var mountPath = process.env.PARSE_MOUNT || '/parse';
app.use(mountPath, api);

// Parse Server plays nicely with the rest of your web routes
app.get('/', function(req, res) {
  res.status(200).send('I dream of being a website.  Please star the parse-server repo on GitHub!');
});

// There will be a test page available on the /test path of your server url
// Remove this before launching your app
app.get('/test', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/test.html'));
});

app.get('/initTransactionList', function(req, res) {
  var initTransactionList = [];
  var i;
  for(i = 0; i < 10; i++) {
    initTransactionList.push(transactionArray[i]);
  }
  res.send(initTransactionList);
});

app.get('/getNext10Transactions', function(req, res) {
  var currentIndex = parseInt(req.param('list_index'));
  var tempTransactionList = [];
  var i;
  for(i = currentIndex + 1; i < (currentIndex + 11); i++) {
    tempTransactionList.push(transactionArray[i]);
  }
  res.send(tempTransactionList);
});

var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('parse-server-example running on port ' + port + '.');
});

// This will enable the Live Query real-time server
ParseServer.createLiveQueryServer(httpServer);
