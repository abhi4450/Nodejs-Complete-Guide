const http = require("http");

const server = http.createServer((req, res) => {
    res.end("Abhishek Kumar Gupta");
});

server.listen(3000);
