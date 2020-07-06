'use strict';

const db = require('./database');
const Sequelize = require('sequelize');

// Make sure you have `postgres` running!

const User = require('./user');
const { get } = require('../routes');

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
    allowNull:false,
    get(){
      return this.getDataValue('content')
    }
  },
  version:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  tags:{
    type:Sequelize.ARRAY(Sequelize.STRING),
    defaultValue:[],
    get(){
      return this.getDataValue('tags').join(', ')
    }
  }


});


Article.prototype.truncate = function(length){
  let truncated = this.content.slice(0, length)
  this.setDataValue('content', truncated)
}

Article.findByTitle = function(titleName){
  let article = Article.findOne({ where:{
    title: titleName
  }
  })
  return article
}


// associations
Article.belongsTo(User, {as: 'author'})
User.hasMany(Article)


// hooks
// everytime the article gets updated, the version count increse by one
Article.beforeUpdate((Article) => {
  Article.version++
})



//---------^^^---------  your code above  ---------^^^----------

module.exports = Article;
