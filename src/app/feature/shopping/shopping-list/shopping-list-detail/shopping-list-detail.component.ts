import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ShoppingListService } from 'src/app/__services/shopping-list.service';
import { ShoppingList } from 'src/app/__model/shopping-list.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/__model/article.model';
import { ArticleService } from 'src/app/__services/article.service';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-shopping-list-detail',
  templateUrl: './shopping-list-detail.component.html',
  styleUrls: ['./shopping-list-detail.component.css']
})
export class ShoppingListDetailComponent implements OnInit {

  index: number;
  shoppingList: ShoppingList;

  articleCtrl = new FormControl();
  filteredArticles: Observable<Article[]>;
  articles: Article[] = [];

  selectedArticle: Article;

  constructor(private shoppingListService: ShoppingListService,
    private articleService: ArticleService,
    private route: ActivatedRoute) {
    this.filteredArticles = this.articleCtrl.valueChanges
      .pipe(
        startWith(''),
        map(article => article ? this._filterArticles(article) : this.articles.slice())
      );
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = +params['index'];
      this.shoppingList = this.shoppingListService.getShoppingListByIndex(+params['index']);
    });
    this.articles = this.articleService.getArticles();
  }

  private _filterArticles(value: string): Article[] {
    const filterValue = value.toLowerCase();
    return this.articles.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  onSelectArticle(article: Article) {
    this.selectedArticle = article;
  }

  onDeleteArticle(index: number) {
    this.shoppingList.articles.splice(index, 1);
  }

  onAddArticle() {
    if (this.selectedArticle !== null) {
      this.shoppingList.articles.push(this.selectedArticle);
      // this.shoppingListService.addArticle(this.index, this.selectedArticle);
    }
  }

  onClear(input: HTMLInputElement, matAutocompleteTrigger: MatAutocompleteTrigger) {
    input.value = '';
    input.dispatchEvent(new Event('input'));
    this.selectedArticle = null;
  }

}
