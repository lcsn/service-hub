import { Injectable } from '@angular/core';
import { Article } from '../__model/article.model';
import { Subject } from 'rxjs';
import { Image } from '../__model/image.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  onArticlesChanged = new Subject<Article[]>();

  articles: Article[] = [
    // new Article('Test 1', new Image('ewe_image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/EWE-CO_OnLight_M_rgb.svg/320px-EWE-CO_OnLight_M_rgb.svg.png')),
    // new Article('Test 2', new Image('ewe_image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/EWE-CO_OnLight_M_rgb.svg/320px-EWE-CO_OnLight_M_rgb.svg.png')),
    // new Article('Test 3', new Image('ewe_image', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/EWE-CO_OnLight_M_rgb.svg/320px-EWE-CO_OnLight_M_rgb.svg.png'))
  ];

  constructor() { }

  setArticles(articles: Article[]) {
    this.articles = articles;
    this.fireArticlesChanged();
  }

  getArticles(): Article[] {
    return this.articles;   
  }

  addArticle(article: Article) {
    this.articles.push(article);
    this.fireArticlesChanged();
  }

  fireArticlesChanged() {
    this.onArticlesChanged.next(this.articles.slice());
  }

}
