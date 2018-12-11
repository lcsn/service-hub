import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  newShoppingListForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    this.newShoppingListForm = new FormGroup({
      'name': new FormControl(null, [Validators.required])
    });
  }

  onSubmit() {
    console.log(this.newShoppingListForm);
  }

}
