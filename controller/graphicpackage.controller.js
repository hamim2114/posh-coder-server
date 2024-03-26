import graphicpackageModel from "../models/graphicpackage.model.js";

export const createGraphicpackage = async (req,res,next) => {
  try {
    const newGraphicpackage =  new graphicpackageModel(req.body)
    const savedGraphicpackage = await newGraphicpackage.save();
    res.status(201).send(savedGraphicpackage)
  } catch (error) {
    next(error)
  }
};

export const updateGraphicpackage = async (req,res,next) => {
  try {
    const updatedGraphicpackage = await graphicpackageModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    res.status(201).send(updatedGraphicpackage)
  } catch (error) {
    next(error)
  }
}

export const getAllGraphicpackage = async (req,res,next) => {
  try {
    const allGraphicPackages = await graphicpackageModel.find();
    res.status(201).send(allGraphicPackages);
  } catch (error) {
    next(error)
  }
};

export const deleteGraphicpackage = async (req,res,next) => {
  try {
    await graphicpackageModel.findByIdAndDelete(req.params.id);
    res.status(201).send('Graphic Package Deleted!')
  } catch (error) {
    next(error)
  }
}