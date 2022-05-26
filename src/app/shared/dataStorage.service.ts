import { HttpClient, HttpEventType, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, map } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Ingredient } from "./ingredient.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    private serverUrl: string = 'https://ng-project-2022-default-rtdb.firebaseio.com'
    
    constructor(private http: HttpClient, private recipeService: RecipeService, private slService: ShoppingListService) {}

    fetchData() {
        this.fetchRecipeData().subscribe();;
        this.fetchSlData();
    }
    
    storeData() {
        this.storeRecipeData();
        this.storeSlData();
    }


    fetchSlData() {
        this.http.get<Ingredient[]>(this.serverUrl + '/shoppingList.json').subscribe((response) => {
            this.slService.setIngredients(response)
        })
    }

    fetchRecipeData() {
        return this.http.get<Recipe[]>(this.serverUrl + '/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    // return recipe.ingredients ? recipe : new Recipe(recipe.name, recipe.description, recipe.imagePath, [])
                    return {...recipe, ingredients: (recipe.ingredients ? recipe.ingredients : [])}
                });
            }), tap((recipes) => {
                this.recipeService.setRecipes(recipes)
            }))
    }

    storeRecipeData() {
        const recipes = this.recipeService.getRecipes()
        // Firebase is setup such that a PUT request will overwrite the data at the given endpoint
        this.http.put<{data: Recipe[]}>(this.serverUrl + '/recipes.json', recipes).subscribe(()=>{})
    }

    storeSlData() {
        const ingredients = this.slService.getIngredients()
        // Firebase is setup such that a PUT request will overwrite the data at the given endpoint
        this.http.put<{data: Ingredient[]}>(this.serverUrl + '/shoppingList.json', ingredients).subscribe(()=>{})
    }
}