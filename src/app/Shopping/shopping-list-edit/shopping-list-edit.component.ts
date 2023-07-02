import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingListForm') shoppingListForm: NgForm;
  @Output() ingredientAdded = new EventEmitter<Ingredient>();
  editIndex: number;
  subscription: Subscription;
  editMode: boolean = false;
  editingItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe((index: number) => {
        this.editIndex = index;
        this.editMode = true;
        this.editingItem = this.shoppingListService.getIngredient(this.editIndex);
        this.shoppingListForm.setValue({
          name: this.editingItem.name,
          amount: this.editingItem.amount
        })
      })
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAdd(shoppingListForm: NgForm) {
    const value = shoppingListForm.value
    const ingName = value.name;
    const ingAmount = value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient)
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.shoppingListForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editIndex);
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.shoppingListForm.reset();
  }
}
