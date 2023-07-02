import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  subscriber: Subscription;
  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscriber = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      return this.recipes = recipes;
    }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  addNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.subscriber.unsubscribe();
  }

}
