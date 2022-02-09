import Bev from "../models/bev.js";

export const getBevs = async (req, res) => {
  try {
    const bevs = await Bev.find();
    res.json(bevs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getBevsType = async (req, res) => {
  try {
    const { type } = req.params;
    const bevs = await Bev.find({
      type,
    });
    res.json(bevs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getBev = async (req, res) => {
  try {
    const { id } = req.params;
    const bev = await Bev.findById(id);
    if (bev) {
      return res.json(bev);
    } else {
      res.status(404).json({ message: "Beverage Not Found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const createBev = async (req, res) => {
  try {
    const bev = await new Bev(req.body);
    await bev.save();
    res.status(201).json(bev);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateBev = async (req, res) => {
  try {
    const { _id } = req.params;
    const bev = await Bev.findByIdAndUpdate(_id, req.body, { new: true });
    res.status(200).json(bev);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBev = async (req, res) => {
  try {
    const { _id } = req.params;
    const deleted = await Bev.findByIdAndDelete(_id);
    if (deleted) {
      return res.status(200).send("Beverage Deleted");
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
