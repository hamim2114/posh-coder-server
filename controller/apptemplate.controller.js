import apptemplateModel from "../models/apptemplate.model.js";

export const createApptamplate = async (req,res,next) => {
  try {
    const newApptamplate =  new apptemplateModel(req.body)
    const savedApptamplate = await newApptamplate.save();
    res.status(201).send(savedApptamplate)
  } catch (error) {
    next(error)
  }
};

// export const updateApptamplate = async (req,res,next) => {
//   try {
//     const updatedApptamplate = await blogModel.findByIdAndUpdate(req.params.blogId, {
//       $set: req.body
//     }, {new: true});
//     res.status(201).send(updatedApptamplate)
//   } catch (error) {
//     next(error)
//   }
// }

export const getApptamplate = async (req,res,next) => {
  try {
    const allApptamplate = await apptemplateModel.find();
    res.status(201).send(allApptamplate);
  } catch (error) {
    next(error)
  }
};

export const deleteApptamplate = async (req,res,next) => {
  try {
    await apptemplateModel.findByIdAndDelete(req.params.id);
    res.status(201).send('App Template Deleted!')
  } catch (error) {
    next(error)
  }
}