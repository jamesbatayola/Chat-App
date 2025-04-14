// index.js (ES module version)
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url"; // 🧠 you need this!
import { Sequelize } from "sequelize";
import configFile from "../config/config.js";

// __filename and __dirname replacement in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = configFile[env];

// Container for models
const db = {};

// Initialize Sequelize instance using config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Dynamically import and initialize all model files
const files = fs.readdirSync(__dirname);

for (const file of files) {
  if (
    file.indexOf(".") !== 0 &&
    file !== basename &&
    file.endsWith(".js") &&
    !file.endsWith(".test.js")
  ) {
    // Dynamic import for each model file
    const modelModule = await import(
      pathToFileURL(path.join(__dirname, file)).href
    );
    const model = modelModule.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

// Setup model associations
for (const modelName of Object.keys(db)) {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
}

// Export Sequelize instance and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
