const express = require("express");
const app = express();
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const students = [
  {
    name: "Sandi",
    email: "sandi@example.com",
    city: "New York",
    country: "USA"
  },
  {
    name: "Sucahyo",
    email: "sucahyo@example.com",
    city: "San Francisco",
    country: "USA"
  }
]
app.get("/generate-pdf", (req, res) => {
  ejs.renderFile(path.join(__dirname, './', "template.ejs"), { students: students }, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      const options = {
        "height": "11.25in",
        "width": "8.5in",
        "header": {
          "height": "20mm"
        },
        "footer": {
          "height": "20mm",
        },
      };
      pdf.create(data, options).toFile("report.pdf", function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send("File created successfully");
        }
      });
    }
  });
})
app.listen(3000);