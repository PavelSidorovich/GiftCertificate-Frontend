const express = require("express");
const path = require("path");
const { api } = require("./js/api");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(__dirname));

const createPath = (page) => path.resolve(__dirname, "views", `${page}.ejs`);

app.listen(port, (error) => {
  error ? console.log(error) : console.log(`listening port ${port}`);
});

app.get("/certificates", (req, res) => {
  const page = req.query.page;
  const size = req.query.size;
  const certName = req.query.certName;
  const tagName = req.query.tagName;
  const description = req.query.description;
  const sortByCreateDate = req.query.sortByCreateDate;
  const sortByName = req.query.sortByName;

  api
    .getCertificates({
      page: page,
      size: size,
      certName: certName,
      tagName: tagName,
      description: description,
      sortByCreateDate: sortByCreateDate,
      sortByName: sortByName,
    })
    .then((apiRes) => {
      const loadedCertificates = apiRes.data;
      res.json(loadedCertificates);
    })
    .catch((error) => {
      setError(error);
      setIsloading(false);
    });
});

app.get("/", (req, res) => {
  res.render(createPath("index"));
});
