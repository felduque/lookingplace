import sequelize from "./src/database/db.js";
import app from "./src/app.js";
const port = 3000;

async function start() {
  try {
    await sequelize.sync({ force: true });
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
