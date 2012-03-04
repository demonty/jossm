var handler = require("./CHandler");
var app = require("express").createServer();
var io = require("socket.io");

io = io.listen(app);
app.listen(8081);

io.sockets.on('connection', function(socket){
   handler.addUser("WS", socket);
   
   socket.on('message', function(msg){
      handler.onMessage(msg);
   });
   
   socket.on('disconnect', function(){
      handler.removeUser("WS", socket);
   });
});

console.log("websocket server listening on port 8081");

OmegaSessionDefinition = function(){
   handler.createSession("Omega", "", ["gunner", "pilot"]);
   
   var _onOpen = function(){
      console.log("onOpen function called!");
   };
   
   handler.setSessionOnEvent("Omega", "open", _onOpen);

   handler.setPersistent("Omega", "false");
};
OmegaSessionDefinition();