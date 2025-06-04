const notesCRUD = require("../services/notesCRUD");

const getAllNotesController = (db) => async (req, res) => {
  try {
    const notes = await notesCRUD.getAllNotes(db);
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({
      error: "error fetching notes",
    });
  }
};

const getNotesByIdController = (db) => async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await notesCRUD.getNotesById(db, id);
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({
      error: "error fetching notes",
    });
  }
};

const createNotesController = (db) => async (req, res) => {
  try {
    const { title, content, image, tag } = req.body;
    const notes = await notesCRUD.createNotes(db, title, content, image, tag);
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({
      error: "error creating notes",
    });
  }
};

const updateNotesByIdController = (db) => async (req, res) => {
  try {
    const { title, image, content, tag } = req.body;
    const { id } = req.params;
    const notes = await notesCRUD.updateNotesById(
      db,
      id,
      title,
      image,
      content,
      tag
    );
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({
      error: "failed to update",
    });
  }
};

const deleteNotesByIdController = (db) => async (req, res) => {
  try {
    const { id } = req.params;
    const notes = await notesCRUD.deleteNotesById(db, id);
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({
      error: "failed to delete",
    });
  }
};

module.exports = {
  getAllNotesController,
  createNotesController,
  getNotesByIdController,
  updateNotesByIdController,
  deleteNotesByIdController,
};
