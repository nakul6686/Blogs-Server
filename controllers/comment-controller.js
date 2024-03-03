const Comments = require('../models/Comments');

 const deleteCommentbyblogId = async (id)=>{

    if(!id){
        return false
    }
    await Comments.deleteMany({blog: id}, {"writeConcern": {"w": "majority", "wtimeout": 5000}})
    return true

}

module.exports = {
    deleteCommentbyblogId,
  };