import { Injectable } from '@angular/core';
import { ShoppingList } from '../__model/shopping-list.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  onShoppingListAdded = new Subject<ShoppingList[]>();

  shoppingLists: ShoppingList[] = [
    new ShoppingList('Wocheneinkauf 1', []),
    new ShoppingList('Wocheneinkauf 2', []),
    new ShoppingList('Wocheneinkauf 3', [])
  ];

  constructor() { }

  getShoppingLists(): ShoppingList[] {
    return this.shoppingLists;
  }

  addShoppingList(list: ShoppingList) {
    this.shoppingLists.push(list);
    this.fireShoppingListAdded();
  }

  fireShoppingListAdded() {
    this.onShoppingListAdded.next(this.shoppingLists.slice());
  }

}
