import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

// Import model functions
const Gallery = (await import("./Gallery.js")).default;
const User = (await import("./User.js")).default;
const Faculty = (await import("./Faculty.js")).default;
const Testimonial = (await import("./Testimonial.js")).default;

const models = {
  Gallery: Gallery(sequelize, Sequelize.DataTypes),
  User: User(sequelize, Sequelize.DataTypes),
  Faculty: Faculty(sequelize, Sequelize.DataTypes),
  Testimonial: Testimonial(sequelize, Sequelize.DataTypes),
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export { sequelize };
export default models;
