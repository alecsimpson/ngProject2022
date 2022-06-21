import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as slActions from '../store/shopping-list.actions';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;

  @ViewChild('form', {static: false}) slForm: NgForm;

  editMode = false;
  editedItemIndex: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select('shoppingList').subscribe((slData) => {
      if(slData.editedItemIndex > -1) {
        this.editMode = true;
        this.editedItemIndex = slData.editedItemIndex;
        const ingredient = slData.ingredients[this.editedItemIndex]
        this.slForm.setValue({
          'name': ingredient.name,
          'amount': ingredient.amount
        })
      } else {
        this.editMode = false;
      }
    })
  }

  onSubmit() {
    const ingredient = new Ingredient(this.slForm.form.value.name, this.slForm.form.value.amount)
    if(this.editMode) {
      this.store.dispatch(new slActions.UpdateIngredient({index: this.editedItemIndex, ingredient: ingredient}));
    } else {
      this.store.dispatch(new slActions.AddIngredient(ingredient));
    }
    this.onClear()
  }

  onDelete() {
    this.store.dispatch(new slActions.DeleteIngredient(this.editedItemIndex))
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

}
