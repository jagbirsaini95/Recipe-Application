import { Component, ViewChild } from '@angular/core';
import { FormArray, FormGroup, NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from 'src/app/services/recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent {
  @ViewChild('editForm') editForm: NgForm;
  subscriber: Subscription;
  id: number;
  editMode = false;
  description: string;
  name: string;
  imagePath: string;
  recipeIngredients: Array<Ingredient> = []

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {

    this.subscriber = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      console.log(this.id);
      if (!isNaN(this.id))
        this.editMode = true;
    })
    this.initializeEditForm();
  }

  initializeEditForm() {
    let recipe = this.recipeService.getRecipe(this.id);
    if (this.editMode) {
      this.name = recipe.name;
      this.description = recipe.description;
      this.imagePath = recipe.imagePath;
      this.recipeIngredients = recipe.ingredients
    }
  }

  onSubmitForm(editForm: NgForm) {
    let arr = []

    for (const item in this.editForm.value['ingredients']) {
      // if (Object.prototype.hasOwnProperty.call(this.editForm.value['ingredients'], item)) {
      const element = this.editForm.value['ingredients'][item];
      arr.push(element);
      // }
    }

    const newRecipe = new Recipe(
      this.editForm.value['name'],
      this.editForm.value['description'],
      this.editForm.value['imagePath'],
      arr,
    );
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe)
    }
    this.router.navigate([''])
  }

  onAddNewIngredient() {
    this.recipeIngredients.push(new Ingredient('', null))
  }

  onRemoveIngredient(i) {
    this.editForm.control.patchValue({
      ingredients: this.recipeIngredients.splice(i, 1)
    })
  }

  onCancelEdit() {
    this.router.navigate([''])
  }
  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }
}
