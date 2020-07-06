const express = require('express');
const router = express.Router();
const Article = require('../models/article');

/**
 *
 *___ _____ _   ___ _____   _  _ ___ ___ ___
 / __|_   _/_\ | _ \_   _| | || | __| _ \ __|
 \__ \ | |/ _ \|   / | |   | __ | _||   / _|
 |___/ |_/_/ \_\_|_\ |_|   |_||_|___|_|_\___|
 *
 *
 */


router.get('/articles', async (req, res, next) => {
  try {
    const articles = await Article.findAll()
    res.json(articles)
  } catch(e) { next(e) }
})


router.get('/articles/:id', async(req, res, next)=> {
  try{
    const article = await Article.find({where:{
      id : req.params.id
    }})
    if (!article) res.sendStatus(404)
    else res.send(article)
  }catch(e){
    next(e)
  }
})


router.post('/articles', async(req, res, next)=> {
  try{
      const newArticle = await Article.create(req.body)
      res.json({
        message:'Created successfully',
        article: newArticle
      })

  }catch(error){
    next(error)
  }
})

router.put('/articles/:id', async(req, res, next)=> {
  try{
    const articleToUpdate = await Article.find({where:{
      id:req.params.id
    }})
    const updated = await articleToUpdate.update(req.body)

    res.json({
      message: 'Updated successfully',
      article: updated})
  }catch(error){
    next(error)
  }
})



module.exports = router;
