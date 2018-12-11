import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from 'src/app/__services/shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingList } from 'src/app/__model/shopping-list.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name'];

  shoppingListDataSubscription: Subscription;

  shoppingLists: ShoppingList[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.shoppingListDataSubscription = this.shoppingListService.onShoppingListAdded
      .subscribe(
        (data: ShoppingList[]) => {
          console.log(data);
          this.shoppingLists = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    this.shoppingLists = this.shoppingListService.getShoppingLists();
  }

  ngOnDestroy() {
    this.shoppingListDataSubscription.unsubscribe();
  }

}
