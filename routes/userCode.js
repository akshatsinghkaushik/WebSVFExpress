module.exports = (app) => {
  app.post('/', (req, res) => {
    console.log(req.body.code);
    res.status('201').send(req.body.code);
  });
};
