import { Payments } from "../../models/payment.model.js";

export const createPayment = async (req, res) => {
  const { description, amount, status } = req.body;
  try {
    let newPayment = await Payments.create(
      {
        description,
        amount,
        status,
      },
      {
        fields: ["description", "amount", "status"],
      }
    );
    if (newPayment) {
      return res.json({
        message: "Payment created successfully",
        data: newPayment,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something goes wrong",
      data: {},
    });
  }
};

export const getPayment = async (req, res) => {
  try {
    const payment = await Payments.findAll({
      attributes: ["id", "description", "amount", "status"],
    });
    res.json({
      data: payment,
    });
  } catch (error) {
    console.log(error);
  }
};
