const mongoose=require("mongoose")

const rankSchema=mongoose.Schema({
    name: String,
    course: String,
    type:String,
    linkedin: String,
    img:String,
    createdAt: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      },
      updatedAt: {
        type: Date,
        default: new Date().toLocaleString('en-US', { timeZone: 'UTC' })
      }
},
{
    versionKey: false // Disable version key
  }  
)

const RankModel=mongoose.model("rank",rankSchema)

module.exports={
    RankModel
}