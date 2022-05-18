import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('form', {static: false}) slForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.selectedIngredient.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      const ingredient = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        'name': ingredient.name,
        'amount': ingredient.amount
      })
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredient = new Ingredient(ingName, ingAmount);
  //   this.shoppingListService.addIngredient(newIngredient);
  // }

  onSubmit() {
    const ingredient = new Ingredient(this.slForm.form.value.name, this.slForm.form.value.amount)
    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient)
    }
    this.onClear()
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex)
    this.onClear();
  }

  onClear() { 
    this.slForm.reset();
    this.editMode = false; 
  }

}
