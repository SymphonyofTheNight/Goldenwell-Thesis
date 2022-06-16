import mongoose from 'mongoose';

const OwnerSchema = mongoose.Schema({
    username: {
        require: true,
        type: String,
    },
    password: {
        require: true,
        type: String,
    },
    isAdmin: {
      type: Boolean,
      default: true,
    },
    totalOrders: {
      type: Number,
      default: true,
      min: 0,
      max: 99999999,
    },
    totalSales: {
      type: Number,
      default: true,
      min: 0,
      max: 99999999,
    },
    store: [
        {
            product_identifier: {
              type: String,
              require: true,
            },
            productname: {
                type: String,
                required: true,
              },
            price: {
                type: Number,
                required: true,
              },
            quantity: {
                type: Number,
                required: true,
              },
            categoryfilter: {
              type: String,
              required: true
            },
            description: {
                type: String,
                required: true,
              },
            specs: {
              type: String,
              required: true
            },
            imageBase64: {
                type: String,
                required: true,
              },
            timestamp: {
              type: String,
              required: true,
            }
            
        }
    ],
    delivery: [
      {
        product_identifier: {
          type: String,
          require: true,
        },
        productname: {
            type: String,
            required: true,
          },
        price: {
            type: Number,
            required: true,
          },
        imageBase64: {
            type: String,
            required: true,
          },
        quantity: {
          type: String,
          required: true
        },
        clientID: {
          type: String,
          required: true
        },
        clientname: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        number: {
          type: Number,
          required: true
        },
        date: {
            type: String,
            default: Date.now(),
        }
      }
    ],
    paidToDeliver: [
      {
        product_identifier: {
          type: String,
          require: true,
        },
        productname: {
            type: String,
            required: true,
          },
        price: {
            type: Number,
            required: true,
          },
        imageBase64: {
            type: String,
            required: true,
          },
        quantity: {
          type: String,
          required: true
        },
        clientname: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true
        },
        number: {
          type: Number,
          required: true
        },
        date: {
            type: String,
            default: Date.now(),
        }
      }
    ]
});

const OwnerModels = mongoose.model('OwnerModels', OwnerSchema);

export default OwnerModels;

// tomoorow create request here new schema deliver
 
