###
@TODO

@namespace Atoms.Molecule
@class GMapFullScreen

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
"use strict"

class Atoms.Organism.GMapFullScreen extends Atoms.Organism.Section

  @template : """
    <section {{#if.id}}id="{{id}}"{{/if.id}}></section>
  """

  @available: ["Atom.Input", "Atom.Button", "Atom.GMap", "Molecule.Form"]

  @events   : ["menu"]

  constructor: ->
    @default =
      children: [
        "Atom.GMap": id: "gmap", events: ["query"]
      ,
        "Atom.Button": icon: "navicon", style: "small", callbacks: ["onMenu"]
      ,
        "Molecule.Form": events: ["submit"], children: [
          "Atom.Input": name: "address", placeholder: "Type a address", required: true
        ,
          "Atom.Button": icon: "search", text: "Search", style: "fluid accept"
        ]
      ]
    super

  onFormSubmit: (event, form, hierarchy...) ->
    event.preventDefault()
    @gmap.query form.value().address
    false

  onGMapQuery: (places, map, hierarchy...) ->
    map.clean()
    if places.length > 0
      map.marker places[0].position
      map.center places[0].position, zoom = 16
    false

  onMenu: (event, button) ->
    @bubble "menu", event
    false
