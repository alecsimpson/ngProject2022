import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store'

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AddIngredients } from 'src/app/shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;

  constructor(private store: Store<AppState>, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.recipe = this.recipeService.getRecipe(+params['id'])
      }
    )

  }

  toShoppingList() {
    // this.shoppingListService.addIngredients(this.recipe.ingredients)
    this.store.dispatch(new AddIngredients(this.recipe.ingredients))
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})

  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe)
  }

}
