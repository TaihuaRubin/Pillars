'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

const User = require('./user');

//---------VVVV---------  your code below  ---------VVV----------

const Article = db.define('article', {
  title:{
    type: Sequelize.STRING,
    allowNull:false,
    validate:{
      notEmpty:true,
    }

  },
  content:{
    type:Sequelize.TEXT,
    allowNull:false
  }

});

//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
