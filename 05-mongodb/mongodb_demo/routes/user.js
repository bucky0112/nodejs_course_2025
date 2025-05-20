const express = require('express')
const router = express.Router()
const User = require('../models/User');

router.post('/users', async (req, res) => {
  try {
    const result = await User.create(req.body)
    res.status(201).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

router.get('/users', async (req, res) => {
  try {
    const result = await User.find()
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

router.get('/users/:id', async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false, 
      data: err.message
    })
  }
})

router.put('/users/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.status(200).json({
      success: true,
      data: result
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
      success: true,
      message: '刪除成功'
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err.message
    })
  }
})

module.exports = router