import "./loadEnvironment.js";
import createDebug from "debug";
import chalk from "chalk";
import app from "./server/index.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("collectopia-api:root");

const port = process.env.PORT ?? 4000;

const mongodbConnection = process.env.MONGODB_CONNECTION!;

app.listen(port, () => {
  debug(chalk.bgGreenBright(`Listening on http://localhost:${port}`));
});

if (!mongodbConnection) {
  debug(chalk.red("Oops! Check the environment variables!"));
  process.exit(1);
}

try {
  await connectToDatabase(mongodbConnection);
  debug(chalk.bgGreenBright("Connected to database"));
} catch (error) {
  debug(`Connection error: ${chalk.red(error.message)}`);
}
