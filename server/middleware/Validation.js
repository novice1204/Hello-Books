import bcrypt from 'bcrypt';
import omit from 'lodash/omit';

import database from '../models/index';

const { Book, User } = database;

const Validation =  {

  /**
   * 
   * @description - Validates User Input
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @param {Object} next - call back function
   * 
   * @returns {Object} - Object containing error message
   */
  checkUserInput(req, res, next) {
    const userNameError = 'Please provide a '
    + 'username with atleast 4 characters.';

    req.checkBody({
      username: {
        notEmpty: true,
        isLength: {
          options: [{ min: 4 }],
          errorMessage: userNameError
        },
        errorMessage: 'Your Username is required'
      },
      email: {
        notEmpty: true,
        isEmail: {
          errorMessage: 'Provide a valid a Email Adrress'
        },
        errorMessage: 'Your Email Address is required'
      },
      fullName: {
        notEmpty: true,
        errorMessage: 'Your Fullname is required'
      },
      password: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: 'Provide a valid password with minimum of 8 characters'
        },
        errorMessage: 'Your Password is required'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        allErrors.push({
          error: error.msg
        });
      });
      return res.status(400).json(allErrors);
    } else {
      User.findOne({
        where: {
          username: req.body.username,
          $or: {
            email: req.body.email
          }
        }
      }).then((user) => {
        if (user) {
          if (user.email === req.body.email) {
            return res.status(409).send({
              message: 'Email already exist'
            });
          } else if (user.username === req.body.username) {
            return res.status(409).send({
              message: 'Username already exist'
            });
          }
        }
      });
    }

    const password = bcrypt.hashSync(req.body.password, 10); // encrypt password
    req.userInput = {
      username: req.body.username,
      fullName: req.body.fullName,
      email: req.body.email,
      password,
      plan: req.body.plan
    };
    next();
  },

  /**
   * 
   * @description - Validates User Input when adding book 
   * 
   * @param {Object} req - request
   * 
   * @param {Object} res - response
   * 
   * @param {Object} next - call back function
   * 
   * @returns {Object} - Object containing error message
   */
  checkBookInput(req, res, next) {
    const bookError = 'Please provide a book title with atleast 5 characters.';
    req.checkBody({
      title: {
        notEmpty: true,
        isLength: {
          options: [{ min: 5 }],
          errorMessage: bookError
        },
        errorMessage: 'Book title is required'
      },
      isbn: {
        notEmpty: true,
        errorMessage: 'ISBN is required'
      },
      prodYear: {
        notEmpty: true,
        errorMessage: 'Production Year is required'
      },
      cover: {
        notEmpty: true,
        errorMessage: 'Please upload a valid book cover'
      },
      author: {
        notEmpty: true,
        errorMessage: 'Please add book author'
      },
      description: {
        notEmpty: true,
        errorMessage: 'Please add book description'
      },
      total: {
        notEmpty: true,
        errorMessage: 'Please add total book'
      },
      catId: {
        notEmpty: true,
        errorMessage: 'Please add book category'
      }
    });
    const errors = req.validationErrors();
    if (errors) {
      const allErrors = [];
      errors.forEach((error) => {
        const errorMessage = error.msg;
        allErrors.push(errorMessage);
      });
      return res.status(409).json({
        message: allErrors[0]
      });
    }
    req.userInput = {
      title: req.body.title,
      isbn: req.body.isbn,
      prodYear: req.body.prodYear,
      cover: req.body.cover,
      author: req.body.author,
      description: req.body.description,
      catId: req.body.catId,
      total: req.body.total
    };
    next();
  },

  /** 
   * @description - Check quantity of book in the DB
   * 
   * @param  {Object} req - request
   * 
   * @param  {object} res - response
   * 
   * @param {Object} next - Call back function
   * 
   * @return {Object} - Object containing message
   */
  checkTotalBook(req, res, next) {
    Book.findOne({
      where: {
        id: req.body.bookId
      }
    }).then((book) => {
      if (book.total < 1) {
        res.status(200).send({
          message: 'This book is not available for rent!'
        });
      } else {
        next();
      }
    });
  },

  /** 
   * @description - Checks if a user already exist using username
   * 
   * @param  {Object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - Object containing message
   */
  userExist(req, res) {
    const validator = /[0-9]{2,}/;
    const validator2 = /[\W]{2,}/;
    if (validator.test(req.body.username)
      || validator2.test(req.body.username)) {
      return res.status(400).send({
        message: 'Invalid Username supplied!'
      });
    }
    return User.findOne({
      where: {
        username: req.body.username
      }
    })
      .then((user) => {
        if(user){
          if (user.username !== req.params.username) {
            return res.status(409).send({ message: 'username already exist' });
          }
        }
        return res.status(404).send({ message: '' });
      })
      .catch(error => res.status(500).send({ error }));
  },


  /** 
   * @description - Checks if an email address already exist
   * 
   * @param  {Object} req - request
   * 
   * @param  {object} res - response
   * 
   * @return {Object} - Object containing message
   */
  emailExist(req, res) {
    const regularExpression = /\S+@\S+\.\S+/;
    const emailValidate = regularExpression.test(req.body.email);

    if (!emailValidate) {
      return res.status(200).send({ status: true, 
        message: 'Invalid email supplied' });
    }

    return User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
       if(user){
        if (req.body.userId && user.id !== req.body.userId) {
          return res.status(200).send({
            status: true,
            message: 'Email already exist'
          });
        } else if(req.body.userId && user.id === req.body.userId){
            const currentUser = omit(user.dataValues, [
              'password',
              'createdAt',
              'updatedAt'
            ]);
            return res.status(200).send({
              status: true,
              user: currentUser,
              message: ''
            });
        } else {
            const currentUser = omit(user.dataValues, [
              'password',
              'createdAt',
              'updatedAt'
            ]);
            return res.status(200).send({
              status: true,
              message: 'Email already exist',
              user: currentUser
            });
        }
       } 
       else {
        return res.status(200).send({ status: false, message: '' });
       }
      })
      .catch(error => res.status(500).send({ error }));
  },

  /** 
   * @description - Checks for validity of book
   * 
   * @param  {Object} req - request
   * 
   * @param  {object} res - response
   * 
   * @param {Object} next - Call back function
   * 
   * @return {Object} - Object containing message
   */
  validBook(req, res, next) {
    const querier = req.body.bookId || req.params.bookId;
    if (!querier || /[\D]/.test(querier)) {
      res.status(400).send({
        message: 'Invalid book id supplied!!!'
      });
    } else {
      Book.findOne({
        where: {
          id: req.params.bookId || req.body.bookId
        }
      }).then((book) => {
        if (!book) {
          res.status(400).send({
            message: 'Book id is not valid'
          });
        } else {
          next();
        }
      });
    }
  }
};

export default Validation;
