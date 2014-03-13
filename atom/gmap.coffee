###
@TODO

@namespace Atoms.Atom
@class GMap

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
"use strict"

class Atoms.Atom.GMap extends Atoms.Class.Atom

  @template : """
    <div {{#if.style}}class="{{style}}"{{/if.style}} height="{{#if.height}}height:{{height}};{{/if.height}}"></div>"""

  @base : "GMap"

  markers: []

  constructor: (attributes = {}) ->
    @default =
      height: "100%"
    super attributes
    do @onGmapsLoad

  # Events
  onGmapsLoad: ->
    setTimeout =>
      options =
        center          : new google.maps.LatLng(-34.397, 150.644)
        zoom            : 8
        mobile          : true
        sensor          : false
        disableDefaultUI: true
      @instance = new google.maps.Map @el[0], options
      @el.style "height", @el.parent()[0].clientHeight + "px"
    , 1000

  # Methods Instance
  clean: ->
    # Clean Markers
    i = 0
    len = @markers.length

    while i < len
      @markers[i].setMap null
      i++
    @markers = []

  center: (position) ->
    @instance.setCenter new google.maps.LatLng(position.latitude, position.longitude)

  zoom: (level) ->
    @instance.setZoom level

  addMarker: (position, icon, animate = false) ->
    marker = new google.maps.Marker
      map       : @instance
      icon      : @__markerIcon icon
      # animation : google.maps.Animation.DROP
      position  : new google.maps.LatLng(position.latitude, position.longitude)
    marker.setAnimation google.maps.Animation.BOUNCE if animate
    @markers.push marker

  # Privates
  __markerIcon: (icon) ->
    if icon
      new google.maps.MarkerImage(
        icon.url,
        new google.maps.Size( icon.size.x, icon.size.y ),
        new google.maps.Point( 0, 0 ),
        new google.maps.Point( icon.anchor.x, icon.anchor.y )
      )
    else
      null

script = document.createElement("script")
script.type = "text/javascript"
script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=console.log"
document.body.appendChild script
