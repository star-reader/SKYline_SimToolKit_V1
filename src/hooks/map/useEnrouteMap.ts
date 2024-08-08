//航路图样式（当期预设、是否更改过）、具体显示什么图层
//全部图层  

import type mapboxgl from "mapbox-gl"
import { changeMapTheme, getMapTheme } from "./useMapStyle"

/**
 * 
 * 【地形 VFR】
 * hillshade(自带)
 * 3d (实验性功能)
 * 【导航数据 IFRH IFRL VFR】
 * efb-airports
 * efb-ndbs
 * efb-airways
 * efb-airways-label
 * efb-waypoints
 * efb-vors
 * efb-firs
 * 【导航数据 IFRL VFR】
 * efb-waypoints-terminal
 * 【机场AMM ALL】
 * amm-airport
 * amm-airstrip
 * amm-helipad
 * (amm-taxiway-1 4)
 * (amm-taxiway-1-line 4)
 * (amm-taxiway-1-label 4)
 * amm-runway
 * amm-terminal-3d
 * amm-terminal-base
 * amm-apron
 * amm-park-line
 * amm-park-line-2
 * amm-park-label
 * amm-gate
 * 
 * 【路网 VFR】
 * 来自mapbox图层
 * 
 * 【对应配置数据】
 * airport vor ndb airway waypoint terminal-waypoint amm terrain road
 * 
 */
const presetSelection = {
    'ifrh': 'World IFR High',
    'ifrl': 'World IFR Low',
    'vfr': 'World VFR',
    'sate': 'World Satellite',
    'route': 'Route Map',
    'routelow': 'Route Map Low',
    'map': 'World Map',
    'aip': 'China AIP'
}
const defaultStyle = {
    'ifrh': ['airport', 'vor', 'ndb', 'airway', 'waypoint', 'amm', 'grid'],
    'ifrl': ['airport', 'vor', 'ndb', 'airway', 'waypoint', 'terminal-waypoint', 'amm', 'grid'],
    'vfr': ['airport', 'vor', 'ndb', 'airway', 'waypoint', 'terminal-waypoint', 'amm', 'terrain', 'road', 'grid'],
    'sate': ['3d'],
    'route': ['3d','airport', 'vor', 'ndb', 'airway', 'waypoint', 'amm', 'grid','amm'],
    'routelow': ['3d','airport', 'vor', 'ndb', 'airway', 'waypoint', 'amm', 'grid','amm', 'road'],
    'map': ['3d','road', 'terrain', 'amm'],
    'aip': ['amm', 'aip']
}

const getPreset = () => {
    const h = localStorage.getItem('preset')
    if (!h){
        // 默认：航路地图，展示卫星图、机场、航路信息
        localStorage.setItem('preset' ,'route')
    }
    return h ? presetSelection[h as keyof object] : presetSelection.ifrh
}

const getStyle = (): string[] => {
    const h = localStorage.getItem('style')
    if (!h){
        localStorage.setItem('style', JSON.stringify(defaultStyle.ifrh))
    }
    return h ? JSON.parse(h) : defaultStyle.ifrh
}

const triggerRepaintStyle = (map: mapboxgl.Map) => {
    if (!map) return
    const styleLayers = map.getStyle()?.layers
    if (!styleLayers) return
    const preset = getPreset()
    if (preset === 'World Satellite' || preset === 'Route Map' || preset === 'Route Map Low'){
        map.setLayoutProperty('sate', 'visibility', 'visible')
        map.setLayoutProperty('land', 'visibility', 'none')
        map.setLayoutProperty('water', 'visibility', 'none')
        map.setLayoutProperty('water-depth', 'visibility', 'none')
        map.setLayoutProperty('landcover', 'visibility', 'none')
    }else{
        map.setLayoutProperty('sate', 'visibility', 'none')
        map.setLayoutProperty('land', 'visibility', 'visible')
        map.setLayoutProperty('water', 'visibility', 'visible')
        map.setLayoutProperty('water-depth', 'visibility', 'visible')
        map.setLayoutProperty('landcover', 'visibility', 'visible')
    }
    const style = getStyle()

    if (style.includes('airport')){
        map.setLayoutProperty('airport', 'visibility', 'visible')
        map.setLayoutProperty('airport-label', 'visibility', 'visible')
    }else {
        map.setLayoutProperty('airport', 'visibility', 'none')
        map.setLayoutProperty('airport-label', 'visibility', 'none')
    }
    if (style.includes('vor')){
        map.setLayoutProperty('vhf', 'visibility', 'visible')
        map.setLayoutProperty('vhf-label', 'visibility', 'visible')
    }else {
        map.setLayoutProperty('vhf', 'visibility', 'none')
        map.setLayoutProperty('vhf-label', 'visibility', 'none')
    }
    if (style.includes('ndb')){
        map.setLayoutProperty('ndb', 'visibility', 'visible')
        map.setLayoutProperty('ndb-label', 'visibility', 'visible')
    }else {
        map.setLayoutProperty('ndb', 'visibility', 'none')
        map.setLayoutProperty('ndb-label', 'visibility', 'none')
    }
    if (style.includes('airway')){
        map.setLayoutProperty('airway', 'visibility', 'visible')
        // map.setLayoutProperty('airway-bg', 'visibility', 'visible')
        map.setLayoutProperty('fir-boundary', 'visibility', 'visible')
        map.setLayoutProperty('fir-label', 'visibility', 'visible')
        map.setLayoutProperty('airway-label', 'visibility', 'visible')
        const isLowAirway  = (getPreset() === 'World IFR Low' || getPreset() === 'World VFR')
        for (const layer of styleLayers) {
            if (
              layer.hasOwnProperty("metadata") && layer.metadata?.hasOwnProperty("hilo")
            ) {
              map.setFilter(layer.id, [
                "==",
                !isLowAirway ? "hi" : "lo",
                1,
              ])
            }
        }
    }else {
        map.setLayoutProperty('airway', 'visibility', 'none')
        // map.setLayoutProperty('airway-bg', 'visibility', 'none')
        map.setLayoutProperty('fir-boundary', 'visibility', 'none')
        map.setLayoutProperty('fir-label', 'visibility', 'none')
        map.setLayoutProperty('airway-label', 'visibility', 'none')
    }
    if (style.includes('waypoint')){
        map.setLayoutProperty('waypoint', 'visibility', 'visible')
        map.setLayoutProperty('waypoint-label', 'visibility', 'visible')
    }else {
        map.setLayoutProperty('waypoint', 'visibility', 'none')
        map.setLayoutProperty('waypoint-label', 'visibility', 'none')
    }
    if (style.includes('terminal-waypoint')){
        map.setLayoutProperty('terminal-waypoint', 'visibility', 'visible')
        map.setLayoutProperty('terminal-waypoint-label', 'visibility', 'visible')
    }else {
        map.setLayoutProperty('terminal-waypoint', 'visibility', 'none')
        map.setLayoutProperty('terminal-waypoint-label', 'visibility', 'none')
    }
    if (style.includes('terrain')){
        map.setLayoutProperty('hillshade', 'visibility', 'visible')
        map.setLayoutProperty('landcover', 'visibility', 'visible')
        map.setPaintProperty('land', 'background-color', 'rgb(198, 234, 182)')
    }else {
        map.setLayoutProperty('hillshade', 'visibility', 'none')
        map.setLayoutProperty('landcover', 'visibility', 'none')
        map.setPaintProperty('land', 'background-color', '#F5F5F5')
        //map.setPaintProperty('land', 'background-color', 'rgb(198, 234, 182)')
    }
    if (style.includes('road')){
        map.setLayoutProperty('road-label', 'visibility', 'visible')
        map.setLayoutProperty('bridge-construction', 'visibility', 'visible')
        map.setLayoutProperty('bridge-street-low', 'visibility', 'visible')
        map.setLayoutProperty('bridge-street', 'visibility', 'visible')
        map.setLayoutProperty('bridge-major-link', 'visibility', 'visible')
        map.setLayoutProperty('bridge-minor-link', 'visibility', 'visible')
        map.setLayoutProperty('bridge-street-case', 'visibility', 'visible')
        map.setLayoutProperty('bridge-minor-case', 'visibility', 'visible')
        map.setLayoutProperty('bridge-minor', 'visibility', 'visible')
        //
        map.setLayoutProperty('road-motorway-trunk', 'visibility', 'visible')
        map.setLayoutProperty('road-primary', 'visibility', 'visible')
        map.setLayoutProperty('road-primary-case', 'visibility', 'visible')
        map.setLayoutProperty('road-secondary-tertiary', 'visibility', 'visible')
        map.setLayoutProperty('road-construction', 'visibility', 'visible')
        map.setLayoutProperty('road-street-low', 'visibility', 'visible')
        map.setLayoutProperty('road-street', 'visibility', 'visible')
        map.setLayoutProperty('road-major-link', 'visibility', 'visible')
        map.setLayoutProperty('road-minor-link', 'visibility', 'visible')
        map.setLayoutProperty('road-street-case', 'visibility', 'visible')
        map.setLayoutProperty('road-minor-case', 'visibility', 'visible')
        map.setLayoutProperty('road-minor', 'visibility', 'visible')
        //
        map.setLayoutProperty('tunnel-major-link', 'visibility', 'visible')
        map.setLayoutProperty('tunnel-primary-case', 'visibility', 'visible')
        map.setLayoutProperty('tunnel-secondary-tertiary-case', 'visibility', 'visible')
        map.setLayoutProperty('tunnel-street-case', 'visibility', 'visible')
        map.setLayoutProperty('tunnel-minor-case', 'visibility', 'visible')
        map.setLayoutProperty('tunnel-minor-link-case', 'visibility', 'visible')
    }else {
        map.setLayoutProperty('road-label', 'visibility', 'none')
        map.setLayoutProperty('bridge-motorway-trunk', 'visibility', 'none')
        map.setLayoutProperty('bridge-primary', 'visibility', 'none')
        map.setLayoutProperty('bridge-primary-case', 'visibility', 'none')
        map.setLayoutProperty('bridge-secondary-tertiary', 'visibility', 'none')
        map.setLayoutProperty('bridge-construction', 'visibility', 'none')
        map.setLayoutProperty('bridge-street-low', 'visibility', 'none')
        map.setLayoutProperty('bridge-street', 'visibility', 'none')
        map.setLayoutProperty('bridge-major-link', 'visibility', 'none')
        map.setLayoutProperty('bridge-minor-link', 'visibility', 'none')
        map.setLayoutProperty('bridge-street-case', 'visibility', 'none')
        map.setLayoutProperty('bridge-minor-case', 'visibility', 'none')
        map.setLayoutProperty('bridge-minor', 'visibility', 'none')
        //
        map.setLayoutProperty('road-motorway-trunk', 'visibility', 'none')
        map.setLayoutProperty('road-primary', 'visibility', 'none')
        map.setLayoutProperty('road-primary-case', 'visibility', 'none')
        map.setLayoutProperty('road-secondary-tertiary', 'visibility', 'none')
        map.setLayoutProperty('road-construction', 'visibility', 'none')
        map.setLayoutProperty('road-street-low', 'visibility', 'none')
        map.setLayoutProperty('road-street', 'visibility', 'none')
        map.setLayoutProperty('road-major-link', 'visibility', 'none')
        map.setLayoutProperty('road-minor-link', 'visibility', 'none')
        map.setLayoutProperty('road-street-case', 'visibility', 'none')
        map.setLayoutProperty('road-minor-case', 'visibility', 'none')
        map.setLayoutProperty('road-minor', 'visibility', 'none')
        //
        map.setLayoutProperty('tunnel-major-link', 'visibility', 'none')
        map.setLayoutProperty('tunnel-primary-case', 'visibility', 'none')
        map.setLayoutProperty('tunnel-secondary-tertiary-case', 'visibility', 'none')
        map.setLayoutProperty('tunnel-street-case', 'visibility', 'none')
        map.setLayoutProperty('tunnel-minor-case', 'visibility', 'none')
        map.setLayoutProperty('tunnel-minor-link-case', 'visibility', 'none')
    }
    if (style.includes('3d')){
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1 })
    }else{
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 0 })
    }
    if (style.includes('amm')){
        map.setLayoutProperty('apt', 'visibility', 'visible')
        map.setLayoutProperty('rwyl', 'visibility', 'visible')
        map.setLayoutProperty('osm-taxl', 'visibility', 'visible')
        map.setLayoutProperty('taxa', 'visibility', 'visible')
        map.setLayoutProperty('osm-rwyl', 'visibility', 'visible')
        map.setLayoutProperty('rwya', 'visibility', 'visible')
        map.setLayoutProperty('guidanceline-solid', 'visibility', 'visible')
        map.setLayoutProperty('guidanceline-dashed', 'visibility', 'visible')
        map.setLayoutProperty('guidanceline-doted', 'visibility', 'visible')
        map.setLayoutProperty('building', 'visibility', 'visible')
        map.setLayoutProperty('amdb-taxl-label', 'visibility', 'visible')
        map.setLayoutProperty('osm-taxl-label', 'visibility', 'visible')
        map.setLayoutProperty('gate-label', 'visibility', 'visible')
        map.setLayoutProperty('rwyp-label', 'visibility', 'visible')
    }else{
        map.setLayoutProperty('apt', 'visibility', 'none')
        map.setLayoutProperty('rwyl', 'visibility', 'none')
        map.setLayoutProperty('osm-taxl', 'visibility', 'none')
        map.setLayoutProperty('taxa', 'visibility', 'none')
        map.setLayoutProperty('osm-rwyl', 'visibility', 'none')
        map.setLayoutProperty('rwya', 'visibility', 'none')
        map.setLayoutProperty('guidanceline-solid', 'visibility', 'none')
        map.setLayoutProperty('guidanceline-dashed', 'visibility', 'none')
        map.setLayoutProperty('guidanceline-doted', 'visibility', 'none')
        map.setLayoutProperty('building', 'visibility', 'none')
        map.setLayoutProperty('amdb-taxl-label', 'visibility', 'none')
        map.setLayoutProperty('osm-taxl-label', 'visibility', 'none')
        map.setLayoutProperty('gate-label', 'visibility', 'none')
        map.setLayoutProperty('rwyp-label', 'visibility', 'none')
    }
    if (style.includes('grid')){
        map.setLayoutProperty('grid-lines-1', 'visibility', 'visible')
        map.setLayoutProperty('grid-lines-2', 'visibility', 'visible')
        map.setLayoutProperty('gridmora-label', 'visibility', 'visible')
    }else{
        map.setLayoutProperty('grid-lines-1', 'visibility', 'none')
        map.setLayoutProperty('grid-lines-2', 'visibility', 'none')
        map.setLayoutProperty('gridmora-label', 'visibility', 'none')
    }
    if (map.getLayer('aip')){
        if (style.includes('aip')){
            map.setLayoutProperty('aip', 'visibility', 'visible')
        }else{
            map.setLayoutProperty('aip', 'visibility', 'none')
        }
    }
    changeMapTheme(getMapTheme() === 'night' ? 'dark' : 'light', map)
}

const isActived = (key: string) => {
    const style = getStyle()
    return style.includes(key)
}

const setStyleByItem = (item: string, map: mapboxgl.Map) => {
    const style = getStyle()
    const d = style.find(i => i === item)
    //如果有d，说明需要隐藏显示，否则打开显示
    if (d){
        localStorage.setItem('style', JSON.stringify(style.filter(i => i !== item)))
    }else{
        style.push(item)
        localStorage.setItem('style', JSON.stringify(style))
    }
    //重新绘制地图
    triggerRepaintStyle(map)
}

const getStyleByPreset = (preset: string) => {
    return defaultStyle[preset as keyof object] as string[]
}

const getPresetByPreset = (preset: string) => {
    return presetSelection[preset as keyof object] as string
}

const setStyleByArr = (arr: string[]) => {
    localStorage.setItem('style', JSON.stringify(arr))
}

export {
    getPreset, getStyle, triggerRepaintStyle , isActived , 
    setStyleByItem , getStyleByPreset , setStyleByArr , getPresetByPreset
}