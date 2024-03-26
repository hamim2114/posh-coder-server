import trustbyModel from "../models/trustby.model.js";

export const createImg = async (req, res, next) => {
  try {
    const newImg = new trustbyModel(req.body);
    await newImg.save();
    res.status(201).send('Image Uploaded!');
  } catch (error) {
    next(error);
  }
};
export const getImgs = async (req, res, next) => {
  try {
    const images = await trustbyModel.find();
    res.status(201).send(images);
  } catch (error) {
    next(error);
  }
};
export const deleteImg = async (req, res, next) => {
  try {
    await trustbyModel.findByIdAndDelete(req.params.id)
    res.status(201).send('Image Deleted!');
  } catch (error) {
    next(error);
  }
};
