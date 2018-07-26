/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { Item } from "../core/core.component";
import { Ingredient } from "../core/core.component";
import { Recipe } from "../core/core.component";
import { Fridge } from "../core/core.component";

import { RecipeComponent } from "./recipe.component"


describe( 'RecipeComponent', () => 
{
    /*
    let component: RecipeComponent;
    let fixture: ComponentFixture<RecipeComponent>;

    beforeEach( async( () => 
    {
        TestBed.configureTestingModule( {
            declarations: [ RecipeComponent ],
            imports : [ FormsModule ]
        } )
        .compileComponents();
    } ) );

    beforeEach( () => 
    {
        fixture = TestBed.createComponent( RecipeComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } );

    it( 'should create RecipeComponent', () => 
    {
        expect(component).toBeTruthy();
    } );
    
    
    
    let ingr1 = new Ingredient( 'Ingredient 1', 10 )
    let ingr2 = new Ingredient( 'Ingredient 2', 20 )
    let ingr3 = new Ingredient( 'Ingredient 3', 30 )
    
    let ingredients1 = [ ingr1, ingr2, ingr3 ]
    let ingredients2 = [ ingr2, ingr3, ingr1 ]
    let ingredients3 = [ ingr3, ingr1, ingr2 ]
    
    let instr1 = 'Instruction 1'
    let instr2 = 'Instruction 2'
    let instr3 = 'Instruction 3'
    
    let instructions1 = [ instr1, instr2, instr3 ]
    let instructions2 = [ instr2, instr3, instr1 ]
    let instructions3 = [ instr3, instr1, instr2 ]
    
    let estimatedTime1 = 10
    let estimatedTime2 = 20
    let estimatedTime3 = 30
    
    let rcp1 = new Recipe( "Recipe 1", ingredients1, instructions1, estimatedTime1 )
    let rcp2 = new Recipe( "Recipe 2", ingredients2, instructions2, estimatedTime2 )
    let rcp3 = new Recipe( "Recipe 3", ingredients3, instructions3, estimatedTime3 )
    
    it( 'creates Recipe 1 object', () => 
    {
        expect( rcp1 ).not.toBe( null )
    } );
       
    it( 'creates Recipe 2 object', () => 
    {
        expect( rcp2 ).not.toBe( null )
    } );
       
    it( 'creates Recipe 3 object', () => 
    {
        expect( rcp3 ).not.toBe( null )
    } );
       
    let rcpCmp = new RecipeComponent( null )   
    
    it( 'creates RecipeComponent', () => 
    {
        expect( rcpCmp ).not.toBe( null )
    } );
    
    it( 'creates array of Recipes', () => 
    {
        rcpCmp.ngOnInit()
        
        expect( rcpCmp.recipes ).not.toBe( null )
    } );
    
    it( 'adds Recipe 1 to array of Recipes', () => 
    {
        rcpCmp.recipes.push( rcp1 )
        expect( rcpCmp.recipes[0] ).toBe( rcp1 )
    } );

    it( 'adds Recipe 2 to array of Recipes', () => 
    {
        rcpCmp.recipes.push( rcp2 )
        expect( rcpCmp.recipes[1] ).toBe( rcp2 )
    } );
    
    it( 'adds Recipe 3 to array of Recipes', () => 
    {
        rcpCmp.recipes.push( rcp3 )
        expect( rcpCmp.recipes[2] ).toBe( rcp3 )
    } );
    
    it( 'deletes Recipe 1 from array of Recipes', () => 
    {
        rcpCmp.delRecipe( 0 )
        expect( rcpCmp.recipes.length ).toBe( 2 )
        expect( rcpCmp.recipes[0] ).toBe( rcp2 )
        expect( rcpCmp.recipes[1] ).toBe( rcp3 )
    } );
    
    it( 'deletes Recipe 2 from array of Recipes', () => 
    {
        rcpCmp.delRecipe( 0 )
        expect( rcpCmp.recipes.length ).toBe( 1 )
        expect( rcpCmp.recipes[0] ).toBe( rcp3 )
    } );
    
    it( 'updates changes in browser', () => 
    {
        component.recipes = rcpCmp.recipes
        fixture.detectChanges()
    } )
    */
       
} );