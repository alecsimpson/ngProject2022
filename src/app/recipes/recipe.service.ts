import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";


@Injectable({providedIn: 'root'})
export class RecipeService {
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new Ingredient('Meat', 1), new Ingredient('Fries', 10)]),
        new Recipe('Another Test Recipe', 'This is simply a test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', [new Ingredient('Fish', 1), new Ingredient('Chips', 10)])
    ];

    recipeSelected = new Subject<Recipe>();
    recipesUpdated = new Subject<Recipe[]>();

    getRecipes() {
        return this.recipes.slice(); //Returns a copy of the array instead of a reference
    }

    getRecipe(id: number) {
        return this.recipes.slice()[id];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesUpdated.next(this.recipes);
    }

    editRecipe(recipe: Recipe, index: number) {
        this.recipes[index] = recipe;
        this.recipesUpdated.next(this.recipes);
    }

    deleteRecipe(recipe: Recipe) {
        this.recipes.splice(this.recipes.indexOf(recipe), 1)
        this.recipesUpdated.next(this.recipes)
    }

}