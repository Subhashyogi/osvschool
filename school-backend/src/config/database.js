import { Sequelize } from "sequelize";

const sequelize = new Sequelize("osvschool", "osvschool", "oSvScH#15@14", {
  host: "148.66.138.203",
  dialect: "mysql",
  logging: false,
  dialectOptions: {
    connectTimeout: 60000
  }
});

// Test database connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established successfully.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};

// Call the test function
testConnection();

export default sequelize;
