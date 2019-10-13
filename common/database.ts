import bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import {Connections} from '@common/connections';
import {IConnection} from '@models/connection.model';

export default class DataBase {
  private static connection: IConnection = Connections.get('perceptronDB');
  public static connect() {
    const options = {
      promiseLibrary: bluebird,
      useCreateIndex: true,
      useNewUrlParser: true,
      dbName: this.connection.name,
      user: this.connection.username,
      pass: this.connection.password
    };
    return mongoose.connect(`mongodb://${this.connection.host}:${this.connection.port}`, options);
  }
}
