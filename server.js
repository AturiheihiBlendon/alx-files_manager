import express from "express";
import routing from "./routes/index";

const port = process.env.PORT || 5000;
const app = express();
// app.use(express.json());


routing(app);
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});
