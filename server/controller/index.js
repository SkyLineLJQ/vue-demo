module.exports = {
    index (req, res, next) {
      console.log('controller')
      res.render('index', { title: 'Express' });
    }
  }