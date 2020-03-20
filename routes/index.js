var express = require('express');
var router = express.Router();
var multer = require('multer');
var path   = require('path');
const auth = require('../middleware/auth')

const categoryController = require('../controllers').category;
const userController = require('../controllers').user;
const authController = require('../controllers').auth;
const articleController = require('../controllers').article;
const newsController = require('../controllers').news;
const companyController = require('../controllers').company;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Auth Router */
router.post('/api/auth/login', authController.login);

/* User Router */
router.get('/api/user', auth, userController.read);
router.get('/api/user/:id', auth, userController.edit);
router.post('/api/user', auth, userController.create);
router.put('/api/user/:id', auth, userController.update);
router.delete('/api/user/:id', auth, userController.delete);

/* Category Router */
router.get('/api/category', auth, categoryController.read);
router.get('/api/category/:id', auth, categoryController.edit);
router.post('/api/category', auth, categoryController.create);
router.put('/api/category/:id', auth, categoryController.update);
router.delete('/api/category/:id', auth, categoryController.delete);

/* article apploud image */
var storageArticle = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname+'./../public/images/article/'))
  },
  filename: function (req, file, cb) {
    cb(null, "article-" + Date.now() + "-" + file.originalname)
  } 
})
var uploadArticle = multer({ storage: storageArticle});
/* Article Router */
router.get('/api/article', auth, articleController.read);
router.get('/api/article/:id', auth, articleController.edit);
router.post('/api/article', auth, articleController.create);
router.put('/api/article/:id', auth, articleController.update);
router.delete('/api/article/:id', auth, articleController.delete);
router.post('/api/article/upload/:id',  auth, uploadArticle.single('image'), articleController.upload);

/* news apploud image */
var storageNews = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname+'./../public/images/news/'))
  },
  filename: function (req, file, cb) {
    cb(null, "news-" + Date.now() + "-" + file.originalname)
  } 
})
var uploadNews = multer({ storage: storageNews});
/* News Router */
router.get('/api/news', auth, newsController.read);
router.get('/api/news/:id', auth, newsController.edit);
router.post('/api/news', auth, newsController.create);
router.put('/api/news/:id', auth, newsController.update);
router.delete('/api/news/:id', auth, newsController.delete);
router.post('/api/news/upload/:id',  auth, uploadNews.single('image'), newsController.upload);

/* company apploud image */
var storageCompany = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname+'./../public/images/company/'))
  },
  filename: function (req, file, cb) {
    cb(null, "company-" + Date.now() + "-" + file.originalname)
  } 
})
var uploadCompany = multer({ storage: storageCompany});
/* Company Router */
router.get('/api/company', auth, companyController.read);
router.get('/api/company/:id', auth, companyController.edit);
router.post('/api/company', auth, companyController.create);
router.put('/api/company/:id', auth, companyController.update);
router.delete('/api/company/:id', auth, companyController.delete);
router.post('/api/company/upload/:id',  auth, uploadCompany.single('image'), companyController.upload);


module.exports = router;
