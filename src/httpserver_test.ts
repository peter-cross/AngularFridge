/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Item, Ingredient, Recipe } from "./app/core/core.component";

import * as request from "request"
import * as express from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
//import * as jasmine from "jasmine"


const corsOptions = 
{
    origin: '*',
    optionsSuccessStatus: 200    
}

//let test = jasmine()

let app = express()
app.use( cors( corsOptions ) )

app.get( '/', function( request: any, response: any )
{
    response.send( '!!! << Http Server Testing >> !!!' ) 
} )
app.listen( 4000 )

class HttpServerTest
{
    constructor()
    {
        /*
        describe( 'HttpServerTest', () => 
        {
            let myClass: HttpServerTest;
            let fixture: ComponentFixture<HttpServerTest>;
            
            beforeEach( async(() => 
            {
                TestBed.configureTestingModule(
                {
                  declarations: [ HttpServerTest ]
                } )
                .compileComponents();
            } ) )
            
            beforeEach( () => 
            {
                fixture = TestBed.createComponent( HttpServerTest )
                myClass = fixture.componentInstance
                fixture.detectChanges()
            } )
            
            it( 'should create CoreComponent', () => 
            {
                expect( myClass ).toBeTruthy();
            } )
            
            //this.classItemTest()
            //this.classIngredientTest()
            //this.classRecipeTest()
            
        } )
        */
    }    
        
    /*    
    classItemTest()
    {
        let itmName = 'Item name'
        let itmQty = 5
    
        let itmObj = new Item( itmName, itmQty )
    
        it( 'creates Item object', async(() => 
        {
            expect( itmObj ).not.toBe( null )
        }) );
    
        it( 'initializes Item name', async(() => 
        {
            expect( itmObj.name ).toBe( itmName )
        }) );
    
        it( 'initializes Item quantity', async(() => 
        {
            expect( itmObj.quantity ).toBe( itmQty )
        }) ); 
    }
    
    classIngredientTest()
    {
        let ingrName = 'Ingredient name'
        let ingrQty = 5
         
        let ingrObj = new Ingredient( ingrName, ingrQty )
        
        it( 'creates Ingredient object', () => 
        {
            expect( ingrObj ).not.toBe( null )
        } );
        
        let addQty = 20
        let subtQty = 15
        
        it( 'adds Ingredient quantity ' + addQty, () => 
        {
            ingrObj.add( addQty )
            
            expect( ingrObj.quantity ).toBe( ingrQty + addQty )
        
        } );
        
        it( 'subtracts Ingredient quantity ' + subtQty, () => 
        {
            ingrObj.subtract( subtQty )
            
            expect( ingrObj.quantity ).toBe( ingrQty + addQty - subtQty )
        } );
    }
    
    classRecipeTest()
    {
        let ingr1 = new Ingredient( 'Ingredient 1', 10 )
        let ingr2 = new Ingredient( 'Ingredient 2', 20 )
        let ingr3 = new Ingredient( 'Ingredient 3', 30 )
        
        let ingredients = [ ingr1, ingr2, ingr3 ]
        
        let instr1 = 'Instruction 1'
        let instr2 = 'Instruction 2'
        let instr3 = 'Instruction 3'
        
        let instructions = [ instr1, instr2, instr3 ]
        
        let estimatedTime = 30
        
        let rcpObj = new Recipe( "Recipe 1", ingredients, instructions, estimatedTime )
        
        it( 'creates Recipe object', () => 
        {
            expect( rcpObj ).not.toBe( null )
        } );
           
        it( 'verifies that ingredients are stored correctly in Recipe object', () => 
        {
            for ( var i = 0; i < ingredients.length; i++ )
            {
                let ingr = rcpObj.ingredients[i]
                
                expect( ingr ).toBe( ingredients[i] )
                expect( ingr.name ).toBe( ingredients[i].name )
                expect( ingr.quantity ).toBe( ingredients[i].quantity )
            }
        } );
        
        it( 'verifies that instructions are stored correctly in Recipe object', () => 
        {
            for ( var i = 0; i < instructions.length; i++ )
            {
                let instr = rcpObj.instructions[i]
                
                expect( instr ).toBe( instructions[i] )
            }
        } );
        
        it( 'verifies that estimted time is stored correctly in Recipe object', () => 
        {
            let estTime = rcpObj.estimatedTime
            
            expect( estTime ).toBe( estimatedTime )
        } );
        
        it( 'adds item to recipe ', () => 
        {
            let newIngr = new Ingredient( 'New ingredient', 50 )
            
            rcpObj.addItem( newIngr )
            
            let addedItem = rcpObj.ingredients[ rcpObj.ingredients.length-1 ]
            
            expect( addedItem ).toBe( newIngr )
        } );
        
        it( 'adds instruction to recipe ', () => 
        {
            let newInstr = 'New instruction'
            
            rcpObj.addInstruction( newInstr )
            
            let addedInstr = rcpObj.instructions[ rcpObj.instructions.length-1 ]
            
            expect( addedInstr ).toBe( newInstr )
        } );
    }
    */
}