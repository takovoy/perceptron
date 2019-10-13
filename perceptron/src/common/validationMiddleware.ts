import { Request, Response } from 'express';
import { ExpressMiddlewareInterface } from 'routing-controllers';
import {CONFIG} from '@common/config';
const logger = require('./logger');
logger.debugLevel = CONFIG.logLevel;

export class ValidationMiddleware implements ExpressMiddlewareInterface {
  public use(request: Request, response: Response, next?: (err?: Error) => void): void | boolean {
    logger.info('validation middleware');
    next();
  }
}
