import { Article } from './article.model';

export class ShoppingList {
    constructor(
        public name: string,
        public articles: Article[]
    ) { }
}
