import mongoose, {Types} from "mongoose";

const linkSchema = new mongoose.Schema({
  hash: {type: String,required: true},
  userId : {type: Types.ObjectId, ref: 'User',required: true}
})

const userLinks = mongoose.model('link',linkSchema);
export default userLinks;