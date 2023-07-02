import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './Recipes/recipes.component';
import { ShoppingListComponent } from './Shopping/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './Recipes/recipe-start/recipe-start.component';
import { RecipeDetailsComponent } from './Recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';

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
        resolve: [RecipeResolverService] //  middleware/resolver runs before route change
      }, {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService] //  middleware/resolver runs before route change
      }
    ]
  },
  {
    path: 'shoppingList',
    component: ShoppingListComponent,
  }
  ,
  {
    path: 'auth',
    component: AuthComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
