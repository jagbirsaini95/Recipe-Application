import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipeListComponent } from './Recipes/recipe-list/recipe-list.component';
import { RecipeDetailsComponent } from './Recipes/recipe-details/recipe-details.component';
import { ShoppingListComponent } from './Shopping/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './Shopping/shopping-list-edit/shopping-list-edit.component';
import { RecipesComponent } from './Recipes/recipes.component';
import { RecipeItemComponent } from './Recipes/recipe-list/recipe-item/recipe-item.component';
import { FormsModule } from '@angular/forms';
import { DropdownDirective } from './shared/dropdown.directive';
import { RecipeService } from './services/recipe.service';
import { ShoppingListService } from './services/shopping-list.service';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './Recipes/recipe-edit/recipe-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeListComponent,
    RecipeDetailsComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipesComponent,
    RecipeItemComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RecipeService, ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
