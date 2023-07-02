import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent {
  recipeDetails: Recipe;
  id: number;
  subscriber: Subscription;
  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscriber = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipeDetails = this.recipeService.getRecipe(this.id);
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetails.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    console.log("delete", this.recipeDetails, this.id);
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate([''])

  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
