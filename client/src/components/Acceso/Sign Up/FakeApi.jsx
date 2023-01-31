const User = require("./creenme un modelo de user pls");
const bcrypt = require("bcrypt");

// Ejemplo:

/*fullname: {
  type: String,
  required: true
},
roles:{
    User: {
      type: Number,
      default: 2001
    },
    Hospedador o como lo quieran llamar tenant: Number,
    Admin: Number,
},
password:{
  type: string
  required: true
},
email:{
  etc etc etc etc
}etc
}
*/

//Acá les dejo una ruta que hice para que se puedan guiar pero es lo que necesito desde el front
router.post("/api/user/createUser", async (req, res) => {
  const { fullName, password, email } = req.body;
  if (!fullName || !password || !email)
    return res.status(400).json({
      message: "Fullname, password and email are required.",
    });

  //checkeamos por names duplicados en la db // si existe en la db o no
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.sendStatus(409); //conflict
});

try {
  //encryptamos la password
  const hashedPassword = await bcrypt.hash(password, 10);

  //creamos el nuevo usuario

  const result = await User.create({
    fullname: fullName,
    password: hashedPassword,
    email: email,
  });

  console.log(result);

  res.status(201).json({
    success: `Nuevo user ${user} creado`,
  });
} catch (err) {
  res.status(500).json({
    message: err.message,
  });
}

module.exports = "no se a donde las tienen a las routas";
