import { Image } from './image.model';

export class Article {
    constructor(
        public name: string,
        public image: Image,
        public price: number = 0.00
    ) { }
}
