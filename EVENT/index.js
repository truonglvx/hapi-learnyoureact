var React = require('react');
var DOM = React.DOM;
var body = DOM.body;
var div = DOM.div;
var script = DOM.script;

var Browserify = require('browserify');

var Hapi = require('hapi');
var server = new Hapi.Server();
server.connection({ port: (process.argv[2] || 3000)});

require('node-jsx').install();
var TodoBox = require('./views/index.jsx');

var data = [
  { title: 'Shopping', detail: process.argv[3] },
  { title: 'Hair cut', detail: process.argv[4] }
];

server.route({
  method: 'GET',
  path: '/bundle.js',
  handler: function(request, reply) {
    Browserify(__dirname + '/app.js') // This is VERY necessary, otherwise you have to run from within this directory.
      .transform('reactify')
      .bundle(reply)
  }
});

server.route({
  method: 'GET',
  path: '/{p*}',
  handler: function(request, reply) {
    var initialData = JSON.stringify(data);
    var markup = React.renderToString(React.createElement(TodoBox, {data: data}));

    var html = React.renderToStaticMarkup(body(null,
        div({id: 'app', dangerouslySetInnerHTML: {__html: markup}}),
        script({id: 'initial-data',
                type: 'text/plain',
                'data-json': initialData
              }),
        script({src: '/bundle.js'})
    ));

    return reply(html)
  }
});

server.start(function() { console.log('server running...') });
