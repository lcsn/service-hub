import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Modules etc.
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './angular-material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// App-Root
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
// Feature: Shopping
import { ShoppingComponent } from './feature/shopping/shopping.component';
import { ShoppingHomeComponent } from './feature/shopping/shopping-home/shopping-home.component';
import { ShoppingHeaderComponent } from './feature/shopping/shopping-header/shopping-header.component';
import { ShoppingListComponent } from './feature/shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './feature/shopping/shopping-list/shopping-list-edit/shopping-list-edit.component';
import { ArticleListComponent } from './feature/shopping/article-list/article-list.component';
import { ArticleListEditComponent } from './feature/shopping/article-list/article-list-edit/article-list-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    ShoppingListComponent,
    HomeComponent,
    LoginComponent,
    ShoppingListEditComponent,
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
