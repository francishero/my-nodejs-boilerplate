module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

const devConfig = {
  MONGO_URL: 'mongodb://localhost:27017/my-node-boiler',
  JWT_SECRET: 'mysecretlol'
};
const testConfig = {
  MONGO_URL: 'mongodb://localhost:27017/my-node-boiler-test'
};
const prodConfig = {
  MONGO_URL: 'mongodb://localhost:27017/my-node-boiler-prod'
};
const defaultConfig = {
  PORT: process.env.PORT || 8007
};
function envConfig(env) {
  switch (env) {
    case 'development':
      return devConfig;
    case 'test':
      return testConfig;
    default:
      return prodConfig;

  }
}
exports.default = Object.assign({}, defaultConfig, envConfig(process.env.NODE_ENV));

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authjwt = exports.authLocal = undefined;

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = __webpack_require__(23);

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _passportJwt = __webpack_require__(24);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _user = __webpack_require__(5);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const localOpts = {
  //passport by default uses username and password
  //we make it use email
  usernameField: 'email'
};
//JWT


const localStrategy = new _passportLocal2.default(localOpts, async (email, password, done) => {
  try {
    const user = await _user2.default.findOne({ email });

    if (!user) {
      return done(null, false);
    } else if (!user.authenticateUser(password)) {
      //authenticateUser is coming from user.model Schema methods
      //it is used to compare the passwords
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});
//JWT
const jwtOpts = {
  //passport gets token from here
  jwtFromRequest: _passportJwt.ExtractJwt.fromAuthHeader('Authorization'),
  secretOrKey: _constants2.default.JWT_SECRET
};
const jwtStrategy = new _passportJwt.Strategy(jwtOpts, async (payload, done) => {
  try {
    //_id is unique
    const user = await _user2.default.findById(payload._id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err, false);
  }
});
//what strategy to be used by password
_passport2.default.use(localStrategy);
_passport2.default.use(jwtStrategy);

//we dont use sessions we use jwt
const authLocal = exports.authLocal = _passport2.default.authenticate('local', { session: false });
const authjwt = exports.authjwt = _passport2.default.authenticate('jwt', { session: false });

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _validator = __webpack_require__(20);

var _validator2 = _interopRequireDefault(_validator);

var _mongooseUniqueValidator = __webpack_require__(6);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

var _user = __webpack_require__(7);

var _bcryptNodejs = __webpack_require__(21);

var _jsonwebtoken = __webpack_require__(22);

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

var _post = __webpack_require__(27);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//we need the JWT_SECRET from the config

//encrypt the user password and then use compareSync to compare
const { ObjectId } = _mongoose2.default.Schema.Types;
//now we need to send a token to the user


const userSchema = new _mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    trim: true,
    validate: {
      validator(email) {
        return _validator2.default.isEmail(email);
      }, message: '{VALUE} is not a valid email'
    }
  },
  firstName: {
    type: String,
    required: [true, 'firstname is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'lastname is required'],
    trim: true
  },
  userName: {
    type: String,
    required: [true, 'username is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    minlength: [6, 'password must be longer than 6 letters'],
    validate: {
      validator(password) {
        return _user.passwordRegex.test(password);
      }, message: '{VALUE} is not a valid password'
    }
  },
  favorites: {
    posts: [{
      type: ObjectId,
      ref: 'Post'
    }]
  }
}, { timestamps: true }, { toJSON: { virtuals: true } });
//plugins
userSchema.plugin(_mongooseUniqueValidator2.default, {
  message: '{VALUE} must be unique'
});
//this is called before the save method is called
userSchema.pre('save', function (next) {
  /*we use function here so we have access to  `this`*/
  /* `this` represents the current user
  /* only encrpt the user password if it has changed */
  if (this.isModified('password')) {
    this.password = this._hashPassword(this.password);
    return next();
  }
  return next();
});

userSchema.statics = {
  list({ skip = 0, limit = 5 } = {}) {
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('favorites.posts');
  }
};

userSchema.methods = {
  //encrypt the users password and return it
  _hashPassword(password) {
    return (0, _bcryptNodejs.hashSync)(password);
  },
  authenticateUser(password) {
    //compare the password from the frontend with the one in the db
    return (0, _bcryptNodejs.compareSync)(password, this.password);
  },
  createToken() {
    return _jsonwebtoken2.default.sign({ _id: this._id }, _constants2.default.JWT_SECRET);
  },
  /*toAuthJSON is used to return a token
    add it to the end of the json returning tokens routes
   */
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`
    };
  },
  /* toJSON is used to return selected fields */
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      firstName: this.firstName,
      lastname: this.lastName,
      email: this.email

    };
  },
  _favorites: {
    async posts(postId) {
      if (this.favorites.posts.indexOf(postId) >= 0) {
        /* a Post is identified by the postId so we remove it we remove the post */
        this.favorites.posts.remove(postId);
        //the post's favoriteCount is reduced
        await _post2.default.decFavoriteCount(postId);
      } else {
        this.favorites.posts.push(postId);
        await _post2.default.incFavoriteCount(postId);
      }
      /* save the currrent state to the db */
      await this.save();
    }

  }
};
exports.default = _mongoose2.default.model('User', userSchema);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("mongoose-unique-validator");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passwordRegex = undefined;

var _joi = __webpack_require__(8);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordRegex = exports.passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
/* password must start with a capital letter and end with a number */

exports.default = {
  //the controller to do validation on
  signup: {
    email: _joi2.default.string().email().required(),
    password: _joi2.default.string().regex(passwordRegex).required(),
    firstName: _joi2.default.string().required(),
    lastName: _joi2.default.string().required(),
    userName: _joi2.default.string().required()
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("express-validation");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

__webpack_require__(11);

var _middlewares = __webpack_require__(12);

var _middlewares2 = _interopRequireDefault(_middlewares);

var _modules = __webpack_require__(17);

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//javascript will know to get index.js

const app = (0, _express2.default)();

//middleware
(0, _middlewares2.default)(app);

//routes
app.get('/', (req, res) => {
  res.json({ data: 'hello' });
});
(0, _modules2.default)(app);

const PORT = _constants2.default.PORT;
app.listen(PORT, err => {
  if (err) {
    console.log(err);
  }
  console.log(`Server running on port ${PORT}
              ********************************
              running on ${process.env.NODE_ENV}
  `);
});

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _constants = __webpack_require__(0);

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//promise error fix
_mongoose2.default.Promise = global.Promise;

try {
  _mongoose2.default.connect(_constants2.default.MONGO_URL);
} catch (err) {
  _mongoose2.default.createConnection(_constants2.default.MONGO_URL);
}
_mongoose2.default.connection.once('open', () => console.log('MONGODB connected'));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _morgan = __webpack_require__(13);

var _morgan2 = _interopRequireDefault(_morgan);

var _compression = __webpack_require__(14);

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = __webpack_require__(15);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = __webpack_require__(16);

var _helmet2 = _interopRequireDefault(_helmet);

var _passport = __webpack_require__(4);

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isDev = process.env.NODE_ENV === 'development';
const isProd = process.env.NODE_ENV === 'production';

exports.default = app => {
  if (isProd) {
    app.use((0, _compression2.default)());
    app.use((0, _helmet2.default)());
  }
  app.use(_bodyParser2.default.json());
  app.use(_bodyParser2.default.urlencoded({ extended: true })); //for postman --to use x-www-form
  app.use(_passport2.default.initialize());

  if (isDev) {
    app.use((0, _morgan2.default)('dev'));
  }
};

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("compression");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("helmet");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = __webpack_require__(18);

var _user2 = _interopRequireDefault(_user);

var _auth = __webpack_require__(3);

var _post = __webpack_require__(25);

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {
  console.log('index called');
  app.use('/api/v1/users', _user2.default);
  app.use('/api/v1/posts', _post2.default);

  //just to test jwt token
  app.use('/hello', _auth.authjwt, (req, res) => {
    res.json({
      data: 'this is route is private'
    });
  });
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _user = __webpack_require__(19);

var userController = _interopRequireWildcard(_user);

var _expressValidation = __webpack_require__(9);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _user2 = __webpack_require__(7);

var _user3 = _interopRequireDefault(_user2);

var _auth = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//the validation to use
const router = _express2.default.Router();

//before signup validation will be done

//bring passport from services


//express-validation is a way to make validation as middleware
router.route('/signup').post((0, _expressValidation2.default)(_user3.default), userController.signUp);

//test this by using the email and password of an existing user
router.route('/login').post(_auth.authLocal, userController.login);
router.route('/').get(userController.getAllUsers);
exports.default = router;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUp = signUp;
exports.login = login;
exports.getAllUsers = getAllUsers;

var _user = __webpack_require__(5);

var _user2 = _interopRequireDefault(_user);

var _httpStatus = __webpack_require__(29);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function signUp(req, res) {
  try {
    const user = await _user2.default.create(req.body);
    res.status(200).json({ data: user.toAuthJSON() });
  } catch (err) {
    res.status(500).json(err);
  }
}

async function login(req, res, next) {
  //passport has put the user in `req.user`
  res.status(200).json(req.user); //if it doesnt return token use req.user.createToken()
  return next();
}
async function getAllUsers(req, res) {
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  try {
    const users = await _user2.default.list({ limit, skip });
    res.status(_httpStatus2.default.OK).json({
      code: 0,
      data: users
    });
  } catch (err) {
    res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("validator");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("passport-jwt");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
      value: true
});

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _post = __webpack_require__(26);

var postController = _interopRequireWildcard(_post);

var _auth = __webpack_require__(3);

var _expressValidation = __webpack_require__(9);

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _post2 = __webpack_require__(30);

var _post3 = _interopRequireDefault(_post2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router(); //required to do validation on routes

router.route('/').post(_auth.authjwt, (0, _expressValidation2.default)(_post3.default.createPost), postController.createPost);

/*=================================
getPostById returns a post with the /:id
==================================*/
router.route('/:id').get(postController.getPostById);
/*=================================
getPostList returns all posts
==================================*/
router.route('/').get(postController.getPostList);
/*==================================
updatePost requires the user to be logged in
=====================================*/
router.route('/:postId').patch(_auth.authjwt, (0, _expressValidation2.default)(_post3.default.updatePost), postController.updatePost).delete(_auth.authjwt, postController.deletePost);
/*==================================
favorite a post requires user to be
logged in
=====================================*/
router.route('/:postId/favoritePost').post(_auth.authjwt, postController.favoritePost);

exports.default = router;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPost = createPost;
exports.getPostById = getPostById;
exports.getPostList = getPostList;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.favoritePost = favoritePost;

var _post = __webpack_require__(27);

var _post2 = _interopRequireDefault(_post);

var _httpStatus = __webpack_require__(29);

var _httpStatus2 = _interopRequireDefault(_httpStatus);

var _user = __webpack_require__(5);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

async function createPost(req, res) {
  try {
    //static method --- req.user._id from jwt when user is logged in
    const post = await _post2.default.createPost(req.body, req.user._id);
    res.status(201).json({
      code: 0,
      data: post
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

/*=================================
getPostById returns a post with the /:id
==================================*/
async function getPostById(req, res) {
  const id = req.params.id;
  try {
    const post = await _post2.default.findById(id).populate('user');
    res.status(200).json({
      code: 0,
      data: post
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

/*=================================
getPostList returns all posts
==================================*/
async function getPostList(req, res) {
  //query came like this {limit: '3'}
  const limit = parseInt(req.query.limit, 0);
  const skip = parseInt(req.query.skip, 0);
  try {
    const posts = await _post2.default.list({ limit, skip });
    return res.status(200).json({
      code: 0,
      data: posts
    });
  } catch (err) {
    res.status(500).json({
      code: 4,
      message: err
    });
  }
}
/*=================================
updatePost updates using patch
==================================*/
async function updatePost(req, res) {
  /* find the id of the post */
  const { postId } = req.params;
  /*find the actual post using the id */
  const post = await _post2.default.findById(postId);
  /*check if the current user is the owner of the post */
  if (!post.user.equals(req.user._id)) {
    return res.sendStatus(_httpStatus2.default.UNAUTHORIZED); //you didnt post you cant update it
  }
  /* ok lets update the fields you want */
  Object.keys(req.body).forEach(key => {
    post[key] = req.body[key];
  });
  /*now lets not forget to save your changes to the db */
  res.status(_httpStatus2.default.OK).json((await post.save()));
}
/*=================================
deletePost deletes a post with :id
==================================*/
async function deletePost(req, res) {
  const { postId } = req.params;
  const post = await _post2.default.findById(postId);
  if (!post.user.equals(req.user._id)) {
    return res.sendStatus(_httpStatus2.default.UNAUTHORIZED);
  }
  await post.remove();
  res.sendStatus(_httpStatus2.default.OK);
}
/*=================================
favoritePost toggles adding a post
to the users list of liked posts
==================================*/
async function favoritePost(req, res) {
  //api/v1/posts/:postId/favoritePost
  const { postId } = req.params;
  try {
    //find the logged in user
    const user = await User.findById(req.user._id);
    //now we need to add this postId to the users list of liked posts
    await user._favorites.posts(postId);
    res.status(_httpStatus2.default.OK);
  } catch (err) {
    res.status(_httpStatus2.default.BAD_REQUEST).json(err);
  }
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = __webpack_require__(2);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _slug = __webpack_require__(28);

var _slug2 = _interopRequireDefault(_slug);

var _mongooseUniqueValidator = __webpack_require__(6);

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { ObjectId } = _mongoose2.default.Schema.Types;

const postSchema = new _mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'the title is required'],
    minlength: [3, 'a title must be longer'],
    unique: true //so we slugify it
  },
  text: {
    type: String,
    trim: true,
    required: [true, 'post text is required'],
    minlength: [3, 'post text must be longer']
  },
  slug: {
    type: String,
    trim: true,
    lowercase: true
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  favoriteCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true }, { toJSON: { virtuals: true } });
//plugins
postSchema.plugin(_mongooseUniqueValidator2.default, {
  message: `{VALUE} must be unique`
});

//hooks
postSchema.pre('save', function (next) {
  /* `function` is used here so we can have `this` context */
  this._slugify();
  next();
});
//methods
postSchema.methods = {
  _slugify() {
    this.slug = (0, _slug2.default)(this.title);
  },
  toJSON() {
    return {
      _id: this._id,
      title: this.title,
      text: this.text,
      createdAt: this.createdAt,
      slug: this.slug,
      favoriteCount: this.favoriteCount,
      user: this.user
    };
  }
};
//statics are like static methods on a class
postSchema.statics = {
  createPost(args, user) {
    //internally we use the create method
    return this.create(Object.assign({}, args, {
      user
    }));
  },
  //pagination
  list({ skip = 0, limit = 5 } = {}) {
    //we do that to support destructing
    return this.find().sort({ createdAt: -1 }).skip(skip).limit(limit).populate('user');
  },
  //the favoriteCount function will be on the post schema itself
  incFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: 1 } });
  },
  decFavoriteCount(postId) {
    return this.findByIdAndUpdate(postId, { $inc: { favoriteCount: -1 } });
  }

};

exports.default = _mongoose2.default.model('Post', postSchema);

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = require("slug");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("http-status");

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = __webpack_require__(8);

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  createPost: {
    body: {
      title: _joi2.default.string().min(3).required(),
      text: _joi2.default.string().min(3).required()
    }
  },
  /*==========================
  validate the updated fields but not required
  =============================*/
  updatePost: {
    body: {
      title: _joi2.default.string().min(3),
      text: _joi2.default.string().min(3)
    }
  }
};

/***/ })
/******/ ]);