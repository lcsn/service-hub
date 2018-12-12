import { Injectable } from '@angular/core';
import { Article } from '../__model/article.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  onArticleAdded = new Subject<Article[]>();

  articles: Article[] = [];

  constructor() { }

  getArticles(): Article[] {
    return this.articles;   
  }

  addArticle(article: Article) {
    this.articles.push(article);
    this.fireArticleAdded();
  }

  fireArticleAdded() {
    this.onArticleAdded.next(this.articles.slice());
  }

}
