import webpackageModel from "../models/webpackage.model.js";

export const createWebpackage = async (req,res,next) => {
  try {
    const newWebpackage =  new webpackageModel(req.body)
    const savedWebpackage = await newWebpackage.save();
    res.status(201).send(savedWebpackage)
  } catch (error) {
    next(error)
  }
};

export const updateWebpackage = async (req,res,next) => {
  try {
    const updatedWebpackage = await webpackageModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    res.status(201).send(updatedWebpackage)
  } catch (error) {
    next(error)
  }
}

export const getAllWebpackage = async (req,res,next) => {
  try {
    const allWebPackages = await webpackageModel.find();
    res.status(201).send(allWebPackages);
  } catch (error) {
    next(error)
  }
};

export const deleteWebpackage = async (req,res,next) => {
  try {
    await webpackageModel.findByIdAndDelete(req.params.id);
    res.status(201).send('Webpackage Deleted!')
  } catch (error) {
    next(error)
  }
}