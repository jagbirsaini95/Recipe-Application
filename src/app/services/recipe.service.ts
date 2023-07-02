import { EventEmitter, Injectable, Output } from "@angular/core";
import { Recipe } from "../Recipes/recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    private recipes: Recipe[] = [
        // new Recipe(
        //     'Dummy pizza',
        //     'Dummy pizza description',
        //     'https://i.guim.co.uk/img/media/6e57ae5b3bf72076cbd1de6a46932aad5ec942b6/0_982_6721_5626/master/6721.jpg?width=700&quality=85&dpr=1&s=none',
        //     [
        //         new Ingredient('pizza', 1),
        //         new Ingredient('fries', 2),
        //     ]),
        // new Recipe(
        //     'Dummy Burger',
        //     'Dummy Burger description',
        //     'https://hips.hearstapps.com/hmg-prod/images/chicken-tikka-masala1-1663341991.jpg',
        //     [
        //         new Ingredient('burger', 1),
        //         new Ingredient('beans', 2),
        //         new Ingredient('fries', 5),
        //     ]
        // ),

    ]

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();//return new array ie copy of recipes
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(id: number, newRecipe: Recipe) {
        this.recipes[id] = newRecipe
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipesChanged.next(this.recipes.slice());
        ;
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
}