var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');

http.createServer(function(req, res) {
  var urlPath = decodeURIComponent(url.parse(req.url).pathname.substr(1));
  console.log(urlPath);
  if (!urlPath || urlPath === '') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(fs.readFileSync(path.join(__dirname, 'index.html')));
  } else {
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(parseDate(urlPath));
  }
  res.end();
}).listen(process.env.PORT || 8000);

function parseDate(date) {
  var unix, natural;
  if (date.match(/^[0-9]{1,14}$/)) {
    unix = parseInt(date, 10);
    natural = new Date(parseInt(date, 10) * 1000);
  } else {
    natural = new Date(date);
    unix = natural.getTime() / 1000;
  }
  return JSON.stringify({
    unix: unix,
    natural: natural.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  });
}
