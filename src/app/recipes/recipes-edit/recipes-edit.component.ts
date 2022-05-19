import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipes-edit',
  templateUrl: './recipes-edit.component.html',
  styleUrls: ['./recipes-edit.component.css']
})
export class RecipesEditComponent implements OnInit {

  inEditMode: boolean = false;
  id!: number
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      params => {
        if(params['id']) {
          this.inEditMode = true;
          this.id = +params['id'];
        }
        this.initForm();
      }
    );
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  private initForm() {
    let recipe: Recipe = new Recipe(null, null, null, null);
    let ingredientList = new FormArray([]);

    if(this.inEditMode){
      recipe = this.recipeService.getRecipe(this.id)
      if(recipe.ingredients) {
        for(let ing of recipe.ingredients) {
          ingredientList.push(new FormGroup({
            ingName: new FormControl(ing.name, [Validators.required]),
            ingAmount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        } 
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe.name, [Validators.required]),
      'imagePath': new FormControl(recipe.imagePath, [Validators.required]),
      'description': new FormControl(recipe.description, [Validators.required]),
      'ingredients': ingredientList

    });
  }

  onSave() {
    let ingredients: Ingredient[] = [];
    if(this.recipeForm.get('ingredients').value){
      for(let formGroup of this.recipeForm.get('ingredients').value){
        let ing = new Ingredient(formGroup.ingName, formGroup.ingAmount)
        ingredients.push(ing)
      }
    }

    let recipe = new Recipe(this.recipeForm.get('name').value, this.recipeForm.get('description').value, this.recipeForm.get('imagePath').value, ingredients)

    if(this.inEditMode){
      this.recipeService.editRecipe(recipe, this.id)
    } else {
      this.recipeService.addRecipe(recipe)
    }
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      ingName: new FormControl(null, [Validators.required]),
      ingAmount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
  
  onClear() {
    this.recipeForm.reset()
  }

}
