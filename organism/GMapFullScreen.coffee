###
@TODO

@namespace Atoms.Molecule
@class GMapFullScreen

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
"use strict"

class Atoms.Organism.GMapFullScreen extends Atoms.Organism.Section

  @available: ["Atom.Input", "Atom.Button", "Atom.GMap", "Molecule.Form"]

  constructor: ->
    @default =
      children: [
        "Atom.GMap": id: "gmap"
      ,
        "Atom.Button": icon: "navicon", style: "small"
      ,
        "Molecule.Form": events: ["submit"], children: [
          "Atom.Input": name: "adress", placeholder: "Type a address", required: true
        ,
          "Atom.Button": icon: "search", text: "Search", style: "fluid accept"
        ]
      ]
    super
    @bind "show", @onShow

  onShow: ->
    setTimeout =>
      @gmap.el.style "height", @gmap.el.parent()[0].clientHeight + "px"
    , 10

  onFormSubmit: (event, form, hierarchy...) ->
    event.preventDefault()
    position = latitude: 43.256963, longitude: -2.923441
    @gmap.addMarker position
    @gmap.center position
    @gmap.zoom 16

  onButtonTouch: ->
    false
