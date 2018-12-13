import { Component, OnInit, OnDestroy } from '@angular/core';
import { Article } from 'src/app/__model/article.model';
import { ArticleService } from 'src/app/__services/article.service';
import { Subscription } from 'rxjs';
import { Image } from 'src/app/__model/image.model';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit, OnDestroy {

  articleDataSubscription: Subscription;

  displayedColumns: string[] = ['position', 'name', 'image', 'imageName'];

  articles: Article[] = [];

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articleDataSubscription = this.articleService.onArticleAdded
    .subscribe((data: Article[]) => {
      console.log(data);
      this.articles = data;
    },
    (error: any) => {
      console.log(error);
    });
    this.articles = this.articleService.getArticles();
  }

  ngOnDestroy() {
    this.articleDataSubscription.unsubscribe();
  }

}
