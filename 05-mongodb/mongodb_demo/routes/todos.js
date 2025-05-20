const express = require('express')
const router = express.Router()
const Todos = require('../models/Todos')

router.get('/todos', async (req, res) => {
  try {
    const todos = await Todos.find()
    res.status(200).json({
      success: true,
      data: todos
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

router.post('/todos', async (req, res) => {
  try {
    const result = await Todos.create(req.body)
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400),
      json({
        success: false,
        message: err.message
      })
  }
})

router.get('/todos/:id', async (req, res) => {
  try {
    const result = await Todos.findById(req.params.id)
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

router.put('/todos/:id', async (req, res) => {
  try {
    const result = await Todos.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

router.delete('/todos/:id', async (req, res) => {
  try {
    await Todos.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success: true,
      message: '刪除成功'
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message
    })
  }
})

module.exports = router
