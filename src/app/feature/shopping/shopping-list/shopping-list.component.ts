import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from 'src/app/__services/shopping-list.service';
import { Subscription } from 'rxjs';
import { ShoppingList } from 'src/app/__model/shopping-list.model';
import { DataStorageService } from 'src/app/__services/data-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'createdOn', 'numArticles'];

  shoppingListDataSubscription: Subscription;

  shoppingLists: ShoppingList[] = [];

  constructor(private shoppingListService: ShoppingListService,
    private dataStorageSerice: DataStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

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
    // this.dataStorageSerice.getShoppingLists();
    this.shoppingLists = this.shoppingListService.getShoppingLists();
  }

  ngOnDestroy() {
    this.shoppingListDataSubscription.unsubscribe();
  }

  selectRow(index: number) {
    this.router.navigate([ index ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
