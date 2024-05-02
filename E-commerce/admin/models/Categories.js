const {model, models, Schema, default: mongoose} = require("mongoose");

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: 'Category',
  }
});

// if it already exist use it, else crerate one
export const Category = models?.Category || model('Category', CategorySchema)