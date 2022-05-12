import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'}) 
export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    shoppingListUpdated = new Subject<Ingredient[]>();

    getIngredients() {
        return this.ingredients.slice()
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient)
        this.shoppingListUpdated.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(ingredient => this.ingredients.push(ingredient));
        this.shoppingListUpdated.next(this.ingredients.slice());
    }


}