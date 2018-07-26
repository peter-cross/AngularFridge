/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { Item } from '../core/core.component';

@Component( {
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.css']
} )

export class FridgeComponent implements OnInit 
{
    @Input() toAdd: Item[]
    @Input() toRemove: Item[]
    
    // Array of Form tables
    tables: any[]
    
    // Array of Form tabs
    tabs: any[]
    
    namePattern = "[A-Za-z\d]+[\w\-\.]*[A-Za-z\d]+"
    qtyPattern = "^[1-9][0-9]*$"
    
    constructor( private dataService: DataService ) 
    { }

    ngOnInit() 
    { }

    /* Saves Form tables and tabs TypeScript IDs on load of form
     * @param tbls - Array of TypeScript IDs for form tables
     * @param tabs - Array of TypeScript IDs for form tabs
     */
    onLoad( tbls: any[], tabs: any[] )
    {
        this.tables = tbls
        this.tabs = tabs
    }
    
    activateFormTab( idx: number ) 
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
    
    newItem( itemName: any, itemQty: any )
    {
        let itm = new Item( itemName.value, Number( itemQty.value ) )
        
        this.toAdd.push( itm )
        
        itemName.value = ''
        itemQty.value =''
    }
    
    delItem( i: number )
    {
        this.toAdd.splice( i, 1 )
    }
    
    delFridgeItem( i: number )
    {
        if ( this.dataService.itemQty(i) <= 0 )
           this.dataService.deleteItem(i) 
    }
    
    saveForm( form: any, newBtn: any )
    {
        let itm: Item
        let qty: number
        let cntQty: number
        
        for ( let i = 0; i < this.toAdd.length; i++ )
        {
            itm = this.toAdd[i]
            qty = Number( itm.quantity )
            
            if ( qty > 0 )
                if ( i < this.dataService.qtyOfItems() )
                    this.dataService.addItemQty( i, qty )
                else
                    this.dataService.addNewItem( new Item( itm.name, Number(itm.quantity) ) )
                
            itm.quantity = ''
        }
            
        for ( let i = 0; i < this.toRemove.length; i++ )
        {
            itm = this.toRemove[i]
            qty = Number( itm.quantity )
            
            if ( qty > 0 )
                this.dataService.removeItemQty( i, qty )
                
            itm.quantity = ''
        }
        
        this.closeForm( form, newBtn )
    }
    
    closeForm( form: any, newBtn: any )
    {
        // Hide form
        form.style.display='none'
        
        // Display New Recipe button
        newBtn.style.display='block'
    }
    
    addRemoveItems( form: any, newBtn: any )
    {
        let itmName: string 
        
        this.toAdd = new Array<Item>()
        this.toRemove = new Array<Item>()
        
        let qtyOfItems = this.dataService.qtyOfItems()
        
        for ( let i = 0; i < qtyOfItems; i++ )
        {
            itmName = this.dataService.itemName(i)
            
            this.toAdd.push( new Item( itmName, 0 ) )
            this.toRemove.push( new Item( itmName, 0 ))
        }
        
        form.style.display = 'inline-block'
        newBtn.style.display = 'none'
        
        this.activateFormTab(0)
    }
}