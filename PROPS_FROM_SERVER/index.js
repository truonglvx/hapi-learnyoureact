var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: (process.argv[2] || 3000)});

server.views({
  engines: { jsx: require('hapi-react-views') },
  relativeTo: __dirname,
  path: './views'
});

var data = [
  { title: 'Shopping', detail: process.argv[3] },
  { title: 'Hair cut', detail: process.argv[4] }
]

server.route({
  method: 'GET',
  path: '/{p*}',
  handler: function(request, reply) {

    reply.view('index', { data: data })
  }
});

server.start(function() { console.log('server running...') });
