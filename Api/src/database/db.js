import Sequelize from "sequelize";

const sequelize = new Sequelize(
  //"postgres://itdnwfxe:IuRTXnrtJTsdSuw3we5ArdeQ9_ctVbvU@fanny.db.elephantsql.com/itdnwfxe",
  "postgres://sviywdng:xc_heMH1CaiID56vrtpDCI2QXMKMx8Zt@baasu.db.elephantsql.com/sviywdng",
  {
    logging: false,
  }
);

export default sequelize;
