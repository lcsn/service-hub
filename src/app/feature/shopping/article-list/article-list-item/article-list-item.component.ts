import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/__model/article.model';

@Component({
  selector: 'app-article-list-item',
  templateUrl: './article-list-item.component.html',
  styleUrls: ['./article-list-item.component.css']
})
export class ArticleListItemComponent implements OnInit {

  @Input() article: Article;

  constructor() { }

  ngOnInit() {
    console.log(this.article);
  }

}
