const SpaceModel = require("../models/space");

const createSpace = async (req, res) => {
  try {
    //creating a new mongo doc
    const space = new SpaceModel({ ...req.body });
    await space.save();

    // if (!findSinglespace)
    // return res.status(404).send({ message: "space not found!" });
    return res.status(200).send({ data: space });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: err.message });
  }
};

const updateSpace = async (req, res) => {
  const spaceId = req.params.spaceId;
  console.log(spaceId);
  const updates = req.body;
  // const id = req.params.id;
  try {
    const space = await SpaceModel.findByIdAndUpdate(
      { _id: spaceId },
      { ...updates },
      { new: true }
    );

    if (!space) {
      throw new Error("Space not found.");
    }

    return res.send({ data: space });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getSpaceInfo = async (req, res) => {
  try {
    const spaceId = req.params.spaceId;
    const findSpace = await SpaceModel.findById({ _id: spaceId });
    if (!findSpace) return res.send.status(404)({ message: "no space " });
    return res.send({ data: findSpace });
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

const getAllSpace = async (req, res) => {
  try {
    const getAllSpaces = await SpaceModel.find({});
    if (!getAllSpaces)
      return res.send.status(404)({ message: "no record found" });
    return res.send({ data: getAllSpaces });
  } catch (error) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { createSpace, updateSpace, getSpaceInfo, getAllSpace };
