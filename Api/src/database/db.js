import Sequelize from "sequelize";

const sequelize = new Sequelize("", {
  logging: false,
});

export default sequelize;
