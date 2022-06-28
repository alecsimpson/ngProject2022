import { HttpClient, HttpEventType, HttpParams, HttpResponse } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { exhaust } from "rxjs-compat/operator/exhaust";
import { exhaustMap } from "rxjs/operators";
import { tap, map, take } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { AppState } from "../store/app.reducer";
import { Ingredient } from "./ingredient.model";
import { Store } from '@ngrx/store'
import * as slActions from '../shopping-list/store/shopping-list.actions'
import { ShoppingListState } from "../shopping-list/store/shopping-list.reducer";



@Injectable({providedIn: 'root'})
export class DataStorageService {
    private serverUrl: string = 'https://ng-project-2022-default-rtdb.firebaseio.com'

    constructor(private http: HttpClient, private recipeService: RecipeService, private slService: ShoppingListService, private store: Store<AppState>) {}

    fetchData() {
        this.fetchRecipeData().subscribe();
        this.fetchSlData();
    }

    storeData() {
        this.storeRecipeData();
        this.storeSlData();
    }


    fetchSlData() {
        this.http.get<Ingredient[]>(this.serverUrl + '/shoppingList.json')
        .pipe(tap((res) => {
          this.store.dispatch(new slActions.AddIngredients(res))
        })).subscribe()
    }


    fetchRecipeData() {
        return this.http.get<Recipe[]>(this.serverUrl + '/recipes.json')
        .pipe(
            map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: (recipe.ingredients ? recipe.ingredients : [])}
            });
        }),
            tap(recipes => {
                this.recipeService.setRecipes(recipes)
            })
        )

    }

    storeRecipeData() {
        const recipes = this.recipeService.getRecipes()
        // Firebase is setup such that a PUT request will overwrite the data at the given endpoint
        this.http.put<{data: Recipe[]}>(this.serverUrl + '/recipes.json', recipes).subscribe(()=>{})
    }

    storeSlData() {
        this.store.select('shoppingList').subscribe((slState: ShoppingListState) => {
          this.http.put<{data: Ingredient[]}>(this.serverUrl + '/shoppingList.json', slState.ingredients).subscribe(()=>{})
        })
        // Firebase is setup such that a PUT request will overwrite the data at the given endpoint
    }
}
