const Company = require("../models/Company");

module.exports =async  function (req,res,next){
    const { id } = req.company.company;
    const company = await Company.findById(id);
    console.log(req.company.company.id);
    if (!company) {
      return res.status(404).send('Company not found');
    }
  
    if (!company.isVerified) {
      return res.status(403).send('Company is not verified');
    }
  
    req.company = company;
    next();
}