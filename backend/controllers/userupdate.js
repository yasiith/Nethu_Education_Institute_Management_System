const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//update a student
const updatestudent = async(req,res) => {
    console.log(req.body)
    const { ...rest } = req.body
    const { StundentID } = req.body
    // console.log(rest)

    if (!mongoose.Types.ObjectId.isValid(StundentID)){
        return res.status(404).json({error: 'No such Student'})  
    }

    const data = await stundent.findOneAndUpdate({StundentID: StundentID}, rest)

    if (!data) {
        return res.status(400).json({error: 'No such Student'})
    }

    //res.status(200).json(student)
    res.send({success : true, message : "data updated successfully", data : data})
}
module.exports = {
    updatestudent
}