import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './Recipes/recipes.component';
import { ShoppingListComponent } from './Shopping/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './Recipes/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './Recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      }, {
        path: 'new',
        component: RecipeEditComponent,
      }, {
        path: ':id',
        component: RecipeDetailsComponent,
      }, {
        path: ':id/edit',
        component: RecipeEditComponent,
      }
    ]
  },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
