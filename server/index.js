const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./Models/Users');
const port= 3001
require('dotenv').config();
const mongoURI = process.env.MONGODB_URI;

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données //*****************************//

mongoose.connect(mongoURI)
  .then(() => console.log("Connexion à la base de données réussie"))
  .catch((err) => console.error("Erreur de connexion à la base de données :", err));


// 01 /  RETURN ALL USERS ***********************************************************************************

app.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json({ msg: "RETURN ALL USERS", users });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error });
  }
});

  

// 02 / POST :  ADD A NEW USER TO THE DATABASE // ***********************************************************


app.post("/createUser",async(req,res)=>{
    
  try {
      const user= await UserModel.create(req.body)
      res.status(201).json({msg:"User created",user})
  } catch (error) {
      res.status(500).json({msg:"Something went wrong ",err:error})
  }
  
  })


// 03 / PUT : EDIT A USER BY ID ****************************************************************************
  
app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Vérifier si l'utilisateur existe //
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Mettre à jour les champs de l'utilisateur //
    user.name = name;
    user.email = email;
    user.age = age;

    // Sauvegarder les modifications dans la base de données //

    await user.save();

    res.status(200).json({ msg: "User updated", user });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong", error });
  }
});

// 04 / DELETE : REMOVE A USER BY ID *******************************************************************

app.delete("/deleteUser/:id", async (req, res) => {
  try {
      console.log(req.params.id)
      
      const UserDeleted= await UserModel.findByIdAndDelete(req.params.id)

      res.status(200).json({msg:"UserDeleted"})
  } catch (error) {
      res.status(500).json({msg:"Something went wrong ",err:error})
  }
  
  })
  



// Lancement du server****************************************************************************

app.listen(port, (err) => {
  err ? console.log("error:", err) : console.log("server is running in port:", port);
});
