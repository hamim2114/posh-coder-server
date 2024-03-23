import webtamplateModel from "../models/webtamplate.model.js";

export const createWebtamplate = async (req,res,next) => {
  try {
    const newWebtamplate =  new webtamplateModel(req.body)
    const savedWebtamplate = await newWebtamplate.save();
    res.status(201).send(savedWebtamplate)
  } catch (error) {
    next(error)
  }
};

// export const updateWebtamplate = async (req,res,next) => {
//   try {
//     const updatedWebtamplate = await blogModel.findByIdAndUpdate(req.params.blogId, {
//       $set: req.body
//     }, {new: true});
//     res.status(201).send(updatedWebtamplate)
//   } catch (error) {
//     next(error)
//   }
// }

export const getWebtamplate = async (req,res,next) => {
  try {
    const allWebtamplate = await webtamplateModel.find();
    res.status(201).send(allWebtamplate);
  } catch (error) {
    next(error)
  }
};

export const deleteWebtamplate = async (req,res,next) => {
  try {
    await webtamplateModel.findByIdAndDelete(req.params.id);
    res.status(201).send('Webtamplate Deleted!')
  } catch (error) {
    next(error)
  }
}