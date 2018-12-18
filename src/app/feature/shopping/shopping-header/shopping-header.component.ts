import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataStorageService } from 'src/app/__services/data-storage.service';

@Component({
  selector: 'app-shopping-header',
  templateUrl: './shopping-header.component.html',
  styleUrls: ['./shopping-header.component.css']
})
export class ShoppingHeaderComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService) { }

  ngOnInit() {
  }

  onViewHome() {
    this.router.navigate([ '/shopping' ], { queryParamsHandling: 'preserve' });
  }

  onViewShoppinglists() {
    this.router.navigate([ 'lists' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onAddShoppingList() {
    this.router.navigate([ 'lists/new' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onViewArticles() {
    this.router.navigate([ 'articles' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onAddArticle() {
    this.router.navigate([ 'articles/new' ], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onSaveData() {
    this.dataStorageService.saveData();
  }

  onLoadData() {
    this.dataStorageService.loadData();
  }

}
