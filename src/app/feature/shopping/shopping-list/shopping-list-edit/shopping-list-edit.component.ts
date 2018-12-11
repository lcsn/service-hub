import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  title: string;
  editMode = false;
  newShoppingListForm: FormGroup;
  routeParamsSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.editMode = params['index'] != null;
        }
      );
    this.initialize();
  }

  ngOnDestroy(){
    this.routeParamsSubscription.unsubscribe();
  }

  initialize() {
    if (this.editMode) {
      this.title = 'Liste editieren';
    } else {
      this.title = 'Neue Liste'
    }
    this.newShoppingListForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.newShoppingListForm);
  }

}
