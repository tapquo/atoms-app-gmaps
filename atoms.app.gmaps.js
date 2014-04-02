/* atoms v0.04.02
   http://atoms.tapquo.com
   Copyright (c) 2014 Tapquo S.L. - Licensed MIT */
(function(){"use strict";var __loadScript,__markerIcon,__parseAddress,__parseRouteSteps,__queryPlace,_ref,_ref1,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Atoms.Atom.GMap=function(_super){function GMap(){return this.__init=__bind(this.__init,this),_ref=GMap.__super__.constructor.apply(this,arguments)}return __extends(GMap,_super),GMap.template='<div {{#if.style}}class="{{style}}"{{/if.style}}></div>',GMap.base="GMap",GMap.events=["query","route"],GMap.prototype._map=null,GMap.prototype._markers=[],GMap.prototype._query=[],GMap.prototype._route=null,GMap.prototype.output=function(){var exists;return GMap.__super__.output.apply(this,arguments),exists=Atoms.$("[data-extension=gmap]").length>0,exists?this.__init():__loadScript(this.__init)},GMap.prototype.center=function(position,zoom_level){return null==zoom_level&&(zoom_level=8),this._map.setCenter(new google.maps.LatLng(position.latitude,position.longitude)),this.zoom(zoom_level)},GMap.prototype.zoom=function(level){return this._map.setZoom(level)},GMap.prototype.query=function(value){var parameters,service,_this=this;return parameters={},"string"!=typeof value?parameters.latLng=__queryPlace(value):parameters.address=value,this._query=[],service=new google.maps.Geocoder,service.geocode(parameters,function(results,status){var result;return status===google.maps.GeocoderStatus.OK&&(_this._query=function(){var _i,_len,_results;for(_results=[],_i=0,_len=results.length;_len>_i;_i++)result=results[_i],_results.push(__parseAddress(result));return _results}()),_this.bubble("query",_this._query)}),!0},GMap.prototype.marker=function(position,icon,animate){var marker;return null==animate&&(animate=!1),marker=new google.maps.Marker({map:this._map,icon:__markerIcon(icon),position:new google.maps.LatLng(position.latitude,position.longitude)}),animate&&marker.setAnimation(google.maps.Animation.BOUNCE),this._markers.push(marker),!0},GMap.prototype.route=function(origin,destination,mode,markers){var parameters,service,_this=this;return null==mode&&(mode="DRIVING"),this.clean(),service=new google.maps.DirectionsService,parameters={origin:__queryPlace(origin),destination:__queryPlace(destination),travelMode:google.maps.TravelMode.DRIVING},service.route(parameters,function(_route,status){return _this._route=_route,status===google.maps.DirectionsStatus.OK?(parameters={suppressMarkers:null!=markers},_this._route.renderer=new google.maps.DirectionsRenderer(parameters),_this._route.renderer.setMap(_this._map),_this._route.renderer.setDirections(_this._route),markers&&_this.__markersInRoute(markers),_this.bubble("route",_this._route)):void 0}),!0},GMap.prototype.routeInstructions=function(){var instructions,_ref1,_ref2;return instructions=null!=(_ref1=this._route)?null!=(_ref2=_ref1.routes[0])?_ref2.legs[0]:void 0:void 0,instructions&&(instructions={distance:instructions.distance.text,duration:instructions.duration.text,steps:__parseRouteSteps(instructions)}),instructions},GMap.prototype.clean=function(){var marker,_i,_len,_ref1,_ref2;for(_ref1=this._markers,_i=0,_len=_ref1.length;_len>_i;_i++)marker=_ref1[_i],marker.setMap=null;return this._markers=[],null!=(_ref2=this._route)&&_ref2.renderer.setMap(null),this._route=null},GMap.prototype.__init=function(){var _this=this;return setTimeout(function(){var options;return options={center:new google.maps.LatLng(43.256963,-2.923441),zoom:1,mobile:!0,sensor:!1,disableDefaultUI:!0},_this._map=new google.maps.Map(_this.el[0],options)},1e3)},GMap.prototype.__markersInRoute=function(markers){var end,instructions,start,_ref1,_ref2;return instructions=null!=(_ref1=this._route)?null!=(_ref2=_ref1.routes[0])?_ref2.legs[0]:void 0:void 0,markers.origin&&(start=instructions.start_location,console.log("origin",markers.origin),this.marker({latitude:start.k,longitude:start.A},markers.origin)),markers.destination?(end=instructions.end_location,this.marker({latitude:end.k,longitude:end.A},markers.destination)):void 0},GMap}(Atoms.Class.Atom),__loadScript=function(callback){var script;return window.google={maps:{}},script=document.createElement("script"),script.type="text/javascript",script.src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=console.log",script.setAttribute("data-extension","gmap"),script.onload=function(){return null!=callback?callback.call(this):void 0},document.body.appendChild(script)},__loadScript(),__markerIcon=function(icon){return icon?new google.maps.MarkerImage(icon.url,new google.maps.Size(icon.size_x,icon.size_y),new google.maps.Point(0,0),new google.maps.Point(icon.anchor_x,icon.anchor_y)):null},__queryPlace=function(value){return"string"!=typeof value&&(value=null!=value.latitude&&null!=value.longitude?new google.maps.LatLng(value.latitude,value.longitude):null),value},__parseAddress=function(address){return{address:address.formatted_address,type:address.types[0],position:{latitude:address.geometry.location.k,longitude:address.geometry.location.A}}},__parseRouteSteps=function(instructions){var step,steps,_i,_len,_ref1;for(steps=[],_ref1=instructions.steps,_i=0,_len=_ref1.length;_len>_i;_i++)step=_ref1[_i],steps.push({distance:step.distance.text,duration:step.duration.text,instructions:step.instructions});return steps},Atoms.Organism.GMap=function(_super){function GMap(){return _ref1=GMap.__super__.constructor.apply(this,arguments)}return __extends(GMap,_super),GMap["extends"]=!0,GMap.template='<section {{#if.id}}id="{{id}}"{{/if.id}}></section>',GMap.available=["Atom.Input","Atom.Button","Atom.GMap","Molecule.Form"],GMap.events=["menu"],GMap["default"]={style:"menu form",children:[{"Atom.GMap":{id:"instance",events:["query"]}},{"Atom.Button":{icon:"navicon",style:"small"}},{"Molecule.Form":{events:["submit"],children:[{"Atom.Input":{name:"address",placeholder:"Type a address",required:!0}},{"Atom.Button":{icon:"search",text:"Search",style:"fluid accept"}}]}}]},GMap.prototype.onFormSubmit=function(event,form){return event.preventDefault(),this.instance.query(form.value().address),!1},GMap.prototype.onGMapQuery=function(places){var zoom;return this.instance.clean(),places.length>0&&(this.instance.marker(places[0].position),this.instance.center(places[0].position,zoom=16)),!1},GMap.prototype.onButtonTouch=function(event){return event.preventDefault(),this.bubble("menu",event),!1},GMap}(Atoms.Organism.Section)}).call(this);