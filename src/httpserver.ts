/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { Item, Ingredient, Recipe } from "./app/core/core.component";

import * as request from "request"
import * as express from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
    
const corsOptions = 
{
    origin: '*',
    optionsSuccessStatus: 200    
}
            
let contents = new Array<Item>()
let recipes = new Array<any>()
      
/*
 * Class for Http Server
 */
export class HttpServer
{
    private path = '/'
    private port = 3000
    private app: any
    
    /*
     * Class constructor
     */
    constructor()
    {
        this.prepopulateRecipes()
        
        this.app = express()
        this.app.use( cors( corsOptions ) )
        this.app.use( bodyParser.json() )
        
        this.startServer()
        
        let srvURL = 'http://localhost:' + this.port + this.path
        
        request.get( srvURL, ( error, response, body ) => console.log( body + '\nHttp Server started ... ' ) )
    }  
    
    /*
     * Method specifies which methods will be invoked for different requests with different routes
     * Gets invoked when server starts
     */
    startServer()
    {
        this.app.get( this.path, this.callBack )
        
        this.app.get( '/recipelist', this.recipeList )
        this.app.get( '/retrieverecipe/:recipeIdx', this.retrieveRecipe )
        this.app.get( '/retrieverecipes/:recipeArray', this.retrieveRecipes )
        this.app.get( '/retrieverecipes', this.retrieveAllRecipes )
        this.app.get( '/deleterecipe/:recipeIdx', this.deleteRecipe )
        this.app.post( '/addrecipe', this.addRecipe )
        this.app.post( '/changerecipe/:recipeIdx', this.changeRecipe )
        
        this.app.get( '/fridgecontent', this.fridgeContent )
        this.app.get( '/additemqty/:itemIdx/:qty', this.addItemQty )
        this.app.get( '/removeitemqty/:itemIdx/:qty', this.removeItemQty )
        this.app.get( '/deleteitem/:itemIdx', this.deleteItem )
        this.app.post( '/additem', this.addItem )
        
        this.app.listen( this.port )    
    }
    
    /*
     * Method for server response for home page
     */
    callBack( request: any, response: any )
    {
        response.send( '!!! << Hello World >> !!!' ) 
    }
    
    /*
     * Method for server response on request to get fridge content
     */
    fridgeContent( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        response.json( contents )
    }
    
    /*
     * Method for server response on request to add item
     */
    addItem( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            contents.push( <Item>request.body )
            response.send( contents )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method for server response on request to add quantity for item specified by contents index
     */
    addItemQty( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            let idx = request.params.itemIdx
            let qty = Number( request.params.qty )
            let cntQty = Number( contents[idx].quantity )
        
            contents[idx].quantity = String( cntQty + qty )
            
            response.json( contents[idx].quantity )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method for server response on request to remove quantity of item specified by contents index
     */
    removeItemQty( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            let idx = request.params.itemIdx
            let qty = Number( request.params.qty )
            let cntQty = Number( contents[idx].quantity )
        
            contents[idx].quantity = String( cntQty - qty )
            
            response.json( contents[idx].quantity )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method for server response on request to delete item specified by content index
     */
    deleteItem( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            let idx = request.params.itemIdx
            contents.splice( idx, 1 )
        
            response.json( contents )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method for server response on request to get recipe list
     */
    recipeList( request: any, response: any )
    {
        let list = new Array<string>()
        
        for( let rcp of recipes )
            list.push( rcp.name )
        
        response.header( "Content-Type", "application/json" )
        response.json( list ) 
    }  
    
    /*
     * Method for server response on request to retrieve a recipe by recipe index
     */
    retrieveRecipe( request: any, response: any )
    {
        let idx = request.params.recipeIdx
        
        response.header( "Content-Type", "application/json" )
        response.json( recipes[idx] ) 
    }
    
    /*
     * Method for server response on request to retrieve recipe specified as array of recipe indexes
     */
    retrieveRecipes( request: any, response: any )
    {
        let idxArray = eval( request.params.recipeArray )
        let resArray: Recipe[] = []
        
        for ( let i = 0; i < idxArray.length; i++ )
            resArray.push( recipes[ idxArray[i] ] )
        
        response.header( "Content-Type", "application/json" )
        response.json( resArray )
    }
    
    /*
     * Method for server response on request to retrieve all recipes
     */
    retrieveAllRecipes( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        response.json( recipes )
    }
    
    /*
     * Method for server response on request to delete recipe specified by recipe index
     */
    deleteRecipe( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            let idx = request.params.recipeIdx
            recipes.splice( idx, 1 )
        
            response.json( recipes )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method for server response on request to add recipe
     */
    addRecipe( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            recipes.push( <Recipe>request.body )
            response.send( recipes )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method for server response on request to change recipe
     */
    changeRecipe( request: any, response: any )
    {
        response.header( "Content-Type", "application/json" )
        
        try
        {
            let idx = request.params.recipeIdx
            recipes[idx] = <Recipe>request.body
            response.send( recipes )
        }
        catch ( e )
        {
            response.json( false )
        }
    }
    
    /*
     * Method to populate arrays of fridge content and recipes with some default items and recipes
     */
    prepopulateRecipes()
    {
        let ingrName = [ 'Item 1', 'Item 2', 'Item 3', 'Item 4' ]
        let ingrQty = [ 11, 22, 33, 44 ]
        
        let ingr1 = new Ingredient( ingrName[0], ingrQty[0] )
        let ingr2 = new Ingredient( ingrName[1], ingrQty[1] )
        let ingr3 = new Ingredient( ingrName[2], ingrQty[2] )
        let ingr4 = new Ingredient( ingrName[3], ingrQty[3] )
        
        let ingrs1 = [ ingr1, ingr2, ingr3, ingr4 ]
        let instrs1 = [ 'Instruction 1', 'Instruction 2', 'Instruction 3' ]
        let time1 = 20
        let recipe1 = new Recipe( "Recipe 1", ingrs1, instrs1, time1 )
        
        let ingrs2 = [ ingr2, ingr1, ingr3, ingr4 ]
        let instrs2 = [ 'Instruction 2', 'Instruction 1', 'Instruction 3' ]
        let time2 = 30
        let recipe2 = new Recipe( "Recipe 2", ingrs2, instrs2, time2 )
        
        let ingrs3 = [ ingr3, ingr1, ingr2, ingr4 ]
        let instrs3 = [ 'Instruction 3', 'Instruction 1', 'Instruction 2' ]
        let time3 = 40
        let recipe3 = new Recipe( "Recipe 3", ingrs3, instrs3, time3 )
        
        recipes.push( recipe1 )
        recipes.push( recipe2 )
        recipes.push( recipe3 )
        
        contents.push( new Item(ingrName[0], 10) )
        contents.push( new Item(ingrName[1], 20) )
        contents.push( new Item(ingrName[2], 30) )
        contents.push( new Item(ingrName[3], 40) )
    }
}

// Start Http Server
new HttpServer()