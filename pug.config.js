const path = require("path");
const fs = require("fs");

const srcDataDir = path.join(__dirname, "src", "data");

module.exports = {
  locals: Object.fromEntries(
    fs
      .readdirSync(srcDataDir)
      .filter((fileName) => path.parse(fileName).ext === ".js")
      .map((fileName) => [
        path.parse(fileName).name,
        require(path.join(srcDataDir, fileName)),
      ])
  ),
};
