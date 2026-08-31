import Delivery from "../models/Delivery.js";
// =========================
// GET ALL DELIVERY AREAS
// =========================

const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().sort({
      createdAt: -1,
    });

    res.status(200).json(deliveries);
  } catch (error) {
    console.error("GET DELIVERIES ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch delivery areas.",
    });
  }
};


// =========================
// CREATE DELIVERY AREA
// =========================

const createDelivery = async (req, res) => {
  try {
    const { name, fee } = req.body;

    if (!name || fee === undefined) {
      return res.status(400).json({
        message: "Delivery area and fee are required.",
      });
    }

    const existingDelivery = await Delivery.findOne({
      name: name.trim(),
    });

    if (existingDelivery) {
      return res.status(400).json({
        message: "This delivery area already exists.",
      });
    }

    const delivery = await Delivery.create({
      name: name.trim(),
      fee: Number(fee),
      active: true,
    });

    res.status(201).json(delivery);
  } catch (error) {
    console.error("CREATE DELIVERY ERROR:", error);

    res.status(500).json({
      message: "Failed to create delivery area.",
    });
  }
};


// =========================
// UPDATE DELIVERY AREA
// =========================

const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fee, active } = req.body;

    const delivery = await Delivery.findByIdAndUpdate(
      id,
      {
        ...(name !== undefined && {
          name: name.trim(),
        }),

        ...(fee !== undefined && {
          fee: Number(fee),
        }),

        ...(active !== undefined && {
          active,
        }),
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery area not found.",
      });
    }

    res.status(200).json(delivery);
  } catch (error) {
    console.error("UPDATE DELIVERY ERROR:", error);

    res.status(500).json({
      message: "Failed to update delivery area.",
    });
  }
};


// =========================
// DELETE DELIVERY AREA
// =========================

const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;

    const delivery = await Delivery.findByIdAndDelete(id);

    if (!delivery) {
      return res.status(404).json({
        message: "Delivery area not found.",
      });
    }

    res.status(200).json({
      message: "Delivery area deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE DELIVERY ERROR:", error);

    res.status(500).json({
      message: "Failed to delete delivery area.",
    });
  }
};


export {
    getDeliveries,
    createDelivery,
    updateDelivery,
    deleteDelivery,
  };

  