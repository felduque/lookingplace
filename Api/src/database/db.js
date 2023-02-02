import Sequelize from "sequelize";
const sequelize = new Sequelize("", {
  logging: false,
});
=======
const sequelize = new Sequelize(
  "postgres://itdnwfxe:IuRTXnrtJTsdSuw3we5ArdeQ9_ctVbvU@fanny.db.elephantsql.com/itdnwfxe",
  {
    logging: false,
  }
);


export default sequelize;
