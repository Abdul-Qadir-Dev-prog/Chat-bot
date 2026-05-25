const app = require("./app");
const config = require("./config/env");

app.listen(config.port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${config.port}`);
});
