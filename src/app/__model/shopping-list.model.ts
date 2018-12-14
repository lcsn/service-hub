import { Article } from './article.model';

export class ShoppingList {
    constructor(
        public name: string,
        public createdOn: Date,
        public articles: Article[]
    ) { }
}
