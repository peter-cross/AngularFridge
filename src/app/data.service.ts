/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { Injectable } from '@angular/core';
import { Item, Recipe, Ingredient } from './core/core.component';

@Injectable()
export class DataService 
{
    // Array for storing fridge contents
    private contents: Item[]
    
    // Array for storing recipes
    private recipes: Recipe[]
    
    constructor() 
    { 
        this.contents = new Array<Item>()
        this.recipes = new Array<Recipe>()
    }
    
    getContents(): Item[]
    {
        return this.contents
    }
    
    qtyOfItems(): number
    {
        return this.contents.length
    }
    
    addNewItem( itm: Item )
    {
        this.contents.push( itm )
    }
    
    deleteItem( idx: number )
    {
        this.contents.splice( idx, 1 )
    }
    
    addItemQty( i: number, qty: number )
    {
        let cntQty= Number( this.contents[i].quantity )
        this.contents[i].quantity = String( cntQty + qty )
    }
    
    removeItemQty( i: number, qty: number )
    {
        let cntQty: number = Number( this.contents[i].quantity )
        this.contents[i].quantity = String( cntQty - qty )
    }
    
    itemName( i: number ): string
    {
        return this.contents[i].name
    }
    
    itemQty( i: number ): number
    {
        return Number( this.contents[i].quantity )
    }
    
    
    getRecipes(): Recipe[]
    {
        return this.recipes
    }
    
    getRecipeNames(): string[]
    {
        let list = new Array<string>()
        
        for( let rcp of this.recipes )
            list.push( rcp.name )
        
        return list
    }
    
    numberOfRecipes(): number
    {
        return this.recipes.length
    }
    
    getRecipe( idx: number ): Recipe
    {
        return this.recipes[idx]
    }
    
    addNewRecipe( rcp: Recipe )
    {
        this.recipes.push( rcp )
    }
    
    deleteRecipe( idx: number )
    {
        this.recipes.splice( idx, 1 )
    }
    
    updateRecipe( idx: number, name: string, ingredients: Ingredient[], instructions: string[], estTime: number )
    {
        let rcp: Recipe = this.recipes[idx]
        
        rcp.name = name
        rcp.ingredients = ingredients
        rcp.instructions = instructions
        rcp.estimatedTime = estTime
    }
    
    findRecipe( rcpName: string ): number
    {
        if ( rcpName.trim()  == '' )
            return -1
        
        for ( let i = 0; i < this.recipes.length; i++ )
            if ( this.recipes[i].name == rcpName )
                return i
        
        return -1
    }
    
    findItem( itmName: string ): number
    {
        for ( let i = 0; i < this.contents.length; i++ )
            if ( this.contents[i].name == itmName )
                return i
        
        return -1
    }
    
    shoppingList( rcpIdx: number ): Item[]
    {
        let ingr: Ingredient
        let idx: number
        let qtyShort: number
        
        let recipe = this.recipes[rcpIdx]
        let shpList = new Array<Item>()
        
        for ( let i = 0; i < recipe.ingredients.length; i++ )
        {
            ingr = recipe.ingredients[i]
            idx = this.findItem( ingr.name )
            
            if ( idx < 0 )
                shpList.push( ingr )
            else if ( Number( ingr.quantity ) > Number( this.contents[idx].quantity ) )
                {
                    qtyShort = Number( ingr.quantity ) - Number( this.contents[idx].quantity )
                    shpList.push( new Ingredient( ingr.name, qtyShort ) )
                }
        }
          
        return shpList
    }
    
    retrieveData()
    {
    
    }
}