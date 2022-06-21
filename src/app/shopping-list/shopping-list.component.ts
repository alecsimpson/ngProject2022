import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store'

import { Ingredient } from '../shared/ingredient.model';
import { AppState } from '../store/app.reducer';
import { ShoppingListService } from './shopping-list.service';
import { AddIngredient, SelectIngredient } from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  providers: []
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients!: Ingredient[];
  private activedSub: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<AppState>) { }

  ngOnInit() {
    // this.ingredients = this.shoppingListService.getIngredients();
    this.store.select('shoppingList').subscribe((slData) => {
      this.ingredients = slData.ingredients
    })
    // this.activedSub = this.shoppingListService.shoppingListUpdated.subscribe((ingredients) => {this.ingredients = ingredients})

  }

  onIngredientAdded(ingredient: Ingredient) {
    // this.shoppingListService.addIngredient(ingredient);
    this.store.dispatch(new AddIngredient(ingredient))
  }

  ngOnDestroy(): void {
    this.activedSub.unsubscribe()
  }

  onSelectIngredient(index: number) {
    // this.shoppingListService.selectIngredient(index)
    this.store.dispatch(new SelectIngredient(index))
  }

}
