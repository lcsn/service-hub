import { Injectable } from '@angular/core';
import { ShoppingList } from '../__model/shopping-list.model';
import { Subject } from 'rxjs';
import { Article } from '../__model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onShoppingListsChanged = new Subject<ShoppingList[]>();

  shoppingLists: ShoppingList[] = [
    // new ShoppingList('ABC', new Date('2018-12-14 14:00:00'), []),
    // new ShoppingList('DEF', new Date('2018-12-14 14:00:00'), []),
    // new ShoppingList('GHI', new Date('2018-12-14 14:00:00'), [])
  ];

  constructor() { }

  addArticle(index: number, article: Article) {
    this.shoppingLists[index].articles.push(article);
  }

  getShoppingLists(): ShoppingList[] {
    return this.shoppingLists;
  }

  getShoppingListByIndex(index: number): ShoppingList {
    return this.shoppingLists[index];
  }

  setShoppingLists(shoppingLists: ShoppingList[]) {
    this.shoppingLists = shoppingLists;
    this.fireShoppingListsChanged();
  }

  addShoppingList(list: ShoppingList) {
    this.shoppingLists.push(list);
    this.fireShoppingListsChanged();
  }

  deleteShoppingList(index: number) {
    this.shoppingLists.splice(index, 1);
    this.fireShoppingListsChanged();
  }

  fireShoppingListsChanged() {
    this.onShoppingListsChanged.next(this.shoppingLists.slice());
  }

}
