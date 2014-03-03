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

  constructor: (attributes = {}) ->
    super attributes
    do @onGmapsLoad

  # Events
  onGmapsLoad: =>
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

  addMarker: (position, icon, animate = true) ->
    marker = new google.maps.Marker
      map       : @instance
      # icon      : @__markerIcon icon
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


# @TODO: Add GoogleMaps JavaScript Library
# script = document.createElement "script"
# script.setAttribute "type","text/javascript"
# script.setAttribute "src", "https://maps.googleapis.com/maps/api/js?key=AIzaSyD4FyqIXGamKXOdG5RndSg9y_c-07Ul6-w&sensor=true"
# document.getElementsByTagName("body")[0].appendChild script
