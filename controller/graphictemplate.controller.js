import graphictemplateModel from "../models/graphictemplate.model.js";

export const createGraphicTemplate = async (req,res,next) => {
  try {
    const newGraphictamplate =  new graphictemplateModel(req.body)
    const savedGraphictamplate = await newGraphictamplate.save();
    res.status(201).send(savedGraphictamplate)
  } catch (error) {
    next(error)
  }
};

export const updateGraphictamplate = async (req,res,next) => {
  try {
    const updatedGraphictamplate = await graphictemplateModel.findByIdAndUpdate(req.params.id, {
      $set: req.body
    }, {new: true});
    res.status(201).send(updatedGraphictamplate)
  } catch (error) {
    next(error)
  }
}

export const getGraphicTemplate = async (req,res,next) => {
  try {
    const allGraphictamplate = await graphictemplateModel.find();
    res.status(201).send(allGraphictamplate);
  } catch (error) {
    next(error)
  }
};

export const deleteGraphicTemplate = async (req,res,next) => {
  try {
    await graphictemplateModel.findByIdAndDelete(req.params.id);
    res.status(201).send('Graphic Template Deleted!')
  } catch (error) {
    next(error)
  }
}