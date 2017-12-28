var webpack = require("webpack"),
    config = require("../webpack.prod");

require("./prepare");

webpack(
  config,
  function (err) { if (err) throw err; }
);
