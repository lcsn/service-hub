import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListHeaderComponent } from './shopping-list-header.component';

describe('ShoppingListHeaderComponent', () => {
  let component: ShoppingListHeaderComponent;
  let fixture: ComponentFixture<ShoppingListHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
