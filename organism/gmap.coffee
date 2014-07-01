###
@TODO

@namespace Atoms.Organism
@class GMap

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
"use strict"

class Atoms.Organism.GMap extends Atoms.Organism.Section

  @extends  : true

  @available: ["Atom.Input", "Atom.Button", "Atom.GMap", "Molecule.Form"]

  @events   : ["menu"]

  @default  :
    style   : "menu form",
    children: [
      "Atom.GMap": id: "instance", events: ["query"]
    ,
      "Atom.Button": icon: "navicon", style: "small"
    ,
      "Molecule.Search": events: ["submit"]
    ]

  onSearchSubmit: (event, search) ->
    event.preventDefault()
    @instance.query search.value()
    false

  onGMapQuery: (places) ->
    @instance.clean()
    if places.length > 0
      @instance.marker places[0].position
      @instance.center places[0].position, zoom = 15
    false

  onButtonTouch: (event) ->
    event.preventDefault()
    @bubble "menu", event
    false
