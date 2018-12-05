import { Routes } from "@angular/router";
import { ShoppingListComponent } from "../feature/shopping-list/shopping-list.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../auth/login/login.component";

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'shopping-list', component: ShoppingListComponent },

    { path: '**', redirectTo: '/login' }
];