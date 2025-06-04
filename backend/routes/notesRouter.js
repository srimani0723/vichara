const express = require("express");
const notesController = require("../controllers/notesController");
const router = express.Router();

const checkInput = (req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const userDetails = req.body;
    const isEmpty = Object.keys(userDetails).length == 0;
    if (isEmpty) {
      res.status(404).json({
        status: "failure",
        message: "details are empty",
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = (db) => {
  router.get("/", notesController.getAllNotesController(db));
  router.post("/", checkInput, notesController.createNotesController(db));
  router.get("/:id", notesController.getNotesByIdController(db));
  router.put("/:id", checkInput, notesController.updateNotesByIdController(db));
  router.delete("/:id", notesController.getAllNotesController(db));
  return router;
};
