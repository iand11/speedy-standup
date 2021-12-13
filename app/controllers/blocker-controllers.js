const Blocker = require("../models/blocker-model.js");

// Create and Save a new Message
exports.create = (req, res) => {
  const { name, blocker, ticket } = req.body
  const newBlocker = new Blocker({
    name,
    blocker,
    ticket,
  });
  newBlocker
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Message.",
      });
    });
};

// Retrieve all messages from the database.
exports.findAll = (req, res) => {
  Blocker.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving messages.",
      });
    });
};

// Find a single message with a blockerId
exports.findOne = (req, res) => {
  Blocker.findById(req.params.blockerId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.blockerId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.blockerId,
        });
      }
      return res.status(500).send({
        message: "Error retrieving message with id " + req.params.blockerId,
      });
    });
};

// Update a message identified by the blockerId in the request
exports.update = (req, res) => {
  Blocker.findByIdAndUpdate(
    req.params.blockerId,
    {
      blocker: req.body.blocker,
    },
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Message not found with id " + req.params.blockerId,
        });
      }
      res.send(data);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.blockerId,
        });
      }
      return res.status(500).send({
        message: "Error updating message with id " + req.params.blockerId,
      });
    });
};

// Delete a message with the specified blockerId in the request
exports.delete = (req, res) => {
  Blocker.findByIdAndRemove(req.params.blockerId)
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: "Blocker not found with id " + req.params.blockerId,
        });
      }
      res.send({ message: "Blocker deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Message not found with id " + req.params.blockerId,
        });
      }
      return res.status(500).send({
        message: "Could not delete message with id " + req.params.blockerId,
      });
    });
};