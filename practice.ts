import local, { IncomingMessage, ServerResponse } from "http";

import http from "https";
import stream from "stream";
import fs from "fs";
import path from "path";

const URL: string =
  "https://api.nasa.gov/planetary/apod?api_key=0gidXgPFbMzXLmfIf1EvstBR4RW5aXIWBeLbzJSG";

const app = local.createServer(
  (req: IncomingMessage, res: ServerResponse<IncomingMessage>) => {
    const { method, url } = req;

    if (method === "GET" && url === "/images") {
      http.get(URL, (res) => {
        let global = "";
        res.on("data", (chunk) => {
          global += chunk;
          console.log(global);
        });

        res.on("end", () => {
          let result = JSON.parse(global).url;
          console.log(result);

          http.get(result, (resp) => {
            let img = new stream.Transform();
            resp.on("data", (chunk) => {
              img.push(chunk);
              // console.log(img)
            });

            res.on("end", () => {
              let file = path.join(__dirname, "./image", "nasa.png");
              fs.writeFileSync(file, img.read());
            });
          });
        });
      });
    }
    res.end();
  }
);

app.listen(2020, () => {
  console.log("done");
});
