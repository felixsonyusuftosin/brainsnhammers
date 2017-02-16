import { Injectable } from '@angular/core';
import * as Leaflet from 'leaflet';
//import '../../www/buid/js/leaflet-bing-layer'
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

declare const L: any;
const pulse = require('leaflet-pulse-icon');
const Routing = require('leaflet-routing-machine');
const bing = require('leaflet-bing-layer');
const easybutton = require('leaflet-easybutton');
const extraMarkers = require('leaflet-extra-markers');
const zoomBox = require('leaflet-zoombox');
@Injectable()
export  class MapObjectService{
options:any = {'bingMapsKey':' AuyEx9iRRzYb8lUwuLFvNvRttyzrgrgLDNLcFp8IYSSC1z93fYIcxfp-298VK__L','imagerySet':'Road',attribution: '' }
optionssat:any = {'bingMapsKey':' Ap1SHDN96htRONGcKqC5ZJxlY8svqfFfFOOgESUURUk5GWVwtwmeQdUVduOst8TF','imagerySet':'Aerial',attribution: '' }
optionsboth:any  = {'bingMapsKey':' Ap1SHDN96htRONGcKqC5ZJxlY8svqfFfFOOgESUURUk5GWVwtwmeQdUVduOst8TF','imagerySet':'AerialWithLabels' ,attribution: '' }
map:any;
bingLayer:any =   L.tileLayer.bing(this.options);
userclick:any;
userlat:any; 
geodist:number;
cc:any;
userlng:any;
interact: any;
private interactstream = new BehaviorSubject<any>({});
interact2: any;
private interactstream2 = new BehaviorSubject<any>({});
usernumber:number = 20;
userdistance:number  = 20;
currentid:any;
markerlayer:any;
bingLayerSat:any =   L.tileLayer.bing(this.optionssat);
bingLayerBoth:any =   L.tileLayer.bing(this.optionsboth);
//graphopper = L.Routing.graphHopper('5f4ee7ea-7e82-4acb-bc70-0b7350238863'); 
zoomTo:boolean = false;
attr:string =  'Swicth to Satelite';
extent:any = [];
featuregroup:any;
routes:any;
mainLayer:any;
latlng:any;
inset:any =L.tileLayer.bing(this.optionsboth);
active:any;
currentlat:any;
watch:any;
public distance:number;
routingparams:Observable<any>;
public time:number;
routingstat:boolean;
viewmap:any;
public literature:any[];
lat:number = 0;
lng:number = 0;
latwatch:number = 0;
fullextent:any;
lngwatch:number = 0;
mapinset:any;
mapinset2:any;
fromlat:number = 0;
fromlng:number = 0;
tolat:number = 0;
tolng:number = 0;
bounds:any;
geoj:any;
userclick1:any;
userclick2:any;

pulsingIcon :any;
locationMarker:Leaflet.Marker;	
latwatch2:number = 0;
lngwatch2:number = 0;
queryAPIurl =  'http://isemgeospatials.com';
extentCount:number = 0;
id:string;
geojson2:any;
layergroup:any;
output:any[] = [];
mapcount:number = 0;
//navCtrl:NavController;
//navParams: NavParams;
zoomControl:boolean = false;
//layers:any[] = [{'Google street': this.bingLayer}];
frontLayer:any = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '',
//maxZoom: 31,
   id: 'isem',
    accessToken: 'sk.eyJ1IjoiaXNlbSIsImEiOiJjaXVmanVqeHAwMDFpMnpveXphcm0waGhwIn0.9b5X9VzIkAmWU_DEj_-fFQ'
});

//frontLayer:any = new Leaflet.Google('ROADMAP');
view:any[] =[6.53023418949625,3.3561515808105473];

zoom:number = 12;
previousextent:boolean = false;
 p:any;
preitems:any;
constructor(){
  this.viewmap = 'sat';
  this.interact = this.interactstream.asObservable();
   this.interact2 = this.interactstream2.asObservable();
}
 
 
switchbase(layer){	
  let layerbase;
  switch(layer){
case 'sat':		
	layerbase = this.bingLayerBoth;
  this.attr = 'Swith to Map';
  this.viewmap = "road"
		break;
	case 'road':
	layerbase = this.bingLayer;
  this.viewmap = "sat"
   this.attr = "Swith to Satelite";
		break;
	case 'both':
	layerbase = this.bingLayerBoth;
  this.viewmap = "road"
   this.attr = "Swith to Map";
		break;

	default:
		layerbase = this.bingLayerSat;		
}//switch  
	this.map.removeLayer(this.mainLayer); 
  this.mapinset.removeLayer(this.inset);
  this.inset = this.mainLayer;
  this.mainLayer = layerbase;
	this.map.addLayer(layerbase);
  this.mapinset.addLayer(this.inset); 
 
  }//switchbase 

initializeinset():Promise<any>{
let th = this;
return new Promise(resolve=>{
th.mapinset =L.map('mapinset', {zoomControl:false, fadeAnimation:true,zoomAnimation:true,  inertia:true}).setView(th.view, 6).invalidateSize(true);
console.log(th.inset)
th.mapinset.addLayer(th.inset);
th.fullextent = th.mapinset.getBounds();
th.mapinset.invalidateSize(true);
  resolve(th.map)
  })
}
invalidateinset(map){
let th = this  
window.setTimeout(function() {
 th.mapinset.invalidateSize(null);  
   }, 1000); 

}
initializeinset2():Promise<any>{
let th = this;
return new Promise(resolve=>{
th.mapinset =L.map('mapinset2', {zoomControl:false, fadeAnimation:true,zoomAnimation:true,  inertia:true}).setView(th.view, 6).invalidateSize(true);
console.log(th.inset)
th.mapinset.addLayer(th.inset);
th.fullextent = th.mapinset.getBounds();
th.mapinset.invalidateSize(true);
  resolve(th.map)
  })
}
invalidateinset2(map){
let th = this  
window.setTimeout(function() {
 th.mapinset.invalidateSize(null);  
   }, 1000); 

}
onesearch(){
const th = this;
th.map.on('click', function(e) {
    th.userlat =  e.latlng.lat ;
    th.userlng = e.latlng.lng;
    try{
      th.map.removeLayer(th.userclick)
    }catch(err){};
    let iconn = L.icon.pulse({iconSize:[10,10],color:'green'});
    th.userclick =  L.marker([ e.latlng.lat,  e.latlng.lng],{icon: iconn}).addTo(th.map);
    let data = {lat: e.latlng.lat,  lng:e.latlng.lng}
    th.interactstream.next(data);
  
});
}
ontwo(){
const th = this;
th.off();
th.map.on('click', function(e) {
 
  th.mapcount= th.mapcount + 1;
    console.log(th.mapcount);
    if (th.mapcount === 1){
    try{
    th.map.removeLayer(th.userclick1)
    }catch(err){};
    th.fromlat =  e.latlng.lat;
    th.fromlng = e.latlng.lng;
    let iconn = L.icon.pulse({iconSize:[10,10],color:'green'});
    th.userclick1 =  L.marker([ e.latlng.lat,  e.latlng.lng],{icon: iconn}).addTo(th.map);
    }else if(th.mapcount === 2){
        try{
    th.map.removeLayer(th.userclick2);
    }catch(err){};
     th.tolat =   e.latlng.lat;
     th.tolng =  e.latlng.lng;
    let iconn = L.icon.pulse({iconSize:[10,10],color:'red'});
    th.userclick2=  L.marker([ e.latlng.lat,  e.latlng.lng],{icon: iconn}).addTo(th.map);
     console.log(th.userclick2);
    let data = {fromlat: th.fromlat, fromlng:th.fromlng,  tolat:th.tolat, tolng:th.tolng}
    th.interactstream2.next(data);
    }  else{
      this.mapcount = 0;
       try{
        th.map.removeLayer(th.userclick1)
         }catch(err){};
         try{
      th.map.removeLayer(th.userclick2)
    }catch(err){};
    }
});
}
off(){
  this.mapcount = 0;
  this.map.off('click');
         try{
      this.map.removeLayer(this.userclick1)
    }catch(err){};
           try{
      this.map.removeLayer(this.userclick2)
    }catch(err){};
    this.output = [];

}

insetmap(){
  let th = this;
  th.map.on('dragend',function(){
  th.mapinset.setView(th.map.getCenter());
  th.mapinset.setZoom(th.map.getZoom() + 1) ;
  })
  th.map.on('zoomend',function(){
  console.log(th.map.getCenter());
  console.log(th.map.getZoom());
  th.mapinset.setView(th.map.getCenter());
  th.mapinset.setZoom(th.map.getZoom() + 1) ;
  })

  th.mapinset.on('dragend',function(){
  th.map.setView(th.mapinset.getCenter());
  })
}

initialize():Promise<any>{

let th = this;
return new Promise(resolve=>{
th.map =L.map('map', {zoomControl:true, fadeAnimation:true,zoomAnimation:true, inertia:true, maxZoom:28}).setView(th.view, th.zoom).invalidateSize(true);
//th.map.addLayer(th.frontLayer); 
th.map.on('zoom',function(){
  if (th.map.getZoom() > 18){
   th.map.setZoom(18);
}
})

th.mainLayer = th.bingLayer;
th.map.addLayer(th.mainLayer);
th.fullextent = th.map.getBounds();
th.map.fitBounds(th.fullextent);
//th.map.setMaxBounds(th.fullextent);
th.map.invalidateSize(true);
L.easyButton('fa-crosshairs', function(btn, map){
    th.map.fitBounds(th.fullextent)
}).addTo(th.map);
let control = L.control.zoomBox({
    modal: true,  // If false (default), it deactivates after each use.  
                  // If true, zoomBox control stays active until you click on the control to deactivate.
    // position: "topleft",                  
    // className: "customClass"  // Class to use to provide icon instead of Font Awesome
     title: "Draw rectangle to zoom to map area, click to deactivate" // a custom title
});
th.map.addControl(control);
  resolve(th.map)
  })
}
invalidate(map){
let th = this  
window.setTimeout(function() {
  //alert('invalidate');
 th.map.invalidateSize(null);  
   }, 1000); 


}

    zoomend() {

    }

  watchandmark(){    
    let th = this;
    let map = th.map;
    th.watch.subscribe(data=>{
    th.latwatch2 = data.coords.latitude;
    th.lngwatch2 = data.coords.longitude;
    console.log('watch lat '+data.coords.latitude+'watch long '+data.coords.longitude);
    let lln:Leaflet.LatLng =Leaflet.latLng(data.coords.latitude,data.coords.longitude);    
    this.pulsingIcon = L.icon.pulse({iconSize:[18,18],color:'green'});
    /*if (th.locationMarker){
    try{map.removeLayer(th.locationMarker);}
     catch(err){console.log('no location marker');}
     th.locationMarker.setIcon(null);
    };
    th.locationMarker  = new Leaflet.Marker(lln,{icon: th.pulsingIcon});*/	
    if (!th.map.hasLayer(th.locationMarker)){	
    th.locationMarker  =  Leaflet.marker(lln,{icon: th.pulsingIcon});		
	//th.map.addLayer(th.locationMarker);
    }
    else{
       th.locationMarker.setLatLng(lln);
       th.locationMarker.fire('drag');
       th.locationMarker.fire('dragend');
       th.locationMarker.fire('moveend');
    }
	
    th.featuregroup = Leaflet.featureGroup([th.locationMarker, th.geoj]).addTo(th.map);
   // th.map.addLayer(th.featuregroup);
    th.bounds = th.featuregroup.getBounds();
    th.map.fitBounds(th.featuregroup.getBounds(), {});    
    //map.panTo(lln);
  },erro=>{
      console.log(erro);
  });
   
  }//watchandmark
    routeandmark(){    
    let th = this;
    let map = th.map;
    //let watch =Geolocation.watchPosition({enableHighAccuracy:false, timeout:4000})
    //th.watch.subscribe(data=>{
    /*th.fromlat = th.latwatch2;
    th.fromlng = th.lngwatch2;
    console.log('watch route lat '+th.fromlat+'watch route long '+th.fromlng);
    let lln:Leaflet.LatLng = new Leaflet.LatLng(th.fromlat, th.fromlng);    
    this.pulsingIcon = L.icon.pulse({iconSize:[10,10],color:'green'});
    if (th.locationMarker){
    try{map.removeLayer(th.locationMarker);}
     catch(err){console.log('no location marker');}
     th.locationMarker.setIcon(null);
    }
    th.locationMarker  = new Leaflet.Marker(lln,{icon: th.pulsingIcon});					
	map.addLayer(th.locationMarker);    
	map.panTo(lln);*/
    th.routing();
  /*},erro=>{
      console.log(erro);
  });*/
   
  }//watchandmark
locatepoint2(message, map){
  message.lat = parseFloat(message.lat);
  message.lng = parseFloat(message.lng);
  if (!this.currentid || !this.markerlayer){//case new reported case
     this.markerlayer = L.marker([message.lat,message.lng])
      this.currentid = message.id;
  }else{
    if (this.currentid === message.id){ //case same reported case
      try{
      map.removeLayer(this.markerlayer)
      }catch(err){
        console.log(err);
      }
      this.markerlayer = L.marker([message.lat,message.lng])
      this.currentid = message.id;
    }else{//case another reported case
      this.markerlayer = L.marker([message.lat,message.lng])
      this.currentid = message.id;
    }

  }
  this.markerlayer.bindPopup("Location at "+ message.localtime);
  console.log(this.markerlayer);
  map.addLayer(this.markerlayer);
 map.setView([message.lat, message.lng], 17);


}//locatepoint
locatepoint(actid, map, geoj){
  try{
  geoj.eachLayer(
    function(l){
    //l.setIcon(L.Icon.Default); 
    });  
  }
  catch(err){
   console.log(err);
  }

  let lat = actid._latlng.lat;
  let lng = actid._latlng.lng;
  let th = this;
let geojsonMarkerOptions = {className:'contai' , html :'<div class = "icon"></div> '};
let divmarker =  L.divIcon(geojsonMarkerOptions);
 this.latlng =L.marker([lat,lng], {icon:divmarker});
 //this.latlng.openPopup();
 actid.setIcon(divmarker);
let llng = L.latLng(lat,lng)
 map.setView([lat, lng], 10);


}//locatepoint
resetmap(){
this.output = [];
this.invalidate(this.map);
let map = this.map;
 try{
  this.map.removeLayer(this.userclick1)
 }catch(err){};
 try{
 this.map.removeLayer(this.userclick2)
    }catch(err){};
try{map.removeLayer(this.pulsingIcon);}
catch(err){console.log(err);}
try{map.removeLayer(this.featuregroup);}
catch(err){console.log(err);}
try{map.removeLayer(this.locationMarker);	}
catch(err){console.log(err);}
this.removeroutes();
try{
  map.removeLayer(this.userclick)
}catch(err){};
try{
  map.removeLayer(this.cc)
}catch(err){};
};
removeroutes(){
let map = this.map;
let routes = this.routes;
try{	
map.removeControl(this.routes);
this.routes.spliceWaypoints(0, 2);	
this.routes = null;
}
catch(err){
console.log('No control');	
}	
try{
this.geoj.clearLayers();
}catch(err){}
try{
this.layergroup.clearLayers();
}catch(err){}
this.off();
};
/*resetroutes(newroutes){
	this.setWaypoints(newroutes);	
};*/
addcontrol(){
let map = this.map;
let routes = this.routes;
 map.addControl(routes);
}

addroutes(){
let map = this.map;
let routes = this.routes;
this.removeroutes();
map.addControl(routes);	
}

routing(){
let th = this;
let tolat = this.tolat;
let tolng = this.tolng;
let fromlat = this.fromlat;
let fromlng = this.fromlng;
let map = this.map;
let newroute = false;
let distance;
let time;	
//let ro =  L.Routing.graphHopper('5f4ee7ea-7e82-4acb-bc70-0b7350238863'); 
try{		
map.removeControl(th.routes);
th.routes = null;
}
catch(err){
console.log('No control');	
}   
 try{	
  th.routes.spliceWaypoints(0, 2);
	th.routes = null;
}
 catch(err){
	console.log('err');
 }	
th.routes =new L.Routing.control({
    waypoints: [
    L.latLng(th.latwatch2 ,th.lngwatch2),
    L.latLng(th.tolat, th.tolng)
            ],
	//router: this.graphopper,
	position:'bottomleft',
    routeWhileDragging:true,
    fitSelectedRoutes:true,	
    collapsible:true,
	show:false
	}).addTo(map);	
	th.map.invalidateSize({animate:true});   
    th.routes.on('routesfound', function(e){
    th.distance = parseFloat(((e.routes[0].summary.totalDistance) * 0.001).toFixed(2)) ;
    th.time = parseFloat(((e.routes[0].summary.totalTime) * 0.016667).toFixed(2));

    th.literature = [];
    th.literature = e.routes[0].instructions
    console.log(th.literature);
	//th.loadvalues();
	
   });
     console.log(this.distance + 'Distance is');
     console.log(this.time + 'time is');	
   
}
si(data){ 
  let redMarker;
   switch(data){
    case 'Maisonette':
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-truck',
    markerColor: 'red',
    shape: 'star',
    prefix: 'fa'
  });
      break;
    case 'Duplex':
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-motorcycle',
    markerColor: 'red',
    shape: 'circle',
    prefix: 'fa'
  });
      break;
    case 'Terrace':
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-male',
    markerColor: 'yellow',
    shape: 'square',
    prefix: 'fa'
  });
      break;
    case 'Flats':
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-bus',
    markerColor: 'green',
    shape: 'square',
    prefix: 'fa'
  });
      break;
    case 'Bungalow':
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-industry',
    markerColor: 'purple',
    shape: 'penta',
    prefix: 'fa'
  });
      break;
    case 'Others':
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-wheelchair-alt',
    markerColor: 'green',
    shape: 'circle',
    prefix: 'fa'
  });
   default:
    redMarker = L.ExtraMarkers.icon({
    icon: 'fa-star-o',
    markerColor: 'gray',
    shape: 'circle',
    prefix: 'fa'
  });
     }
return redMarker;
 }
loadgeojson (dat){
let map = this.map;
const th = this;
let data = dat;
console.log(data);
this.output = [];

th.layergroup = L.featureGroup();
if (! map.hasLayer(th.layergroup)){
map.addLayer(th.layergroup);
}else{
try {
map.removeLayer(th.layergroup);
th.layergroup.removeLayer(th.geoj);
map.addLayer(th.layergroup);
}catch(err) {
console.log(err);
}
th.layergroup.clearLayers();}
th.layergroup = null;
try{
th.geoj.clearLayers();
}catch(err){console.log(err)}
try{
th.layergroup.clearLayers();
}catch(err){}
th.geoj = {};
th.geoj =  L.geoJson(data,{
   pointToLayer : function(feature, latlng){
  //let geojsonMarkerOptions = {className:'contai' , html :'<div class = "icon"></div> '};
  let divmarker =  th.si(feature.properties.propertyType)
  th.geodist = feature.properties.price;
try{
let lmarker = L.marker(latlng, {icon:divmarker})
return lmarker;
}catch(err){console.log(err)};

},
onEachFeature :function(feature, layer){
let obj = {};
let  lay;
try{
let llng = layer._latlng;
let featlat = llng.lat;
layer.feature.riseOnHover = true;
obj['lat'] = llng.lat;
obj['lng'] = llng.lng;
					 /*$.each(feature.properties, function(k,v){						   
					   	obj[k] =  v;						  
					   });
                   obj.layer = feature.properties._id	
                   console.log(obj);*/
layer._leaflet_id = feature.properties.id;
th.output.push(feature.properties)

layer.bindPopup(feature.properties.id);
}catch(err){console.log(err)};

}

 });//loadgeojson
		//th.group();
try{
  map.removeLayer(th.layergroup);
  th.layergroup = null;
  map.fitBounds(th.fullextent);
}catch(err){console.log(err)}
try{
  map.removeLayer(th.cc);
}catch(err){};
//th.cc = L.circle(newl,th.geodist * 1000, {stroke:false, opacity:0.2, fillOpacity:0.1}).addTo(map);
th.layergroup =new L.featureGroup();
th.layergroup.addLayer(th.geoj);

let lg = th.layergroup;	
	
map.addLayer(th.layergroup);	
let bng = lg.getBounds();
map.fitBounds(bng);
if (map.getZoom() > 18) {
map.setZoom(18);
}
map.panInsideBounds(bng);
     //rs(th.output);


};

}
