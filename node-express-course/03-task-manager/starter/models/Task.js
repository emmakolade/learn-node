const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true, 'must be provided'],
    trim:true,
    maxlength:[20, 'name shouldnt be more thaan 20 chars']
  },
  completed:{
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model("Task", taskSchema);
