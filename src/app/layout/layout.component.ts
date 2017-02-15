import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild, Input, Output, EventEmitter, ElementRef, ViewEncapsulation} from '@angular/core';
import { SocketService} from '../socket.service';
import {MapObjectService} from '../map-object.service';
import { DataService} from '../data.service';
import {Subscription} from 'rxjs/Subscription';
require('events').EventEmitter.prototype._maxListeners = 100;
//import * as jQuery from 'jquery';
declare var jQuery:any;
import 'ion-rangeslider';
let ionRangeSlider = require('ion-rangeslider');
//import 'summernote';
require('style!ion-rangeslider/css/ion.rangeSlider.css');
//let ionRangeSlider = require('ion-rangeslider');

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
El1: any;
 El2:any;
geoj:any;
map:any;
modal = false;
person:any;
item:any;
personlist:any[] = [];
personmessagelist:any[] = [];
subscription:Subscription;
layer:string;
listselect:any[] = [];
    @ViewChild('example_id') el: ElementRef;
     @ViewChild('exampleid2') el2: ElementRef;
    @Input() options: any;
    @Output() summernoteInstance: EventEmitter<any> = new EventEmitter();

  constructor (private elementRef: ElementRef, public mapclass: MapObjectService) { 
       this.layer = 'sat';
  }

  ngOnInit() {
  }
openmodal(){
  if (! this.modal){
   this.modal = true;
  }
  else{
    this.modal = false;
  }
}
switchbase(){
  if (this.layer === 'sat'){
       this.layer = 'road';
    this.mapclass.switchbase('sat');
 
  }else{
    this.layer = 'sat';
    this.mapclass.switchbase('road');
  
  }
}
ngAfterContentInit (){
     this.El1 = jQuery(this.el.nativeElement);
     console.log(this.El1);
     this.El1.ionRangeSlider({
    type: 'double',
    //grid: true,
    min: 0,
    max: 2000000000,
    from: 10000000,
    to: 1000000000,
    prefix: 'N'
   });
   this.El2 = jQuery(this.el2.nativeElement);
  this.El2.ionRangeSlider({
    type: 'double',
    //grid: true,
    min: 0,
    max: 2000000000,
    from: 10000000,
    to: 1000000000,
    prefix: 'N'
   });
  
     // this.subscription = this.socket.koler.subscribe(item => this.runitem(item) )
      this.mapclass.initialize().then((mapin) => {
      this.map = mapin;
      this.mapclass.initializeinset().then((map) => {
      this.mapclass.invalidateinset(map);
        this.mapclass.insetmap();
        //this.ld.convertdata(this.ld.alllist);
      });
      });
    //this.summernoteElement.summernote(this.options);
        //this.summernoteInstance.emit(this.summernoteElement);

}



}
