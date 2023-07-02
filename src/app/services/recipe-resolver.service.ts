import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../Recipes/recipe.model'
import { Injectable } from "@angular/core";
import { RecipeService } from "./recipe.service";

@Injectable()
export class RecipeResolverService implements Resolve<Recipe[]> {
    constructor(private dataStorageService: DataStorageService, private reipeService: RecipeService) { }
    //resolver runs before route change
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log("resolver runs before route change");
        if (this.reipeService.getRecipes().length === 0) {
            return this.dataStorageService.fetchRecipes(); //automatically subscribed by resolve method
        } else {
            return this.reipeService.getRecipes();
        }
    }
}