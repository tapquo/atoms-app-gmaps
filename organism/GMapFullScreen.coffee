###
@TODO

@namespace Atoms.Molecule
@class GMapFullScreen

@author Javier Jimenez Villar <javi@tapquo.com> || @soyjavi
###
"use strict"

class Atoms.Organism.GMapFullScreen extends Atoms.Organism.Section

  # @template: """
  #   <div></div>"""

  @available: ["Atom.Input", "Atom.Button", "Atom.GMap", "Molecule.Form"]

  constructor: ->
    @default =
      children: [
        "Atom.GMap": id: "gmap"
      ,
        "Atom.Button": icon: "navicon", style: "small"
      ,
        "Molecule.Form": events: ["submit"], children: [
          "Atom.Input": name: "adress", placeholder: "Type a address", style: "small", required: true
        ,
          "Atom.Button": icon: "search", text: "Search", style: "small fluid accept"
        ]
      ]
    super

    # @gmap.style "height", @el.height()

  onFormSubmit: (event, form, hierarchy...) ->
    console.log ">>"
    @gmap.zoom 12
    @gmap.addMarker position: latitude: 1, longitude: 1

  onButtonTouch: ->
    false
