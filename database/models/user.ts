import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize/types'
import { Thread } from './thread'
import { ThreadUser } from './thread-user'

interface UserAttributes {
  id: number
  name: string
}
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id: number
  public name: string

  public static associations: {
    threads: Association<User, Thread>
  }
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(200),
      },
    },
    {
      tableName: 'user',
      sequelize,
    },
  )

  User.associations = {
    threads: User.belongsToMany(Thread, { through: ThreadUser }),
  }

  return User
}
