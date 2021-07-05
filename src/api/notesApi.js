import axios from "axios";

const NOTES_API_URL = process.env.REACT_APP_BACKEND_URL + "/notes";

export const retrieveNotes = async () => {
  let notes = [];
  try {
    const response = await axios.get(NOTES_API_URL);
    if (response.status === 200 && response.data && response.data.notes) {
      notes = response.data.notes;
    }
  } catch (err) {
    console.error(
      "An error occurred while calling the retrieveNotes endpoint, more details: ",
      err
    );
    throw err;
  }

  return notes;
};

export const createNote = async () => {
  let note = {};
  try {
    const response = await axios.post(NOTES_API_URL);
    console.log(response);
    if (response.status === 201 && response.data && response.data.note) {
      note = response.data.note;
    }
  } catch (err) {
    console.error(
      "An error occurred while calling the createNote endpoint, more details: ",
      err
    );
    throw err;
  }

  return note;
};

export const updateNote = async (id, body) => {
  let note = {};
  try {
    const updateUrl = `${NOTES_API_URL}/${id}`;
    const response = await axios.put(updateUrl, { body });
    if (response.status === 200 && response.data && response.data.note) {
      note = response.data.note;
    }
  } catch (err) {
    console.error(
      "An error occurred while calling the createNote endpoint, more details: ",
      err
    );
    throw err;
  }

  return note;
};
