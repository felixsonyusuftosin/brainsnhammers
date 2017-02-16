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
loading:boolean = false;
item:any;
inview:any;
objects:any = [];
buildingtype:number= 0;
bedroom:number = 0;
bathroom:number = 0;
location:string = "";
lat:number = 0;
lng:number = 0;


personlist:any[] = [];
personmessagelist:any[] = [];
subscription:Subscription;
layer:string;
listselect:any[] = [];
    @ViewChild('example_id') el: ElementRef;
     @ViewChild('exampleid2') el2: ElementRef;
    @Input() options: any;
    @Output() summernoteInstance: EventEmitter<any> = new EventEmitter();

  constructor (private elementRef: ElementRef, public mapclass: MapObjectService, public data: DataService) { 
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
openmodal2(i){
  if (! this.modal){
    this.inview = i;
    console.log(this.inview);
   this.modal = true;
  }else{
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
search(){
  this.loading = true;
  this.data.getlocation(this.location)
.then((dat)=>{
  console.log(dat)
  this.loading = true;
  let lat = dat[0].lat;
   let lng = dat[0].lng;
   console.log(lat)
  this.data.getamazon(this.buildingtype, this.bedroom, this.bathroom, lng, lat )
  .then((dd)=>{
    this.loading = false;
   // this.objects = dd.properties;
    let count = 0;
    this.objects = dd.properties.map((it)=>{
        count += 1;
        if (count > 2){
          count = 1
        }
        if (count == 1){
          it.classname = "fl";
        } else{
          it.classname ="fr";
        }
        it.imlist = this.rand(0,9);
        let mapeed = it.pics.map((itc)=>{
          let mp = "data:image/jpeg;base64,"+ itc;
          return mp;
        });
       it.pics=  mapeed;
       return it;
    });
   let gei = this.convertdata(this.objects);
   this.mapclass.loadgeojson(gei)

  }).catch((err)=>{console.log(err)
     this.loading = false;
  });
}).catch((err)=>{console.log(err)
    this.loading = false;
});

  
}
rand(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
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

convertdata(data):any{
let feature:any = [];
let output = data.map(dat=>{
	 let rand = {geometry:{'type':'Point',coordinates:[dat.lon, dat.lat]}, type:'Feature',properties:{_id :dat.id,  propertyType:dat.propertyType, price:dat.price, state:dat.state}}
feature.push(rand)
return rand
});

let unconv  = {
'crs': 
	 {type: 'link', properties: 
	{href: 'http://spatialreference.org/ref/epsg/4326/', type: 'proj4'}},type:'FeatureCollection', features:output};
//let conv = JSON.stringify(unconv)
return unconv
}

}
