/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { Item, Ingredient, Recipe } from "../core/core.component";

// Decorator to mark class as Angular component and provide metadata for the component
@Component({
  // CSS selector to identify component in HTML template
  selector: 'app-recipe',
  // URL to HTML template file
  templateUrl: './recipe.component.html',
  // Array of URLs to template style sheets that need to be applied
  styleUrls: ['./recipe.component.css']
})

/**
 * Class RecipeComponent - User Interface for managing recipes
 */
export class RecipeComponent implements OnInit 
{
    // Name of current recipe in window for creating/editing recipes
    @Input() recipe: string
    
    // Estimated time for current recipe in window for creating/editing recipes
    @Input() estTime: string //number
    
    // Ingredients of current recipe in window for creating/editing recipes
    @Input() ingredients: Ingredient[]
    
    // Instructions of current recipe in window for creating/editing recipes
    @Input() instructions: string[]
    
    // Index of current recipe in the array of recipes
    idx: number
    
    // Array of Form tables
    tables: any[]
    
    // Array of Form tabs
    tabs: any[]
    
    info: string
    
    qtyPattern = "^[1-9][0-9]*$"
    
    
    // Constructor for the class
    constructor( private dataService: DataService ) 
    { }

    // Method invoked when component is created
    ngOnInit() 
    {
        this.clearRecipeFormFields()
    }
    
    /**
     * Method for clearing class attributes used for storing information in Recipe form
     */
    private clearRecipeFormFields()
    {
        this.recipe = ''
        this.estTime = ''
        this.ingredients = new Array<Ingredient>()
        this.instructions = new Array<string>()
        this.idx = -1
    }
    
    /**
     * Method for displaying form for entering new recipe
     * @param recipeForm - Recipe form TypeScript ID
     * @param newRecipeBtn - Button for creating new recipe TypeScript ID
     */
    newRecipe( recipeForm: any, newRecipeBtn: any )
    {
        recipeForm.style.display = 'inline-block'
        newRecipeBtn.style.display = 'none'
        
        this.activateRecipeTab(0)
    }
    
    /**
     * Activates active tab on Recipe Form
     */
    private activateRecipeTab( idx: number )
    {
        // Display table for current tab and highlight background of current tab
        this.tables[idx].style.display = 'block'
        this.tabs[idx].style.background = '#F5F5F5'
        
        // For all other tabs - hide their tables and dim background
        for ( let i = 0; i < this.tables.length; i++ )
        {
            if ( i == idx )
                continue
            
            this.tables[i].style.display = 'none'
            this.tabs[i].style.background = '#E5E5E5'
        }
    }
    
    /**
     * Method for displaying form for editing existing recipe
     * @param idx - Recipe array index for current recipe
     * @param recipeForm - Recipe form TypeScript ID
     */
    editRecipe( idx: number, recipeForm: any )
    {
        let rcp = this.dataService.getRecipe( idx )
        
        this.recipe = rcp.name
        this.estTime = String(rcp.estimatedTime)
        this.ingredients = rcp.ingredients
        this.instructions = rcp.instructions
        this.idx = idx
        
        recipeForm.style.display = 'inline-block'
        
        this.activateRecipeTab(0)
    }
    
    /**
     * Method for saving information entered through recipe form
     * @param recipeForm - Recipe form TypeScript ID
     * @param newRecipeBtn - Button for creating new recipe TypeScript ID
     */
    saveForm( recipeForm: any, newRecipeBtn: any )
    {
        let idx = this.idx
        
        // If it's new recipe
        if ( idx < 0 )
            // Create Recipe object based on available info for current recipe and add it to array of recipes
            this.dataService.addNewRecipe( new Recipe( this.recipe, this.ingredients, this.instructions, Number(this.estTime) ) )
        
        // If it's existing recipe
        else
            // Save current recipe info in the Recipe array
            this.dataService.updateRecipe( idx, this.recipe, this.ingredients, this.instructions, Number(this.estTime) )
        
        this.closeForm( recipeForm, newRecipeBtn )
    }
    
    /**
     * Method for adding new ingredient to recipe form
     * @param ingrName - Ingredient name TypeScript ID
     * @param ingrQty - Ingredient quantity TypeScript ID
     */
    newIngredient( ingrName: any, ingrQty: any )
    {
        // Create new Ingredient object based on entered info 
        // and add it to array of ingredients for current recipe
        this.ingredients.push( new Ingredient( ingrName.value, ingrQty.value ) )
        
        // Clear field values for Ingredient name and Ingredient name form fields
        ingrName.value = ''
        ingrQty.value = ''
    }
    
    /**
     * Method for adding new Instruction for current recipe
     * @param instr - Instruction form field TypeScript ID
     */
    newInstruction( instr: any )
    {
        this.instructions.push( instr.value )
        instr.value = ''
    }
    
    /* Saves Form tables and tabs TypeScript IDs on load of form
     * @param tbls - Array of TypeScript IDs for form tables
     * @param tabs - Array of TypeScript IDs for form tabs
     */
    onLoad( tbls: any[], tabs: any[] )
    {
        this.tables = tbls
        this.tabs = tabs
    }
    
    /**
     * Method invoked when editing or updating ingredient info
     * @param ingrName - Ingredient name TypeScript ID
     * @param ingrQty - Ingredient quantity TypeScript ID
     * @param btn - Invoked button TypeScript ID
     * @param idx - Recipe array index for current recipe
     */
    editIngredient( ingrName: any, ingrQty: any, btn: any, idx: number )
    {
        // If it's Edit button that invoked the method
        if ( btn.value == '[ _ ]' )
        {
            this.makeAvailableToEdit( ingrName )
            this.makeAvailableToEdit( ingrQty )
            
            // Change button name to Update <┘
            btn.value = '<┘'
        }
        
        // Otherwise, if it's Update button that invoked the method
        else
        {
            // Change button name to Edit
            btn.value = '[ _ ]'
            
            this.makeUnvailableToEdit( ingrName )
            this.makeUnvailableToEdit( ingrQty )
            
            // Save Ingredient name and quantity into Ingredients array for current recipe
            this.ingredients[idx].name = ingrName.value
            this.ingredients[idx].quantity = ingrQty.value
         }
    }
    
    /**
     * Method invoked when editing or updating Instruction
     * @param instr - Instruction TypeScript ID
     * @param btn - Button's that invoked the method TypeScript ID
     * @param idx - Index of current recipe
     */
    editInstruction( instr: any, btn: any, idx: number )
    {
        // If it's Edit button that invoked the method
        if ( btn.value == '[ _ ]' )
        {
            this.makeAvailableToEdit( instr )
            
            // Change button name to Update
            btn.value = '<┘'
        }
        
        // Otherwise, if it's Update button that invoked the method
        else
        {
            // Change button name to Edit
            btn.value = '[ _ ]'
            
            this.makeUnvailableToEdit( instr )
            
            // Save Instruction to Instructions array for current recipe
            this.instructions[idx] = instr.value
         }
    }
    
    /*
     * Makes field available to edit
     * @param field - Field TypeScript ID
     */
    private makeAvailableToEdit( field: any )
    {
        // Make field available for editing
        field.removeAttribute( 'disabled' )
        
        // Change background color to white
        field.style.background = '#FFF'
    }
    
    /*
     * Makes field unavailable to edit
     * @param field - Field TypeScript ID
     */
    private makeUnvailableToEdit( field: any )
    {
        // Make field unavailable for editing
        field.setAttribute( 'disabled', 'disabled' )
        
        // Change background color to color for unavailable field
        field.style.background = '#FAFAFA'
    }
    
    /**
     * Method invoked by Delete button for Recipe
     * @param idx - Index of current recipe in the array of Recipes
     */
    delRecipe( idx: number )
    {
        this.dataService.deleteRecipe( idx )
    }
    
    /**
     * Method invoked by Delete button for Ingredient
     * @param idx - Index of current recipe in the array of Recipes
     */
    delIngredient( idx: number )
    {
        this.ingredients.splice( idx, 1 )
    }
    
    /**
     * Method invoked by Delete button for Instruction
     * @param idx - Index of current recipe in the array of Recipes
     */
    delInstruction( idx: number )
    {
        this.instructions.splice( idx, 1 )
    }
    
    /**
     * Method invoked when closing Recipe form
     * @param recipeForm - Recipe form TypeScript ID
     * @param newRecipeBtn - New Recipe button TypeScript ID
     */
    closeForm( recipeForm: any, newRecipeBtn: any )
    {
        // Hide recipe form
        recipeForm.style.display='none'
        // Display New Recipe button
        newRecipeBtn.style.display='block'
        
        // Clear fields used in Recipe form
        this.clearRecipeFormFields()
    }
}