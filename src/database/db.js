import mongoose from "mongoose";
import config from "../config";
(async () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(config.mongodbURL, {})
    .then((db) => console.info(db.connection.name))
    .catch((error) => console.error(error));
})();
