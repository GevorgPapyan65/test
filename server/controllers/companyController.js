const Company = require('../models/Company');
const User = require('../models/User');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.createCompany = async (req, res) => {
  const { CompanyName, foundedDate, avatar, email, phone,password } = req.body;
  console.log(req.body);
  try {
    let company = new Company({ CompanyName, foundedDate, avatar, email, phone });
    const salt = await bcrypt.genSalt(10);
    company.password = await bcrypt.hash(password, salt);
    await company.save();
    const payload = {
      user: {
        id: company.id,
        isVerified: company.isVerified
      }
    };
    jwt.sign(payload, 'yourSecretKey', { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
};

exports.verifyCompany  = async (req,res) => {
  const { isVerified } = req.body;
  const updatedFields = { isVerified};
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }

}

exports.updateCompany = async (req, res) => {
  const { CompanyName, foundedDate, avatar, email, phone } = req.body;
  const updatedFields = { CompanyName, foundedDate, avatar, email, phone };
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, { $set: updatedFields }, { new: true });
    res.json(updatedCompany);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    await Company.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Company removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.status(500).send('Server error');
  }
};


exports.addEmployeeById = async(req,res) => {
  try {
    const { companyId } = req.params;
    const userData = req.body;

    const savedUser = User.findById(userData._id);
    if(!savedUser)
      return res.status(404).json({msg:"Couldn't find the user"})

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send('Company not found');
    }

    company.employees.push(savedUser._id);
    savedUser.company = company.id;
    await savedUser.save();
    await company.save();

    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.getAllEmployee = async(req,res) =>{
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId).populate('employees');
    if (!company) {
      return res.status(404).send('Company not found');
    }

    res.status(200).send(company.employees);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.UpdateEmployee = async (req,res) =>{
  try {
    const { employeeId } = req.params;
    const updatedData = req.body;

    const updatedUser = await User.findByIdAndUpdate(employeeId, updatedData, { new: true });
    if (!updatedUser) {
      return res.status(404).send('Employee not found');
    }

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.deleteEmployee = async (req,res) =>{
  try {
    const { companyId, employeeId } = req.params;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send('Company not found');
    }

    // Remove the employee from the company's employees array
    company.employees = company.employees.filter(id => id.toString() !== employeeId);
    await company.save();

    // Remove the user from the User collection
    const deletedUser = await User.findByIdAndDelete(employeeId);
    if (!deletedUser) {
      return res.status(404).send('Employee not found');
    }

    res.status(200).send(deletedUser);
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.addUserToQueue = async (req,res) =>{
  try {
    const { companyId } = req.params;
    const { userId } = req.body;

    const user = await User.findById(userId);
    if(!user)
      return res.status(304).json({msg: "User not found"});
    
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send('Company not found');
    }

    if (!company.queue.includes(userId)) {
      company.queue.push(userId);
      await company.save();
    }

    res.status(201).send(company);
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.getQueue = async (req,res) =>{
  try {
    const { companyId } = req.params;

    const company = await Company.findById(companyId).populate('queue');
    if (!company) {
      return res.status(404).send('Company not found');
    }

    console.log(company.queue);
    
    res.status(200).send(company.queue);
  } catch (error) {
    res.status(500).send(error);
  }
}


exports.approveUser = async (req,res) =>{
  try {
    const { companyId } = req.params;
    const { userId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send('Company not found');
    }

    company.queue = company.queue.filter(id => id.toString() !== userId);
    company.employees.push(userId);
    console.log(company.queue);
    await company.save();


    res.status(200).send(company);
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.rejectUser = async(req,res) =>{
  try {
    const { companyId } = req.params;
    const { userId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).send('Company not found');
    }

    company.queue = company.queue.filter(id => id.toString() !== userId);
    await company.save();

    res.status(200).send(company);
  } catch (error) {
    res.status(500).send(error);
  }
}
