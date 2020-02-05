"use strict";

module.exports = (app, server) => {
    //app.use("/user", require("./routes/user")());
    app.use("/dest", require("./routes/dest")());
    app.use("/bags", require("./routes/bags")());
    app.use("/info", require("./routes/info")());
    app.use("/laptops", require("./routes/laptops")());
};
