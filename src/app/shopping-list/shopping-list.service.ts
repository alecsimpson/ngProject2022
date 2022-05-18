import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'}) 
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];
    selectedIngredient = new Subject<number>();
    shoppingListUpdated = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice()
    }

    getIngredient(index: number) {
        return this.ingredients[index]
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.shoppingListUpdated.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => this.addIngredient(ingredient));
    }

    selectIngredient(index: number) {
        this.selectedIngredient.next(index)
    }

    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.shoppingListUpdated.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1)
        this.shoppingListUpdated.next(this.ingredients.slice())
    }


}