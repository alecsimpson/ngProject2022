import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store'

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from '../store/app.reducer';
import { AddIngredient, SelectIngredient } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList').subscribe((slData) => {
      this.ingredients = slData.ingredients
    })
  }

  onIngredientAdded(ingredient: Ingredient) {
    this.store.dispatch(new AddIngredient(ingredient))
  }

  onSelectIngredient(index: number) {
    this.store.dispatch(new SelectIngredient(index))
  }

}
