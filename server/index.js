const express = require("express");
const cors = require("cors");
const app = express();
const CarModel = require("./models/car.model");

//Conect to Database
const connectToDataBase = require("./database/db");
connectToDataBase();

app.use(cors());
app.use(express.json());

app.get("/carros", async (req, res) => {
  try {
    const cars = await CarModel.find({});
    res.status(200).json(cars);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get('/carros/:id', async (req,res)=>{
  try{
    const id = req.params.id;

    const car = await CarModel.findById(id);

    return res.status(200).json(car)
  }catch(err){
    return res.status(500).send(err.message)
  }
})

app.post("/carros", async (req, res) => {
    try {
      const car = await CarModel.create(req.body);
  
      res.status(201).json(car);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
