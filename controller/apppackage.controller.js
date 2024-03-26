import apppackageModel from "../models/apppackage.model.js";

export const createApppackage = async (req,res,next) => {
  try {
    const newApppackage =  new apppackageModel(req.body)
    const savedApppackage = await newApppackage.save();
    res.status(201).send(savedApppackage)
  } catch (error) {
    next(error)
  }
};

export const updateApppackage = async (req,res,next) => {
  try {
    const updatedApppackage = await apppackageModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    res.status(201).send(updatedApppackage)
  } catch (error) {
    next(error)
  }
}

export const getAllApppackage = async (req,res,next) => {
  try {
    const allAppPackages = await apppackageModel.find();
    res.status(201).send(allAppPackages);
  } catch (error) {
    next(error)
  }
};

export const deleteApppackage = async (req,res,next) => {
  try {
    await apppackageModel.findByIdAndDelete(req.params.id);
    res.status(201).send('App Package Deleted!')
  } catch (error) {
    next(error)
  }
}