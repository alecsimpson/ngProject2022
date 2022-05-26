import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from "../shared/dataStorage.service";
import { Recipe } from "./recipe.model";
import { RecipeService } from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {
    
    constructor(private dataService: DataStorageService, private recipeService: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if(this.recipeService.getRecipes().length === 0) {
            return this.dataService.fetchRecipeData();
        }
        return this.recipeService.getRecipes()
    }
}