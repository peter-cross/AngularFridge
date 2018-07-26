/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { DataService } from './data.service';
import { HttpdataService } from './httpdata.service';

import { AppComponent } from './app.component';
import { CoreComponent } from './core/core.component';
import { FridgeComponent } from './fridge/fridge.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppinglistComponent } from './shoppinglist/shoppinglist.component';
import { HttpserverComponent } from './httpserver/httpserver.component';

@NgModule( {
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  
  declarations: [
    AppComponent,
    CoreComponent,
    RecipeComponent,
    FridgeComponent,
    ShoppinglistComponent,
    HttpserverComponent
  ],
  
  providers: [ {provide: DataService, useClass: HttpdataService} ],
  //providers: [ DataService ],
  
  bootstrap: [ AppComponent ]
} )
     
export class AppModule 
{ }