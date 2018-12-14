import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/__services/shopping-list.service';
import { ShoppingList } from 'src/app/__model/shopping-list.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  title: string;
  editMode = false;
  shoppingListForm: FormGroup;
  routeParamsSubscription: Subscription;

  constructor(private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['index'] != null;
        }
      );
    this.initialize();
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }

  initialize() {
    if (this.editMode) {
      this.title = 'Liste editieren';
    } else {
      this.title = 'Neue Liste'
    }
    this.shoppingListForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.shoppingListForm);
    if (this.shoppingListForm.valid) {
      const name = this.shoppingListForm.value.name;
      this.shoppingListService.addShoppingList(new ShoppingList(name, new Date(), []));
      this.router.navigate(['shopping/lists'], { queryParamsHandling: 'preserve' });
    }
  }

}
