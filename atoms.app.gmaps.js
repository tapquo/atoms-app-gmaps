(function(){"use strict";var __markerIcon,__parseAddress,__parseRouteSteps,__queryPlace,__bind=function(fn,me){return function(){return fn.apply(me,arguments)}},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child};Atoms.Atom.GMap=function(_super){function GMap(){return this.__init=__bind(this.__init,this),GMap.__super__.constructor.apply(this,arguments)}return __extends(GMap,_super),GMap.template='<div {{#if.style}}class="{{style}}"{{/if.style}}>\n  <span class="icon loading-d"></span>\n</div>',GMap.base="GMap",GMap.events=["query","route"],GMap.prototype._map=null,GMap.prototype._markers=[],GMap.prototype._query=[],GMap.prototype._route=null,GMap.prototype.output=function(){var url;return GMap.__super__.output.apply(this,arguments),Atoms.$("[data-extension=gmap]").length>0?this.__init():(url="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=console.log",Atoms.resource("gmap","script",url).then(function(_this){return function(error){return error?console.error("Atoms.App.GMap error loading resources"):_this.__init()}}(this)))},GMap.prototype.center=function(position,zoom_level){var _ref;return null==zoom_level&&(zoom_level=8),this._map.setCenter("undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.LatLng(position.latitude,position.longitude):void 0),this.zoom(zoom_level)},GMap.prototype.zoom=function(level){return this._map.setZoom(level)},GMap.prototype.query=function(value){var parameters,service,_ref;return parameters={},"string"!=typeof value?parameters.latLng=__queryPlace(value):parameters.address=value,this._query=[],service="undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.Geocoder:void 0,service.geocode(parameters,function(_this){return function(results,status){var result;return status===google.maps.GeocoderStatus.OK&&(_this._query=function(){var _i,_len,_results;for(_results=[],_i=0,_len=results.length;_len>_i;_i++)result=results[_i],_results.push(__parseAddress(result));return _results}()),_this.bubble("query",_this._query)}}(this)),!0},GMap.prototype.marker=function(position,icon,animate){var marker,_ref;return null==animate&&(animate=!1),marker="undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.Marker({map:this._map,icon:__markerIcon(icon),position:new google.maps.LatLng(position.latitude,position.longitude)}):void 0,animate&&marker.setAnimation(google.maps.Animation.BOUNCE),this._markers.push(marker),!0},GMap.prototype.route=function(origin,destination,mode,markers){var parameters,service,_ref;return null==mode&&(mode="DRIVING"),this.clean(),service="undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.DirectionsService:void 0,parameters={origin:__queryPlace(origin),destination:__queryPlace(destination),travelMode:google.maps.TravelMode.DRIVING},service.route(parameters,function(_this){return function(_route,status){return _this._route=_route,status===google.maps.DirectionsStatus.OK?(parameters={suppressMarkers:null!=markers},_this._route.renderer=new google.maps.DirectionsRenderer(parameters),_this._route.renderer.setMap(_this._map),_this._route.renderer.setDirections(_this._route),markers&&_this.__markersInRoute(markers),_this.bubble("route",_this._route)):void 0}}(this)),!0},GMap.prototype.routeInstructions=function(){var instructions,_ref,_ref1;return instructions=null!=(_ref=this._route)&&null!=(_ref1=_ref.routes[0])?_ref1.legs[0]:void 0,instructions&&(instructions={distance:instructions.distance.text,duration:instructions.duration.text,steps:__parseRouteSteps(instructions)}),instructions},GMap.prototype.clean=function(){var marker,_i,_len,_ref,_ref1;for(_ref=this._markers,_i=0,_len=_ref.length;_len>_i;_i++)marker=_ref[_i],marker.setMap(null);return this._markers=[],null!=(_ref1=this._route)&&_ref1.renderer.setMap(null),this._route=null},GMap.prototype.__init=function(){return setTimeout(function(_this){return function(){var options,_ref,_ref1;return options={center:"undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.LatLng(43.256963,-2.923441):void 0,zoom:1,mobile:!0,sensor:!1,disableDefaultUI:!0},_this._map="undefined"!=typeof google&&null!==google&&null!=(_ref1=google.maps)?new _ref1.Map(_this.el[0],options):void 0}}(this),2e3)},GMap.prototype.__markersInRoute=function(markers){var end,instructions,start,_ref,_ref1;return instructions=null!=(_ref=this._route)&&null!=(_ref1=_ref.routes[0])?_ref1.legs[0]:void 0,markers.origin&&(start=instructions.start_location,console.log("origin",markers.origin),this.marker({latitude:start.k,longitude:start.A},markers.origin)),markers.destination?(end=instructions.end_location,this.marker({latitude:end.k,longitude:end.A},markers.destination)):void 0},GMap}(Atoms.Class.Atom),__markerIcon=function(icon){var _ref;return icon?"undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.MarkerImage(icon.url,new google.maps.Size(icon.size_x,icon.size_y),new google.maps.Point(0,0),new google.maps.Point(icon.anchor_x,icon.anchor_y)):void 0:null},__queryPlace=function(value){var _ref;return"string"!=typeof value&&(value=null!=value.latitude&&null!=value.longitude?"undefined"!=typeof google&&null!==google&&null!=(_ref=google.maps)?new _ref.LatLng(value.latitude,value.longitude):void 0:null),value},__parseAddress=function(address){return{address:address.formatted_address,type:address.types[0],position:{latitude:address.geometry.location.k,longitude:address.geometry.location.B}}},__parseRouteSteps=function(instructions){var step,steps,_i,_len,_ref;for(steps=[],_ref=instructions.steps,_i=0,_len=_ref.length;_len>_i;_i++)step=_ref[_i],steps.push({distance:step.distance.text,duration:step.duration.text,instructions:step.instructions});return steps},Atoms.Organism.GMap=function(_super){function GMap(){return GMap.__super__.constructor.apply(this,arguments)}return __extends(GMap,_super),GMap["extends"]=!0,GMap.available=["Atom.Input","Atom.Button","Atom.GMap","Molecule.Form"],GMap.events=["menu"],GMap["default"]={style:"menu form",children:[{"Atom.GMap":{id:"instance",events:["query"]}},{"Atom.Button":{icon:"navicon",style:"small"}},{"Molecule.Search":{events:["submit"]}}]},GMap.prototype.onSearchSubmit=function(event,search){return event.preventDefault(),this.instance.query(search.value()),!1},GMap.prototype.onGMapQuery=function(places){var zoom;return this.instance.clean(),places.length>0&&(this.instance.marker(places[0].position),this.instance.center(places[0].position,zoom=15)),!1},GMap.prototype.onButtonTouch=function(event){return event.preventDefault(),this.bubble("menu",event),!1},GMap}(Atoms.Organism.Section)}).call(this);