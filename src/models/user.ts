import bookshelf from '../config/database';
import Notes from './notes';
class User extends bookshelf.Model<User> {
  get tableName() {
    return 'users';
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const user = await User.where<User>({ email }).fetch();
      return user;
    } catch (error) {
      return null;
    }
  }

  notes() {
    return this.hasMany(Notes, 'user_id');
  }
}

export default User;