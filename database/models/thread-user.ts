import { DataTypes, Model, Optional, Sequelize } from 'sequelize/types'
import { Thread } from './thread'
import { User } from './user'

interface ThreadUserAttributes {
  id: number
  userId: number
  threadId: number
}
interface ThreadUserCreationAttributes extends Optional<ThreadUserAttributes, 'id'> {}

export class ThreadUser
  extends Model<ThreadUserAttributes, ThreadUserCreationAttributes>
  implements ThreadUserAttributes {
  public id: number
  public userId: number
  public threadId: number

  public static associations: {}
}

export default (sequelize: Sequelize) => {
  ThreadUser.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'user_id',
        references: {
          model: User,
          key: 'id',
        },
      },
      threadId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'thread_id',
        references: {
          model: Thread,
          key: 'id',
        },
      },
    },
    {
      tableName: 'thread_user',
      sequelize,
    },
  )

  return ThreadUser
}
