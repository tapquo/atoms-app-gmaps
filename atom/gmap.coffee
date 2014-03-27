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

  @base     : "GMap"

  @events   : ["route"]

  _markers  : []
  _map      : null
  _route    : null

  output: ->
    super
    exists = Atoms.$("[data-extension=gmap]").length > 0
    if exists then do @__init else __loadScript @__init

  # Methods Instance
  center: (position, zoom_level = 8) ->
    @_map.setCenter new google.maps.LatLng(position.latitude, position.longitude)
    @zoom zoom_level

  zoom: (level) ->
    @_map.setZoom level

  addMarker: (position, icon, animate = false) ->
    marker = new google.maps.Marker
      map       : @_map
      icon      : __markerIcon icon
      # animation : google.maps.Animation.DROP
      position  : new google.maps.LatLng(position.latitude, position.longitude)
    marker.setAnimation google.maps.Animation.BOUNCE if animate
    @_markers.push marker

  route: (origin, destination, mode, _markers) ->
    @clean()
    service = new google.maps.DirectionsService()

    parameters =
      origin      : __queryPlace origin
      destination : __queryPlace destination
      travelMode  : google.maps.TravelMode.DRIVING

    service.route parameters, (@_route, status) =>
      if status is google.maps.DirectionsStatus.OK
        @_route.renderer = new google.maps.DirectionsRenderer(suppressMarkers: true)
        @_route.renderer.setMap @_map
        @_route.renderer.setDirections @_route

  routeInstructions: ->
    instructions = @_route?.routes[0]?.legs[0]
    if instructions
      instructions =
        distance: instructions.distance.text
        duration: instructions.duration.text
        steps   : __routeSteps instructions
    instructions

  clean: ->
    marker.setMap = null for marker in @_markers
    @_markers = []
    @_route?.renderer.setMap null
    @_route = null

  # Privates
  __init: =>
    setTimeout =>
      options =
        center          : new google.maps.LatLng(43.256963, -2.923441)
        zoom            : 1
        mobile          : true
        sensor          : false
        disableDefaultUI: true
      @_map = new google.maps.Map @el[0], options
    , 1000


# ==============================================================================

__loadScript = (callback) ->
  window.google = maps: {}
  script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=console.log"
  script.setAttribute "data-extension", "gmap"
  script.onload = -> callback.call @ if callback?
  document.body.appendChild script

do __loadScript

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

__queryPlace = (value) ->
  unless typeof value is "string"
    if value.latitude? and value.longitude?
      value = new google.maps.LatLng value.latitude, value.longitude
    else
      value = null
  value

__routeSteps = (instructions) ->
  steps = []
  for step in instructions.steps
    steps.push
      distance    : step.distance.text,
      duration    : step.duration.text,
      instructions: step.instructions
  steps
