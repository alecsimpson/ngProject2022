import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";


@Injectable({providedIn: 'root'})
export class RecipeService {
    private recipes: Recipe[] = [];

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

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesUpdated.next(this.recipes)
    }

}