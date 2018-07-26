import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpserverComponent } from './httpserver.component'
import { DataService } from '../data.service'
import { HttpdataService } from '../httpdata.service'
import { HttpClient } from '@angular/common/http'
import { Item, Ingredient , Recipe } from "../core//core.component";

import 'rxjs/add/operator/map'

import * as parser from "body-parser"
import * as request from 'request'
    
describe( 'HttpserverComponent', () => 
{
    let component: HttpserverComponent
    let fixture: ComponentFixture<HttpserverComponent>

    let srvURL = 'http://localhost:3000'
    
    let dataService: any
    let serviceSpy: jasmine.SpyObj<HttpClient>
    
    let serverComponent: HttpserverComponent
    
    beforeEach( async( () => 
    {
        let spy = jasmine.createSpyObj( 'HttpClient', ['getValue'] )
        
        TestBed.configureTestingModule(
        {
            declarations: [ HttpserverComponent ],
            providers: [ HttpdataService, {provide: HttpClient, useValue: spy} ]
            //providers: [ DataService, {provide: DataService, useClass: HttpdataService} ]
        } )
        .compileComponents()
        
        serviceSpy = TestBed.get( HttpClient )
        dataService = TestBed.get( HttpdataService )
    } ) )

    beforeEach( () => 
    {
        fixture = TestBed.createComponent( HttpserverComponent );
        component = fixture.componentInstance;
        fixture.detectChanges();
    } )

    it( 'component should be created', () => 
    {
        expect( component ).toBeTruthy();
    } )
    
    it( 'data service of component should be defined', () => 
    {
        expect( component.dataService ).not.toBe( null );
        //dataService = component.dataService
    } )
    
    it( 'data service should be created', () => 
    {
        expect( dataService ).not.toBe( null )
    } )
    
    let recipes: Recipe[]
    
    it( 'data service recipes should be retrieved', () => 
    {
        recipes = dataService.getRecipes()
        expect( recipes ).not.toBe( null )
    } )
    
    /*
    it( 'recipes array length should be greater than 0', () => 
    {
        expect( recipes.length ).not.toBe( 0 )
    } )
    
    it( 'server connection test', ( done ) => 
    {
        request.get( srvURL + '/', ( error, response, body ) => 
        {
            //expect( error ).toBe( null )
            
            //let data = JSON.parse( body )
            
            done()
        } )
        done()
    } )
    
    //request.get( srvURL )
     
    request( srvURL, function( error: any, response: any, body: any )
    {
        //console.log( 'error', error )
        //console.log( 'status code: ', response && response.statusCode )
        //console.log( 'body', body )
    } )
    
    let httpData = new HttpdataService( new HttpClient( null) ) )
    
    it( 'data service should be created', () => 
    {
        expect( httpData ).toBeTruthy();
    } )
    
    it( 'data service recepies should be retrieved', () => 
    {
        let recepies = httpData.getRecipes()
        let length = recepies.length
      
        //expect( length ).toBeGreaterThan( 0 );
    } )
    */
} )