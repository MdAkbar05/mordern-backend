import express, { Router, static as static_, urlencoded } from "express";
import rateLimit from "express-rate-limit";
const app = new express();
import morgan from "morgan";

import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";

import xss from "xss-clean";
import hpp from "hpp";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import path from "path";

import router from "./routes/api.js";
import { dbUrl } from "./secret.js";

//let URL="mongodb://localhost:27017/ecom4"
//let option={user:'',pass:"",autoIndex:true};
mongoose
  .connect(dbUrl)
  .then((res) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.set("etag", false);
app.use("/api/v1", router);

app.use(express.static("client/dist"));

// Add React Front End Routing
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

export default app;
