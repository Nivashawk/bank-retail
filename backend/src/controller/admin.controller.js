const Adminmodel = require("../model/admin.model");

// ### create Admin document ###

const create = async (req, res) => {
  const admin = new Adminmodel({
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Account_Number: req.body.Account_Number,
    Aadhar_Number: req.body.Aadhar_Number,
    Pan_Number: req.body.Pan_Number,
    Password: req.body.Password,
    Total_Balance: 30000,
  });
  try {
    const total_number_of_documents = await Adminmodel.estimatedDocumentCount();
    // console.log(total_number_of_documents);
    if (
      total_number_of_documents === undefined ||
      total_number_of_documents === 0
    ) {
      await admin.save();
      res.status(200).json({
        code: 200,
        status: "success",
        message: `document were inserted`,
      });
    } else {
      const find_document_with_user_id = await Adminmodel.find({
        Account_Number: req.body.Account_Number,
      });
      //   console.log(find_document_with_user_id.length);
      if (find_document_with_user_id.length !== 0) {
        res.status(200).json({
          code: 201,
          status: "failure",
          message: `document with this account number ${req.body.Account_Number} already exits`,
        });
      } else if (find_document_with_user_id.length === 0) {
        await admin.save();
        res.status(200).json({
          code: 200,
          status: "success",
          message: `document were inserted`,
        });
      }
    }
  } catch (err) {
    res.json({
      code: 201,
      status: "failure",
      message: `Unknown Error Found From Server Side`,
    });
  }
};

// ### Admin Login ###

const login = async (req, res) => {
  try {
    const total_number_of_documents = await Adminmodel.estimatedDocumentCount();
    // console.log(total_number_of_documents);
    if (
      total_number_of_documents === undefined ||
      total_number_of_documents === 0
    ) {
      res.status(200).json({
        code: 201,
        status: "failure",
        message: `Database collection is empty, please fill some data`,
      });
    } else {
      const login_with_username_and_password = await Adminmodel.find({
        $and: [
          { Account_Number: req.body.Account_Number },
          { Password: req.body.Password },
        ],
      });
      //   console.log("login_results",login_with_username_and_password[0].User_id);
      if (login_with_username_and_password.length !== 0) {
        res.status(200).json({
          code: 200,
          status: "success",
          message: `you have been logged in successfully`,
          result: login_with_username_and_password[0].Account_Number
        });
      } else {
        res.status(200).json({
          code: 201,
          status: "failure",
          message: `please check the credentials username: ${req.body.Account_Number}, password: ${req.body.Password}`,
        });
      }
    }
  } catch (err) {
    res.json({
      code: 201,
      status: "failure",
      message: `Unknown Error Found From Server Side`,
    });
  }
};

// get details of specific user

const detail = async (req, res, next) => {
  try {
    query = { Account_Number: req.body.Account_Number };
    const result = await Adminmodel.find(query);
    // console.log(result);
    if (result.length !== 0) {
      res.status(200).json({
        code: 200,
        status: "success",
        message: `details fetched successfully`,
        result: result[0].Total_Balance,
      });
    } else {
      res.status(200).json({
        code: 201,
        status: "failure",
        message: `no such document found`,
      });
    }
  } catch (err) {
    res.json({
      code: 201,
      status: "failure",
      message: `Unknown Error Found From Server Side`,
    });
  }
};

// update funds

// get details of specific user

const fundstransfer = async (req, res, next) => {
  try {

    // console.log(req.body.current_user_account_number, req.body.receiver_user_account_number);
    const result = await Adminmodel.find({
        Account_Number: req.body.current_user_account_number,
    });
    const sender_balance = result[0].Total_Balance
    // console.log(sender_balance);


    const result_2 = await Adminmodel.find({
        Account_Number: req.body.receiver_user_account_number,
    });
    const receiver_balance = result_2[0].Total_Balance
    // console.log(receiver_balance);


    // console.log(result);
    if (sender_balance && receiver_balance) {
        const sender_total = sender_balance - parseInt(req.body.Total_Balance)
        const receiver_total = receiver_balance + parseInt(req.body.Total_Balance)
        // console.log("sender_total => ", sender_total, "receiver_total =>", receiver_total);


      await Adminmodel.updateOne(
        { Account_Number: req.body.current_user_account_number },
        { $set: { Total_Balance: sender_total } }
      );


      await Adminmodel.updateOne(
        { Account_Number: req.body.receiver_user_account_number },
        { $set: { Total_Balance: receiver_total } }
      );


      res.status(200).json({
        code: 200,
        status: "success",
        message: `fund transfered successfully`,
      });
    } else {
      res.status(200).json({
        code: 201,
        status: "failure",
        message: `no such document found`,
      });
    }
  } catch (err) {
    res.json({
      code: 201,
      status: "failure",
      message: `Unknown Error Found From Server Side`,
    });
  }
};

module.exports = {
  create,
  login,
  detail,
  fundstransfer
};
