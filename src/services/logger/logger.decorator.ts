import Container, { Constructable } from 'typedi';
import { ConsoleLogger } from './console-logger';

export function Logger(context: string) {
  return (object: Constructable<unknown>, propertyName: string, index?: number) => {
    const logger = new ConsoleLogger(context);
    Container.registerHandler({
      object, propertyName, index, value: () => logger,
    });
  };
}
