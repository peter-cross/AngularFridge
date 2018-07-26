import { DataService } from '../data.service';
import { HttpdataService } from '../httpdata.service';
import { Component, OnInit } from '@angular/core';

@Component( {
  selector: 'app-httpserver',
  templateUrl: './httpserver.component.html',
  styleUrls: ['./httpserver.component.css']
} )

export class HttpserverComponent implements OnInit 
{

  constructor( public dataService: HttpdataService ) 
  { }

  ngOnInit() 
  { }

}