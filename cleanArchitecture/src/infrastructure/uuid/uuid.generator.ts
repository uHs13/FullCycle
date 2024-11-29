import {v4 as uuid} from 'uuid';
import UuidGeneratorInterface from '../../domain/@shared/uuid/uuid.generator.interface';

export default class UuidGenerator implements UuidGeneratorInterface {
    generate(): string {
        return uuid();
    }
}
