import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize/types'
import { Thread } from './thread'

interface MessageAttributes {
  id: number
  senderUserId: number
  threadId: number
}
interface MessageCreationAttributes extends Optional<MessageAttributes, 'id'> {}

export class Message
  extends Model<MessageAttributes, MessageCreationAttributes>
  implements MessageAttributes {
  public id: number
  public senderUserId: number
  public threadId: number

  public static associations: {
    thread: Association<Message, Thread>
  }
}

export default (sequelize: Sequelize) => {
  Message.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      senderUserId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'sender_user_id',
      },
      threadId: {
        type: DataTypes.INTEGER.UNSIGNED,
        field: 'thread_id',
      },
    },
    {
      tableName: 'message',
      sequelize,
    },
  )

  Message.associations = {
    thread: Message.belongsTo(Thread, { foreignKey: 'thread_id' }),
  }

  return Message
}
