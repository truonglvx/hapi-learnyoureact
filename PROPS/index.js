var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: (process.argv[2] || 3000)});

server.views({
  engines: { jsx: require('hapi-react-views') },
  relativeTo: __dirname,
  path: './views'
});

server.route({
  method: 'GET',
  path: '/{p*}',
  handler: function(request, reply) {

    reply.view('index')
  }
});

server.start(function() { console.log('server running...') });
