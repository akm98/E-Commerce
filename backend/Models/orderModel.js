const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: [true, 'Please enter shipping address'],
    },
    city: {
      type: String,
      required: [true, 'Please enter city'],
    },
    pincode: {
      type: Number,
      required: [true, 'Please enter pincode'],
    },
    country: {
      type: String,
      required: [true, 'Please enter country'],
    },
    phoneNo: {
      type: Number,
      required: [true, 'Please enter phone number'],
    },
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: [true],
      },
      quantity: {
        type: Number,
        required: [true],
      },
      image: {
        type: String,
        required: [true],
      },
      product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    },
  ],
  orderedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      requierd: true,
    },
    info: {
      type: Date,
      requierd: true,
    },
  },
  paidAt: {
    type: Date,
    requierd: true,
  },
  itemsCost: {
    type: Number,
    default: 0,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
    requierd: true,
    default: 'processing',
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
