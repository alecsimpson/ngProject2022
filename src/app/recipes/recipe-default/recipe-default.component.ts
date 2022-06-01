import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-default',
  templateUrl: './recipe-default.component.html',
  styleUrls: ['./recipe-default.component.css']
})
export class RecipeDefaultComponent implements OnInit {
  hasRecipes: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.hasRecipes = this.recipeService.getRecipes().length > 0;
    this.recipeService.recipesUpdated.subscribe((recipes) => { this.hasRecipes = true })
  }

}
