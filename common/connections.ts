import {IConnection} from '@models/connection.model';

export class Connections {
    private static list: IConnection[] = require('../config/connections.json');
    public static get(alias: string): IConnection {
        return this.list.find(item => item.alias === alias);
    }
}
