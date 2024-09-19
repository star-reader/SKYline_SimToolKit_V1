import type mapboxgl from "mapbox-gl";

export default (map: mapboxgl.Map) => {
    if (!map) return
    map.on('mouseover','airport',() => {
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseover','airway-label',() => {
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseover','terminal-waypoint',() => {
        map.getCanvas().style.cursor = 'pointer'
    })
    // map.on('mouseover','efb-airways-label',() => {
    //     map.getCanvas().style.cursor = 'pointer'
    // })
    map.on('mouseover','waypoint',() => {
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseover','ndb',() => {
        map.getCanvas().style.cursor = 'pointer'
    })
    map.on('mouseover','vhf',() => {
        map.getCanvas().style.cursor = 'pointer'
    })

    map.on('mouseleave','airport',() => {
        map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave','airway-label',() => {
        map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave','terminal-waypoint',() => {
        map.getCanvas().style.cursor = ''
    })
    // map.on('mouseleave','efb-airways-label',() => {
    //     map.getCanvas().style.cursor = ''
    // })
    map.on('mouseleave','waypoint',() => {
        map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave','ndb',() => {
        map.getCanvas().style.cursor = ''
    })
    map.on('mouseleave','vhf',() => {
        map.getCanvas().style.cursor = ''
    })
}