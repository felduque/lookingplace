import Sequelize from "sequelize";

const sequelize = new Sequelize(
  "postgres://qgkajrlr:N8RxTLqSbOGGWvhM7wUG4_sCTRLQlr85@chunee.db.elephantsql.com/qgkajrlr",
  {
    logging: true,
  }
);

export default sequelize;
