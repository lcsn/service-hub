import { Routes } from "@angular/router";
import { ShoppingListComponent } from "../feature/shopping/shopping-list/shopping-list.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../auth/login/login.component";
import { ShoppingListEditComponent } from '../feature/shopping/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ShoppingComponent } from '../feature/shopping/shopping.component';
import { ArticleListComponent } from '../feature/shopping/article-list/article-list.component';
import { ArticleListEditComponent } from '../feature/shopping/article-list/article-list-edit/article-list-edit.component';
import { ShoppingHomeComponent } from '../feature/shopping/shopping-home/shopping-home.component';
import { ShoppingListDetailComponent } from '../feature/shopping/shopping-list/shopping-list-detail/shopping-list-detail.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'shopping', component: ShoppingComponent, children: [
      { path: '', component: ShoppingHomeComponent },
      { path: 'lists', component: ShoppingListComponent },
      { path: 'lists/new', component: ShoppingListEditComponent },
      { path: 'lists/:index/edit', component: ShoppingListEditComponent },
      { path: 'lists/:index', component: ShoppingListDetailComponent },
      { path: 'articles', component: ArticleListComponent },
      { path: 'articles/new', component: ArticleListEditComponent },
      { path: 'articles/:index/edit', component: ArticleListEditComponent }
    ]
  },

  { path: '**', redirectTo: '/login' }
];