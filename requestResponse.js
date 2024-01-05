const http = require("http");

const server = http.createServer((req, res) => {
  let url = req.url;
  if (url === "/home") {
    res.write("<h1>Welcome Home</h1>");
  } else if (url === "/about") {
    res.write("<h1>Welcome to About Us Page</h1>");
  } else if (url === "/node") {
    res.write("<h1>Welcome to my nodejs project</h1>");
  } else {
    res.write("<h1>This page cant be accessed</h1>");
  }
});

server.listen(3000);
