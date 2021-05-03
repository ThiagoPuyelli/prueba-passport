const express = require("express");
const config = require("./app");

const app = config(express());

app.listen(app.get("port"), (connect) => console.log("Connect to port " + app.get("port")))