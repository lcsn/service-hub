import { Injectable } from '@angular/core';
import { ShoppingList } from '../__model/shopping-list.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onShoppingListAdded = new Subject<ShoppingList[]>();

  shoppingLists: ShoppingList[] = [
    new ShoppingList('ABC', new Date('2018-12-14 14:00:00'), []),
    new ShoppingList('DEF', new Date('2018-12-14 14:00:00'), []),
    new ShoppingList('GHI', new Date('2018-12-14 14:00:00'), [])
  ];

  constructor() { }

  getShoppingLists(): ShoppingList[] {
    return this.shoppingLists;
  }

  setShoppingLists(shoppingLists: ShoppingList[]) {
    this.shoppingLists = shoppingLists;
    this.fireShoppingListAdded();
  }

  addShoppingList(list: ShoppingList) {
    this.shoppingLists.push(list);
    this.fireShoppingListAdded();
  }

  fireShoppingListAdded() {
    this.onShoppingListAdded.next(this.shoppingLists.slice());
  }

}
