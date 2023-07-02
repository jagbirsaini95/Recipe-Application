import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../Recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  postRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-application-udemy-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(res => {
      console.log("save success");
    })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>('https://recipe-application-udemy-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            }
          })
        }),
        tap(recipes => {
          return this.recipeService.setRecipes(recipes)
        })
      )

  }
}
