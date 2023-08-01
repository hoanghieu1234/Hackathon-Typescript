import bodyParser from "body-parser";
import express from "express";
import cors from "cors";

const app = express();
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
// Router

// Handle errors
export default app;
