import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ShoppingList } from '../__model/shopping-list.model';
import { ShoppingListService } from './shopping-list.service';
import { Observable, of } from 'rxjs';
import { Article } from '../__model/article.model';
import { ArticleService } from './article.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private shoppingListService: ShoppingListService,
    private articleService: ArticleService) { }

  loadData() {
    this.getShoppingLists();
    this.getArticles();
  }

  saveData() {
    this.saveShoppingLists().subscribe(() => {
      console.log('ShoppingLists Saved!');
    },
    (error: any) => {
      console.log(error);
    });
    this.saveArticles().subscribe(() => {
      console.log('Articles Saved!');
    },
    (error: any) => {
      console.log(error);
    });
  }

  saveShoppingLists(): Observable<any> {
    return this.http.put<ShoppingList[]>('https://shopping-list-b7e7f.firebaseio.com/shopping-lists.json',
      this.shoppingListService.getShoppingLists(),
      httpOptions
    ).pipe(
      tap(_ => console.log('Saving ShoppingLists ')),
      catchError(this.handleError<ShoppingList[]>('saveData'))
    );
  }

  getShoppingLists() {
    return this.http.get('https://shopping-list-b7e7f.firebaseio.com/shopping-lists.json')
      .pipe(map(
        (shoppingLists: ShoppingList[]) => {
          for (let list of shoppingLists) {
            if (!list['articles']) {
              list.articles = [];
            }
          }
          return shoppingLists;
        }),
        tap(_ => console.log('Loading ShoppingLists')),
        catchError(this.handleError<ShoppingList[]>('getShoppingLists'))
      )
      .subscribe(
        (shoppingLists: ShoppingList[]) => {
          this.shoppingListService.setShoppingLists(shoppingLists);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  saveArticles(): Observable<any> {
    return this.http.put<ShoppingList[]>('https://shopping-list-b7e7f.firebaseio.com/articles.json',
      this.articleService.getArticles(),
      httpOptions
    ).pipe(
      tap(_ => console.log('Saving Articles')),
      catchError(this.handleError<Article[]>('saveData'))
    );
  }

  getArticles() {
    return this.http.get('https://shopping-list-b7e7f.firebaseio.com/articles.json')
      .pipe(
        map((articles: Article[]) => {
          return articles || [];
        }),
        tap(_ => console.log('Loading Articles')),
        catchError(this.handleError<Article[]>('getArticles'))
      )
      .subscribe(
        (articles: Article[]) => {
          this.articleService.setArticles(articles);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
