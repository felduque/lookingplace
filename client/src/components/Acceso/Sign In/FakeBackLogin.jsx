const User = require("el modelo de user que crearon o si no creenlo");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Authenticación del usuario mediante el token y rol correspondiente.

//Todavía no empiezo el login pero es para que vean y lo tengan listo para cuando lo necesite xD

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" });

  // muy similar al del register verdad? ojo con el sendStatus es importante que me retornen dicho status 401
  const foundEmail = await User.findOne({
    email: email,
  }).exec();
  if (!foundEmail) return res.sendStatus(401); //Unauthorized

  //evaluamos la password
  const match = await bcrypt.compare(password, foundEmail.password);

  if (match) {
    const roles = Object.values(foundEmail.roles).filter(Boolean);
    //Creamos JWTs
    const accessToken = jwt.sign(
      //De dónde viene? de: "jsonwebtoken"
      {
        userInfo: {
          email: foundEmail.email,
          roles: roles,
        },
      },
      proccess.env.ACCESS_TOKEN_SECRET, //Esto lo sacamos de     console.cloud
      { expiresIn: "10s" } //A definir
    );

    //Posibilidad de agregar refresh token a futuro (viendo);

    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401); //Insisto con los status de errores deben ser los mismos pls :)
  }
});

//hacen el module. exports = " no se a donde, ustedes verán";

//Qué opinan?
