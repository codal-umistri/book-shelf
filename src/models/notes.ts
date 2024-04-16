import bookshelf from "../config/database";
import User from "./user";
class Notes extends bookshelf.Model<Notes> {
  get tableName() {
    return 'notes';
  }

  static async FindbyTitle(title: string, id: string): Promise<Notes | null> {
    try {
      const notes = await Notes.where<Notes>({ title: title, user_id: id }).fetch();
      return notes;
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  static async getAllNotes(id: string): Promise<Notes[] | null> {
    try {
      const notes = await Notes.where<Notes>({ user_id: id }).fetchAll();
      return notes.toArray() as Notes[];
    } catch (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
  }

  user() {
    return this.belongsTo(User, 'user_id');
  }

}



export default Notes;