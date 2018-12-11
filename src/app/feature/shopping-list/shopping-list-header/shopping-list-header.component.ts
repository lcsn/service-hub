import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shopping-list-header',
  templateUrl: './shopping-list-header.component.html',
  styleUrls: ['./shopping-list-header.component.css']
})
export class ShoppingListHeaderComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onViewShoppinglists() {
    this.router.navigate([ '/shopping-list' ], { queryParamsHandling: 'preserve' });
  }

  onAddShoppingList() {
    this.router.navigate([ 'new' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onViewArticles() {
    this.router.navigate([ 'article' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onAddArticle() {
    this.router.navigate([ 'article/new' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

}
