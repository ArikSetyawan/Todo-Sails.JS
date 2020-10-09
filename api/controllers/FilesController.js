const path = require("path");
const fs = require("fs");

module.exports = {
  send_image: async (req, res) => {
    // get params
    const params = req.query;
    if (!params.filename) {
      return res.json({ message: "Please Include Filename Parameter" });
    } else {
      try {
        const file = path.join(
          __dirname,
          "../",
          "../",
          "assets",
          "images",
          params.filename
        );
        if (fs.existsSync(file)) {
          return res
            .status(200)
            .sendFile(
              path.join(
                __dirname,
                "../",
                "../",
                "assets",
                "images",
                params.filename
              )
            );
        } else {
          return res.json({ message: "file not found Error" });
        }
      } catch (error) {
        console.log(error);
        return res.json({ message: "Error" });
      }
    }
  },
};
