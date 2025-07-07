const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // favorites array of Site references
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Site'
    }
  ],

  name: {
    type: String,
    default: '',
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: false
    },
    coordinates: {
      type: [Number],
      default: [0, 0]
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

// sparse geospatial index on location
userSchema.index({ location: '2dsphere' }, { sparse: true });

// convenience instance method to set location
userSchema.methods.setLocation = function(longitude, latitude) {
  this.location = {
    type: 'Point',
    coordinates: [longitude, latitude]
  };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);
