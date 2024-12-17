import app from "./app.js";
import { serverPort } from "./secret.js";

app.listen(serverPort, function () {
  console.log(`App Run http://localhost:${serverPort}`);
});
