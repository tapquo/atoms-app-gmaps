###
@TODO

@namespace Atoms.Atom
@class GMap

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
"use strict"

class Atoms.Atom.GMap extends Atoms.Class.Atom

  @template : """
    <div {{#if.style}}class="{{style}}"{{/if.style}}></div>"""

  @base : "GMap"

  markers: []

  output: ->
    super
    exists = Atoms.$("[data-extension=gmap]").length > 0
    if exists then do @__instance else __dependency @__instance

  # Methods Instance
  center: (position, zoom_level = 8) ->
    @instance.setCenter new google.maps.LatLng(position.latitude, position.longitude)
    @zoom zoom_level

  zoom: (level) ->
    @instance.setZoom level

  addMarker: (position, icon, animate = false) ->
    marker = new google.maps.Marker
      map       : @instance
      icon      : __markerIcon icon
      # animation : google.maps.Animation.DROP
      position  : new google.maps.LatLng(position.latitude, position.longitude)
    marker.setAnimation google.maps.Animation.BOUNCE if animate
    @markers.push marker

  clean: ->
    marker.setMap = null for marker in @markers
    @markers = []

  # Privates
  __instance: =>
    setTimeout =>
      options =
        center          : new google.maps.LatLng(43.256963, -2.923441)
        zoom            : 1
        mobile          : true
        sensor          : false
        disableDefaultUI: true
      @instance = new google.maps.Map @el[0], options
    , 1000

__dependency = (callback) ->
  window.google = maps: {}
  script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=console.log"
  script.setAttribute "data-extension", "gmap"
  script.onload = -> callback.call @ if callback?
  document.body.appendChild script

__markerIcon = (icon) ->
  if icon
    new google.maps.MarkerImage(
      icon.url,
      new google.maps.Size( icon.size.x, icon.size.y ),
      new google.maps.Point( 0, 0 ),
      new google.maps.Point( icon.anchor.x, icon.anchor.y )
    )
  else
    null

do __dependency
