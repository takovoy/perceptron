import {HTTPService} from '@services/http.service';
import {Connections} from '@common/connections';

export class PerceptronService extends HTTPService {
    constructor() {
        super(Connections.get('perceptron'));
    }

    parseImage(imageBinary: Buffer) {
        return this.post<any>("parse-image", {imageBinary});
    }
}
