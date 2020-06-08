import {Body, Controller, Post} from 'routing-controllers';
import {PerceptronService} from '../services/perceptron.service';

@Controller()
export class PerceptronController {
    private perceptronService = new PerceptronService();

    @Post("look-at-image")
    lookAtImage(@Body() image: Buffer) {
        return this.perceptronService.parseImage(image);
    }
}
