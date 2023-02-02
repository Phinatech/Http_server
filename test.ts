// let numb: number = 2;
// // if (numb < 1) {
// //   console.log(" numb is less than 1");
// // } else {
// //   console.log("Numb is greater than 1");
// // }

// switch (numb < 1) {
//   case numb > 1:
//     console.log("Number is greater than 1");
//     break;

//   default:
//     console.log("Number is less than 1");
//     break;
// }

import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs";
import path from "path";

const PORT: number = 2022;

const server = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<IncomingMessage>
  ): void => {
    res.setHeader("content-type", "text/html");
    res.statusCode = 200;
    // res.end("<h1>This is our server</h1>")

    let viewpage: string = "pages/";
    switch (req.url) {
      case "/":
        viewpage += "home.html";
        break;

      case "/about":
        viewpage += "about.html";
        res.statusCode = 200;
        break;

      case "/contact":
        viewpage += "contact.html";
        res.statusCode = 200;
        break;
      case "/product":
        // viewpage += "contact.html";

        res.statusCode = 301;
        res.setHeader("Location", "/contact");
        break;

      case "/service":
        viewpage += "service.html";
        res.statusCode = 200;
        break;

      default:
        viewpage += "404.html";
        res.statusCode = 404;
        break;
    }

    fs.readFile(path.join(__dirname, viewpage), (err, data) => {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.write(data);
        res.end();
      }
    });
  }
);

server.listen(PORT, () => {
  console.log("server is now up and running");
});
