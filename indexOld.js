const http = require("http");

const app = http.createServer((req, resp) => {
  resp.writeHead(200, {"Content-type":"application/json"})
  resp.write(JSON.stringify({name:"Gaaaaaaaaa","lastName":[1,2,3,4,5,6,7,8,9,0],"lastName2":[1,2,3,4,5,6,7,8,9,0]}));
  resp.end();
});

const PORT = 8080;

app.listen(PORT);

console.log("Server is running on localhost at 8080");
