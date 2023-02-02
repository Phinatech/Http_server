import { Console } from "console";
import http, { IncomingMessage, ServerResponse } from "http";
const PORT: number = 2022;

const server = http.createServer(
  (req, res): void => {
    res.writeHead(200);
    res.write("My eyes have seen a lot in codelab");
    res.end();
  }
);

server.listen(PORT, () => {
  console.log(`Listening to PORT: ${PORT}`);
});

// import http, { IncomingMessage, ServerResponse } from "http";
// const port: number = 2022;

// const server = http.createServer((req, res) => {
//   res.writeHead(200);
//   res.write("This is my first server");
//   res.end();
// });

// server.listen(port, () => {
//   console.log(`lstening to our server: ${port}`);
// });
