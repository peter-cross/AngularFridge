/** Program Name : Angular Fridge
 ** Author : Peter Cross
 ** Date : July 26, 2018
 */

import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

describe( 'AppComponent', () => 
{
    /*
    beforeEach( async(() => 
    {
        TestBed.configureTestingModule( 
        {
            declarations: [ AppComponent ],
            imports : [ FormsModule ]
        } )
        .compileComponents();
    }) );
  
    appComponentTest()
    */
} );

function appComponentTest()
{
    it('should create the app', async(() => 
    {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    } ));
  
    it(`should have as title 'CPSC2261 Lab Project'`, async(() => 
    {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('CPSC2261 Lab Project');
    }));
  
    it('should render title in a h1 tag', async(() => 
    {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('h1').textContent).toContain('CPSC2261 Lab Project');
    }));
} 