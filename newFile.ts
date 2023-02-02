console.log(" ");

import http from "http";

let data = [
  { id: 1, name: "Peter", stack: "small stack" },
  { id: 2, name: "Gideon", stack: "project manager" },
  { id: 3, name: "Mr Joe", stack: "full stack" },
];

let myData = "I am ready to punch";

const app = http.createServer(
  (
    req: http.IncomingMessage,
    res: http.ServerResponse<http.IncomingMessage>
  ) => {
    if (req.method === "GET" && req.url === "/" && res.statusCode === 200) {
      res.setHeader("Content-Type", "application/json");

      res.write(JSON.stringify(data));
      res.end();
    }
    res.end();
  }
);

app.listen(2025, () => {
  console.log("we are ready to punch");
});
