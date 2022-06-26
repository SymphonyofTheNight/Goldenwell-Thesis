import mongoose from 'mongoose';

const isFieldRequired = () => {
  return typeof this.myField === 'string' ? false : true
}

const ClientSchema = mongoose.Schema({
    fullname: {
      type: String,
      required: true
    },
    address: {
      require: true,
      type: String,
    },
    email: {
      require: true,
      type: String,
    },
    google_id: {
      type: String,
      require: isFieldRequired
    },
    birthday: {
      require: true,
      type: String,
    },
    number: {
      require: true,
      type: Number,
    },
    gender: {
      require: true,
      type: String
    },
    username: {
        require: true,
        type: String,
    },
    password: {
        require: true,
        type: String,
    },  
    cart: [                    
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
    wishlist: [                    
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
      }
      ],
    toBeDeliver: [                    
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
    Delivered: [                    
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
        clientname: {
          type: String,
          required: true
        },
        address: {
          type: String,
          required: true
        },
      }
      ],
});



const ClientModels = mongoose.model('ClientModels', ClientSchema);

export default ClientModels;

//// fix .... post item_id cannot register on post request.. fix tommorow!