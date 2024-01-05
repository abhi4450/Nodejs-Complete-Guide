const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    // Read the content of "message.txt"
    fs.readFile("message.txt", "utf8", (err, content) => {
      if (err) {
        console.error(err);
      }

      // HTML form with the stored message
      res.write("<html>");
      res.write("<head><title>Enter Message</title></head>");
      res.write("<body>");

      // Display stored message, if available
      if (content) {
        res.write("<p>Stored Message: " + content + "</p>");
      }

      // Form for new messages
      res.write(
        "<form action='/message' method='POST'><input type='text' name='message'/>"
      );
      res.write("<button type='submit'>Send</button></form>");
      res.write("</body>");
      res.write("</html>");
      return res.end();
    });
    // res.write("<html>");
    // res.write("<head><title>Enter Message</title></head>");
    // res.write(
    //   "<body><form action='/message' method='POST'><input type ='text' name ='message'/>  <button type='submit'>Send</button></form ></body >"
    // );
    // res.write("</html>");
    // return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
});

server.listen(3000);
