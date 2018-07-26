/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { DataService } from './data.service';
import { HttpdataService } from './httpdata.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
        
export class AppComponent 
{
    private title = 'Angular Fridge';
    
    private worker: Worker
    private imgData: any
    
    private apps: any[]
    private tabs: any[]
    private idx: number // active tab
    
    private about: any
    private canvas: any
    private image: any
    
    constructor( private dataService: DataService )
    { 
        self.onload = () => 
        {
            let ctxt = this.canvas.getContext( '2d' )
                
            this.worker = new Worker( 'scripts.js' )
            this.worker.onmessage = msg => ctxt.putImageData( msg.data, 0, 0 )
            
            this.drawOnCanvas()
        }
    }
    
    ngOnInit() 
    {
        this.dataService.retrieveData()
        this.idx = 0
    }
    
    onLoadTabs( apps: any[], tabs: any[], tabsDiv: any )
    {
        this.apps = apps
        this.tabs = tabs
        
        setTimeout( then => 
        {
            tabsDiv.style.display = 'block'
            this.activateTab(this.idx)
        }, 1500 )
    }
    
    /**
     * Activates active tab on the Form
     */
    private activateTab( idx: number )
    {
        // Display table for current tab and highlight background of current tab
        this.apps[idx].style.display = 'block'
        this.tabs[idx].style.background = '#F5F5F5'
        
        // For all other tabs - hide their tables and dim background
        for ( let i = 0; i < this.apps.length; i++ )
        {
            if ( i == idx )
                continue
            
            this.apps[i].style.display = 'none'
            this.tabs[i].style.background = '#E5E5E5'
        }
        
        this.idx = idx
    }
    
    private onLoadAbout( aboutForm: any, aboutCanvas: any, canvasImage: any )
    {
        if ( !this.canvas )
        {
            this.canvas = aboutCanvas
            this.image = canvasImage
            this.about = aboutForm
        }
        
        this.displayAbout()
    }
    
    private drawOnCanvas()
    {
        let ctxt = this.canvas.getContext( '2d' )
        
        let width = this.canvas.width
        let height = this.canvas.height
        
        ctxt.drawImage( this.image, 0, 0, width, height )
        this.imgData = ctxt.getImageData( 0, 0, width, height )
        
        this.worker.postMessage( [width, height, this.imgData] )  
    }
    
    private displayAbout()
    {
        if ( !this.about )
            return
        
        if( this.imgData )
            this.about.style.display = 'inline-block'
    }
    
    private closeAbout()
    {
        this.about.style.display = 'none'
        this.about = null
    }
}