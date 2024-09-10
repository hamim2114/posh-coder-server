import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import { createError } from "../utils/error.handler.js";
import authModel from "../models/auth.model.js";
import { sendOrderCreateEmail, sendUserOrderConfirmationEmail } from "../utils/emailSend.js";


// Place a new order
export const createOrder = async (req, res,next) => {
  const { orderName, name, phone, desc,status } = req.body;

  if (!orderName || !name || !phone || !desc || !status ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const userInfo = await authModel.findById(req.user.id)

  try {
    const newOrder = new orderModel({
      userId:req.user.id,
      status,
      orderName,
      name,
      phone,
      desc,
      user: userInfo
    });

    const savedOrder = await newOrder.save();

    // Send email notification to admin
    await sendOrderCreateEmail(savedOrder);

    //send order confirmation to user
    await sendUserOrderConfirmationEmail(savedOrder)

    return res.status(201).json({
      message: 'Order placed successfully',
      order: savedOrder,
    });
  } catch (error) {
   next(error)
  }
};

export const updateOrder = async (req, res,next) => {
  const { id } = req.params;
  try {
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    return res.status(200).json({
      message: 'Order updated successfully',
      order: updatedOrder,
    });
  } catch (error) {
    next(error)
  }
};

export const getOrders = async (req, res, next) => {
  const { status, search } = req.query;
  try {
    const filter = status && status !== 'all' ? { status } : {};
    if (search) {
      // Check if the search query can be a valid ObjectId for searching by `_id`
      const isObjectId = mongoose.Types.ObjectId.isValid(search);

      if (isObjectId) {
        filter._id = search;
      } else {
        const searchRegex = new RegExp(search, 'i'); // Case-insensitive regex
        filter.$or = [
          { name: { $regex: searchRegex } }, 
          { email: { $regex: searchRegex } }
        ];
      }
    }
    // Fetch orders and prioritize 'placed' orders, followed by most recent updates
    const orderData = await orderModel
      .find(filter)
      .sort({createdAt: -1 });
      // .sort({ status: { $eq: 'placed' } ? -1 : 1, updatedAt: -1 });

    res.status(200).json(orderData);
  } catch (error) {
    next(error);
  }
};



export const getSingleOrder = async (req,res,next) => {
  try {
    const orderSingleData = await orderModel.findById(req.params.id);
    res.status(201).send(orderSingleData);
  } catch (error) {
    next(error)
  }
};

export const deleteOrder = async (req, res,next) => {
  const { id } = req.params;

  try {
    const deletedOrder = await orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      return next(createError(404, 'Order not found!'))
    }

    return res.status(200).json({
      message: 'Order deleted successfully',
    });
  } catch (error) {
    next(error)
  }
};


//get user orders by user id
export const getUserOrder = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orderDetails = await orderModel.find({ userId}).sort({updatedAt: -1});
    res.status(200).json({
      orders: orderDetails,
    });
  } catch (error) {
    next(error);
  }
};
