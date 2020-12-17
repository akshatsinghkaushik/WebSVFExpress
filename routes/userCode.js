module.exports = (app) => {
  app.post('/', (req, res) => {
    console.log(req.body.code);
    res.status('201').send({
      data: req.body.code,
      message: 'code added to database',
    });
  });
};
