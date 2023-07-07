const express = require("express");
const PORT = process.env.PORT || 3000;

const app = express();

const rootPath = `${__dirname}/dist`;

app.use(express.static(rootPath));

app.get("/*", (req, res) => {
  res.sendFile(`${rootPath}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Port: ${PORT}`);
});
