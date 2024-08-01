<template>
    <efb-enroute-charts sync-allowed render="webgl-3">
        <div id="enroute-map"></div>
        <Controls />
    </efb-enroute-charts>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxLanguage from '@mapbox/mapbox-gl-language'
import pubsub from 'pubsub-js'
import token from '@/config/map/token'
import { addSKYlineLayer, addSKYlineMarker, changeMapTheme, initMapStyle } from '@/hooks/map/useMapStyle'
import { setStyleByItem, triggerRepaintStyle } from '@/hooks/map/useEnrouteMap'
import useMouse from '@/hooks/map/useMouse'
import addGridLayer from '@/utils/addGridLayer'
import Controls from './MapControls/Controls.vue'

let map: mapboxgl.Map

const initMap = () => {
    if (map) return
    mapboxgl.accessToken = token
    map = new mapboxgl.Map({
        container: 'enroute-map',
        center: [101.2, 19.4],
        zoom: 2.12,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        //style: 'mapbox://styles/mapbox/standard',
        projection: 'globe' as any as mapboxgl.ProjectionSpecification
    })
    map.setMaxZoom(16.8)
    map.addControl(new mapboxgl.AttributionControl({
        compact: false,
        customAttribution: 'SKYline SimToolkit | 仅限模拟飞行使用 | 禁止用于实际飞行'
    }))
    map.addControl(
        new mapboxgl.ScaleControl({ unit: "metric" }),
        "bottom-right",
    )
    map.addControl(
        new mapboxgl.ScaleControl({ unit: "nautical" }),
        "bottom-right",
    )
    // map.addControl(new mapboxgl.NavigationControl({
    //     'visualizePitch': true
    // }), "top-right")
    // let language = new MapboxLanguage({ defaultLanguage: "zh-Hans" })
    // map.addControl(language)
    const zoom: string | null = localStorage.getItem('map-zoom')
    const center: string | null = localStorage.getItem('map-center')
    if (zoom) {
        map.setZoom(parseFloat(zoom))
    } else {
        localStorage.setItem('map-zoom', map.getZoom().toString())
    }
    if (center) {
        let lng: number = parseFloat(center.split('LngLat(')[1].split(',')[0].trim())
        let lat: number = parseFloat(center.split(',')[1].split(')')[0].trim())
        map.setCenter([lng, lat])
    } else {
        localStorage.setItem('map-center', map.getCenter().toString())
    }
    bindMapEventListener()
}

const bindMapEventListener = () => {
    map.on('zoomend', () => {
        localStorage.setItem('map-zoom', map.getZoom().toString())
        localStorage.setItem('map-center', map.getCenter().toString())
    })
    map.on('dragend', () => {
        localStorage.setItem('map-center', map.getCenter().toString())
    })
    map.on('style.load', async () => {
        initMapStyle(map)
        map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        })
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1 })
        await addSKYlineMarker(map)
        addSKYlineLayer(map)
        addGridLayer(map)
        triggerRepaintStyle(map)
        useMouse(map)
    })
    map.on('click', (_e) => {
    // useEnrouteQuery(map.queryRenderedFeatures(e.point))
    })
    map.on('contextmenu',(_e) => {
    // enrouteSearch(e.lngLat.lat, e.lngLat.lng)
    })
}

onMounted(() => {
    initMap()
    pubsub.subscribe('change-theme',(_,data: string) => {
        changeMapTheme(data as 'light' | 'dark', map)
    })
    pubsub.subscribe('change-enroute-style',(_, data: string) => {
    setStyleByItem(data, map)
    })
    pubsub.subscribe('request-repaint-map',() => {
    triggerRepaintStyle(map)
    })
    pubsub.subscribe('change-enroute-preset',() => {
    triggerRepaintStyle(map)
    })
})

</script>

<style lang='less' scoped>
efb-enroute-charts{
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    margin: 0;
    padding: 0;
    overflow: hidden;
}
#enroute-map{
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
}
</style>