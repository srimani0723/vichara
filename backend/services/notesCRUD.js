const { v4: uuidv4 } = require("uuid");

const getAllNotes = async (db) => {
  const query = `
        SELECT
        *
        FROM
        NOTES;
    `;
  const data = await db.all(query);
  return data;
};

const getNotesById = async (db, id) => {
  const query = `
    SELECT
    *
    FROM
    NOTES
    WHERE ID = ?;
    `;

  const data = await db.get(query, [id]);
  return data;
};

const createNotes = async (db, title, content, image, tag) => {
  const id = uuidv4();
  const query = `
  INSERT INTO notes (id,title,content,image,tag)
  VALUES (?,?,?,?,?);
  `;
  const res = await db.run(query, [id, title, content, image, tag]);
  const data = await db.get("SELECT * FROM notes WHERE id = ?", [id]);
  return data;
};

const updateNotesById = async (db, id, title, content, image, tag) => {
  const query = `
    UPDATE notes
      SET title = ?, content = ?, image = ?, tag = ?
      WHERE id = ?;
    `;

  const data = await db.run(query, [title, content, image, tag]);
  console.log(data);
  const updatedNote = await db.get("SELECT * FROM notes WHERE id = ?", [id]);
  return {
    message: "Notes updated successfully",
    updatedNote,
  };
};

const deleteNotesById = async (db, id) => {
  const query = `
    DELETE
    FROM
    NOTES
    WHERE ID = ?; 
    `;
  await db.run(query, [id]);
  return {
    message: "Deleted Successfully",
  };
};

module.exports = {
  getAllNotes,
  createNotes,
  getNotesById,
  deleteNotesById,
  updateNotesById,
};
