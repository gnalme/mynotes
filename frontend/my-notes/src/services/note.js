import axios from "axios";

export const fetchNotes = async (filter) => {
    try {
        var response = await axios.get("http://localhost:5017/api/notes", {
            params: {
                search: filter?.search,
                sortItem: filter?.sortItem,
                sortOrder: filter?.sortOrder,
            },
        });
        
        return response.data.notes;
        
    }catch(e) {
        console.error(e);
    }
    
}

export const createNote = async (note) => {
    try {
        var response = await axios.post("http://localhost:5017/api/notes", note);
        
        return response.status;
        
    }catch(e) {
        console.error(e);
    } 
}

export const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5017/api/notes/${id}`);
      return response.status === 204;
    } catch (e) {
      console.error(e);
      return false;
    }
  };