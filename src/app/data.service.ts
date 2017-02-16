import { Injectable } from '@angular/core';
import * as Leaflet from "leaflet";
//import '../../www/buid/js/leaflet-bing-layer'
import { Observable } from 'rxjs/Rx/';
import {Http, Headers} from '@angular/http';
import {EventEmitter} from '@angular/core';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare var require: any;
declare let L: any;
declare let $:any;
let PouchDB = require('pouchdb');


@Injectable()
export class DataService {
static get parameters() {
    return [[Http]];
}
public userobserve: any; 
public userstream = new BehaviorSubject<number>(0);

 headers: Headers;
 username: string = 'siberobinsion';
password: string = 'password';
remote:string;
adminusername:string;
adminpassword:string;

objid:string;
admingroup:string;
usermodel:string = 'nemausermodel';
remoteuser: any;
userid:string;
userrev:string;
options:any;
localuser:any;
group: string;
totalregistereduser:any[];

 constructor(public http: Http) {
   this.totalregistereduser = [];
   this.headers  = new Headers();
     //this.headers.append('Content-Type', 'application/json');
   this.headers.append('Content-Type', 'multipart/form-data');
 
   }
getdata( num, stepp, latt, lngg): Promise<any> {
return new Promise(resolve =>{
 let th = this;
  
  if (! num){
    num = 20;
  }
   if(! stepp){
     stepp = 0.5;
   }
   let  headers = th.headers; 
  // th.headers.append('Content-Type', 'application/json');
    let params2= {lat: latt, lng:lngg, number:num, step:stepp};
    let params = JSON.stringify(params2);   
    console.log(params); 
   //th.headers.append('Parameter', params);
  let remote = 'http://isemgeospatials.com/getcrash/?lat=' + latt + '&lng=' + lngg + '&number=' + num + '&step=' + stepp;
  th.http.get(remote,  {headers:headers})
     .map(res => res.json())
      .subscribe(
       (data) => {
         let val = this.dosuccessget(data);
         if (val){
           resolve(data);
         }else{
         resolve(false);
         };
         },
      (err) =>{ this.doerror(err)
      resolve(false);
      },
      () => console.log('Post Complete')
    );
    })
}
getdata2( fromlat, fromlng, tolat, tolng): Promise<any> {
return new Promise(resolve =>{
 let th = this;
   let  headers = th.headers; 
  let remote = 'http://isemgeospatials.com/gettwocrash/?fromlat=' + fromlat + '&fromlng=' + fromlng + '&tolat=' + tolat + '&tolng=' + tolng;
  th.http.get(remote,  {headers:headers})
     .map(res => res.json())
      .subscribe(
       (data) => {
         let val = this.dosuccessget(data);
         if (val){
           resolve(data);
         }else{
         resolve(false);
         };
         },
      (err) =>{ this.doerror(err)
      resolve(false);
      },
      () => console.log('Post Complete')
    );
    })
}



getlocation( location ): Promise<any> {
return new Promise(resolve =>{
 let th = this;
   let  headers = th.headers; 
  let remote = 'http://isemgeospatials.com/geocode?address=' + location;
  th.http.get(remote,  {headers:headers})
     .map(res => res.json())
      .subscribe(
       (data) => {
         console.log(data);
         let val = this.dosuccessget(data);
         if (val){
           resolve(data);
         }else{
         resolve(false);
         };
         },
      (err) =>{ this.doerror(err)
      resolve(false);
      },
      () => console.log('Post Complete')
    );
    })
}

getamazon( ptid, bed, bath, lon, lat ): Promise<any> {
return new Promise(resolve =>{
 let th = this;
   let  headers = th.headers; 
  let remote = 'http://isemgeospatials.com/proxy?ptid='+ptid+'&bed='+bed+'&bath='+bath+'&lon='+lon+'&lat='+lat;
//let remote =  'http://ec2-54-213-206-59.us-west-2.compute.amazonaws.com:8080/BandHService/rest/property/search';
  th.http.get(remote)
    .map(res => res.json())
      .subscribe(
       (data) => {
         console.log(data);
         let val = this.dosuccessget(data);
         if (val){
           resolve(data);
         }else{
         resolve(false);
         };
         },
      (err) =>{ this.doerror(err)
      resolve(false);
      },
      () => console.log('Post Complete')
    );
    })
}


dosuccessget(data){
  if (data){
    return true
  }
  else{
    return false;
  }
}
doerror(err){
  console.log(err);
}


} //end of data class
