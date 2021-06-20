import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize/types'
import { Message } from './message'
import { ThreadUser } from './thread-user'
import { User } from './user'

interface ThreadAttributes {
  id: number
  createdByUserId: number
}
interface ThreadCreationAttributes extends Optional<ThreadAttributes, 'id'> {}

export class Thread
  extends Model<ThreadAttributes, ThreadCreationAttributes>
  implements ThreadAttributes {
  public id: number
  public createdByUserId: number

  public static associations: {
    users: Association<Thread, User>
    messages: Association<Thread, Message>
  }
}

export default (sequelize: Sequelize) => {
  Thread.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      createdByUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'created_by_user_id',
      },
    },
    {
      tableName: 'thread',
      sequelize,
    },
  )

  Thread.associations = {
    messages: Thread.hasMany(Message, { foreignKey: 'thread_id' }),
    users: Thread.belongsToMany(User, { through: ThreadUser }),
  }

  return Thread
}
