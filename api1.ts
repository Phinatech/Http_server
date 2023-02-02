import http, { IncomingMessage, ServerResponse } from "http";

const Port = 2025;

interface DATA {
  message: string;
  sucess: boolean;
  data: {}[] | null | {};
}

interface IData {
  id: number;
  name: string;
}

let Status = 404;
let result: DATA = {
  message: "failed",
  sucess: false,
  data: null,
};

let dataSet: IData[] = [{ id: 1, name: "judith" }];

let body: any = [];

const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse<IncomingMessage>) => {
    const { url, method } = req;
    res.setHeader("Content-Type", "application/json");

    

    

    req.on("data", (chunk) => {
      body.push(chunk);
      console.log(chunk);

      // console.log(body);
    });

    req.on("end", () => {
      if (url === "/" && method === "GET") {
        Status = 200;
        result.message = "Found message";
        result.sucess = true;
        result.data = dataSet;
      }
      //This is for single get
      //       if (method === "GET") {
      // const getID: string | undefined = url?.split("/")[1];

      //         Status = 200;
      //         result.message = "Found message";
      //         result.sucess = true;
      //         result.data = dataSet;
      //       }

      //THis is for the post  method
      if (url === "/" && method === "POST") {
        const getID: string | undefined = url?.split("/")[1];

        Status = 201;
        result.message = "create Entry";
        result.sucess = true;
        result.data = dataSet;
      }

      //This is for the delete method
      if (method === "DELETE") {
        const getID: string | undefined = url?.split("/")[1];

        const getIDs = parseInt(getID!);
        if (getIDs <= dataSet.length) {
          dataSet = dataSet.filter((el) => el.id !== getIDs);

          Status = 201;
          result.message = "Entry Deleted";
          result.sucess = true;
          result.data = dataSet;
        } else {
          Status = 404;
          result.message = "no id found";
          result.sucess = true;
          result.data = dataSet;
        }
      }

      //This is the Update
      if (method === "PATCH") {
        const getID: string | undefined = url?.split("/")[1];

        const getIDs = parseInt(getID!);
        if (getIDs <= dataSet.length) {
          dataSet = dataSet.filter((el) => el.id !== getIDs);

          Status = 201;
          result.message = "Entry Deleted";
          result.sucess = true;
          result.data = dataSet;
        } else {
          Status = 404;
          result.message = "no id found";
          result.sucess = true;
          result.data = dataSet;
        }
      }

      res.end(JSON.stringify({ Status, result }));
    });
  }
);

server.listen(Port, () => {
  console.log("");
  console.log("Lets do it again");
  console.log("");
});
