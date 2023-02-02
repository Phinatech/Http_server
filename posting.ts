import http from "https";
import fs from "fs";
import path from "path";
import stream from "stream";

const URL: string = "https://api.github.com/users/PetxCode";

const URL2: string = "https://fakestoreapi.com/products";

const URL3: string =
  "https://api.nasa.gov/planetary/apod?api_key=OLObe95VSJjhi4EK1BulUVnrJOtJbPVq5o7XWBqe";

const app = http.createServer((req, res) => {
  const { method, url } = req;
  if (method === "GET" && url === "/" && res.statusCode === 200) {
    http.get(URL2, (response) => {
      let data = "";
      let pix = new stream.Transform();

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        let results = JSON.parse(data);
        let value: number = Math.floor(Math.random() * results.length);

        let result = results[value].image;
        console.log(result);

        if (result.statusCode === 200) {
          http.get(result, (res) => {
            res.on("data", (chunk) => {
              pix.push(chunk);
            });
            console.log("getting PIX");

            res.on("end", () => {
              let name = Date.now();
              let file = path.join(__dirname, "/image", `${name}.jpg`);

              console.log("Reading PIX");

              fs.writeFileSync(file, pix.read());
            });
          });
        }
      });
    });
  }
});

app.listen(2021, () => {
  console.log(" ");
  console.log("server is up and running!");
});
