import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ShoppingListEditComponent } from './feature/shopping/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ShoppingComponent } from './feature/shopping/shopping.component';
import { ArticleComponent } from './feature/shopping-list/article/article.component';
import { ShoppingHeaderComponent } from './feature/shopping/shopping-header/shopping-header.component';
import { ShoppingListComponent } from './feature/shopping/shopping-list/shopping-list.component';
import { ArticleListComponent } from './feature/shopping/article-list/article-list.component';
import { ArticleListEditComponent } from './feature/shopping/article-list/article-list-edit/article-list-edit.component';
import { ShoppingHomeComponent } from './feature/shopping/shopping-home/shopping-home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ShoppingListComponent,
    HomeComponent,
    LoginComponent,
    ShoppingListEditComponent,
    ArticleComponent,
    ShoppingComponent,
    ShoppingHeaderComponent,
    ArticleListComponent,
    ArticleListEditComponent,
    ShoppingHomeComponent
  ],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    AngularMaterialModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
