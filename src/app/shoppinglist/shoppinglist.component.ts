/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { Recipe, Item } from '../core/core.component';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component( {
  selector: 'app-shoppinglist',
  templateUrl: './shoppinglist.component.html',
  styleUrls: ['./shoppinglist.component.css']
} )

export class ShoppinglistComponent implements OnInit 
{
    idx: number
    listLength: number
    shoppingList: Item[]
    inFridge: Item[]
    
    constructor( private dataService: DataService ) 
    { }

    ngOnInit() 
    { 
        this.idx = -1
    }
    
    shoppingListAvailable(): boolean
    {
        
        if ( this.idx >= 0 )
            return this.shoppingList.length > 0
        else
            return false
    }

    updateShoppingList( $event: any )
    {
        if ( $event.currentTarget.value == '' )
        {
            this.idx = -1
            this.shoppingList = []
        }
        else
        {
            this.idx = Number( $event.currentTarget.value ) 
            this.shoppingList = this.dataService.shoppingList( this.idx )
        }
    }
}