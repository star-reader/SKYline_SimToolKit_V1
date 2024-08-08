<template>
    <div>
    <Teleport to='#app'>
        <efb-theme-choice-model>
                <efb-choice-core class='aero-glass-top'>
                    <div class="title-area">
                        <div class="title">选择地图样式</div>
                        <div @click="handleClose">
                            <CloseButton isAeroGlass />
                        </div>
                    </div>
                    <div class="selections-wrapper">
                        <div class="space-title">选择预设</div>
                        <div class="selections" role='cell'>
                            <div @click="() => changePreset('route')" class="selections-item">
                                <img :src="satedetail" alt="Route Map" class="pre-img" />
                                <div class="text-a1">Route Map</div>
                                <div class="text-a2">航路地图</div>
                            </div>
                            <div @click="() => changePreset('routelow')" class="selections-item">
                                <img :src="routel" alt="Route Map Low" class="pre-img" />
                                <div class="text-a1">Route Map Low</div>
                                <div class="text-a2">低空航路地图</div>
                            </div>
                            <div @click="() => changePreset('ifrh')" class="selections-item">
                                <img :src="ifrh" alt="IFR_High" class="pre-img" />
                                <div class="text-a1">World IFR High</div>
                                <div class="text-a2">全球IFR高空航路图</div>
                            </div>
                            <div @click="() => changePreset('ifrl')" class="selections-item">
                                <img :src="ifrl" alt="IFR_Low" class="pre-img" />
                                <div class="text-a1">World IFR Low</div>
                                <div class="text-a2">全球IFR低空航路图</div>
                            </div>
                            <div @click="() => changePreset('vfr')" class="selections-item">
                                <img :src="vfr" alt="VFR" class="pre-img" />
                                <div class="text-a1">World VFR</div>
                                <div class="text-a2">全球目视飞行航路图</div>
                            </div>
                            <div @click="() => changePreset('map')" class="selections-item">
                                <img :src="map_t" alt="Map" class="pre-img" />
                                <div class="text-a1">World Map</div>
                                <div class="text-a2">世界地图</div>
                            </div>
                            <div @click="() => changePreset('sate')" class="selections-item">
                                <img :src="sate" alt="Satellite" class="pre-img" />
                                <div class="text-a1">World Satellite</div>
                                <div class="text-a2">全球高清卫星图</div>
                            </div>
                            <div @click="() => changePreset('aip')" class="selections-item">
                                <img :src="aip" alt="AIP" class="pre-img" />
                                <div class="text-a1">China AIP</div>
                                <div class="text-a2">中国航空资料汇编航路图</div>
                            </div>
                        </div>
                        <el-collapse v-model="activeName" class="space-title">
                            <el-collapse-item title="手动选择图层" name="1">
                                <div class="space-text-lh2">导航设备</div>
                                <div class="filter-rows">
                                    <ButtonItem content="机场" data="airport">
                                        <LightHouse theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem content="VOR" data="vor">
                                        <HexagonOne theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="ndb" content="NDB" >
                                        <Halo theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="airway" content="航路" >
                                        <ShareOne theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="waypoint" content="航路点" >
                                        <Triangle theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="terminal-waypoint" content="终端航路点" >
                                        <HandleTriangle theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                </div>
                                <div class="space-text-lh2">地图显示</div>
                                <div class="filter-rows">
                                    <ButtonItem data="amm" content="机场详情" >
                                        <Airplane theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="road" content="公路/交通" >
                                        <Road theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="terrain" content="地形/山区" >
                                        <Mountain theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="grid" content="MORA" >
                                        <GridTwo theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="3d" content="3D地形" >
                                        <CoordinateSystem theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                </div>
                                <div class="space-text-lh2">辅助图层</div>
                                <div class="filter-rows">
                                    <ButtonItem data="weather" content="气象雷达" isNaClick >
                                        <LinkCloud theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="dawndarkline" content="晨昏线" isNaClick >
                                        <Brightness theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                </div>
                                <div class="space-text-lh2">联飞功能</div>
                                <div class="filter-rows">
                                    <ButtonItem data="ownship" content="OwnShip" isNaClick >
                                        <MoveOne theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                    <ButtonItem data="server" content="ADSB" isNaClick >
                                        <RadarThree theme="outline" size="24" fill="#ffffff"/>
                                    </ButtonItem>
                                </div>
                            </el-collapse-item>
                            </el-collapse>
                    </div>
                </efb-choice-core>
            </efb-theme-choice-model>
    </Teleport>
    </div>
</template>

<script lang='ts' setup>
import { Airplane, Brightness, CoordinateSystem, GridTwo, Halo, 
    HandleTriangle, HexagonOne, LightHouse, LinkCloud, Mountain, 
    MoveOne, RadarThree, Road, ShareOne, Triangle } from '@icon-park/vue-next'
import { ref } from 'vue'
import pubsub from 'pubsub-js'
import CloseButton from '@/components/common/CloseButton.vue'
import ButtonItem from './ButtonItem.vue'
import { getStyleByPreset } from '@/hooks/map/useEnrouteMap'

import ifrh from '@/assets/mapTheme/ifrh.png'
import ifrl from '@/assets/mapTheme/ifrl.png'
import vfr from '@/assets/mapTheme/vfr.png'
import sate from '@/assets/mapTheme/sate.png'
import satedetail from '@/assets/mapTheme/satedetail.png'
import routel from '@/assets/mapTheme/routel.png'
import map_t from '@/assets/mapTheme/map.png'
import aip from '@/assets/mapTheme/aip.png'

const activeName = ref('')

const handleClose = () => {
    pubsub.publish('close-map-choice', 1)
}

const changePreset = (preset: 'ifrh' | 'ifrl' | 'vfr' | 'sate'| 'aip' | 'route' | 'routelow' | 'map') => {
    // setPreset(getPresetByPreset(preset))
    const style = getStyleByPreset(preset)
    localStorage.setItem('preset', preset)
    localStorage.setItem('style', JSON.stringify(style))
    pubsub.publish('change-enroute-preset', preset)
    //pubsub.publish('request-repaint-map', 1)
}
</script>

<style lang='less' scoped>
efb-theme-choice-model{
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    z-index: 900;
    background-color: rgba(0,0,0,0.5);
    animation: gradShow 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    efb-choice-core{
        position: absolute;
        width: 75%;
        //height: 58%;
        max-height: 58%;
        //max-height: 60%;
        max-width: 765px;
        border-radius: 6px;
        border-width: 1px;
        border-color: var(--model-border-color);
        background-color: var(--model-background-color);
        overflow: hidden auto;
        .title-area{
            position: relative;
            height: 20px;
            width: 100%;
            left: 0;
            top: 0;
            user-select: none;
            -webkit-user-select: none;
            text-align: center;
            padding: 13px 0;
            padding-top: 10px;
            .title{
                color: white;
                font-size: 18px
            }
        }
        .selections-wrapper{
            position: relative;
            height: calc(100% - 50px);
            margin-top: 4px;
            overflow: hidden auto;
            padding: 2px 15px;
            user-select: none;
            .space-title{
                position: relative;
                margin: 4px 0;
                color: white;
                font-size: 16px;
                line-height: 22px;
            }
            .space-text-lh2{
                position: relative;
                margin: 5px 0;
                padding-left: 5px;
                line-height: 18px;
                color: rgb(204, 202, 202);
                font-size: 14px;
            }
            .selections{
                position: relative;
                display: flex;
                justify-content: left;
                align-items: center;
                flex-wrap: wrap;
                margin-top: 2px;
                cursor: pointer;
                .selections-item{
                    width: 152px;
                    height: 140px;
                    text-align: center;
                    color: white;
                    transition-duration: 0.3s;
                    margin: 2px 12px;
                    padding: 10px 0;
                    border-radius: 6px;
                    img.pre-img{
                        width: 140px;
                        margin-bottom: 4px;
                        border: 1px solid rgb(165, 163, 163);
                        border-radius: 3px;
                    }
                    .text-a1{
                        font-size: 16px;
                        line-height: 24px;
                    }
                    .text-a2{
                        font-size: 13px;
                    }
                    &:hover{
                        background-color: var(--model-back-hover);
                    }
                }
            }
        }
        &.aero-glass-top{
            .selections-item:hover{
                background-color: var(--model-back-aero-hover) !important;
            }
            .filter-rows .icon-button{
                border-color: var(--model-border-aero-color) !important;
                background-color: var(--model-background-aero-color) !important;
            }
        }
    }
}
.filter-rows{
    position: relative;
    width: calc(100% - 20px);
    padding: 0 10px;
    margin: 4px 0;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    
}
</style>