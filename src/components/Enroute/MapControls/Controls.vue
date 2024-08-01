<template>
    <efb-map-controls class="aero-small-pressed">
        <div class="control-item">
            <map-draw theme="outline" size="22" fill="#5f96d6"/>
        </div>
        <div class="divider"></div>
        <div class="control-item">
            <sun-one theme="outline" size="22" fill="#5f96d6"/>
            <!-- <moon theme="outline" size="24" fill="#5f96d6"/> -->
        </div>
        <div class="divider"></div>
        <div class="control-item">
            <local theme="outline" size="22" fill="#5f96d6"/>
        </div>
    </efb-map-controls>
</template>

<script lang='ts' setup>
import { MapDraw, SunOne, Moon, Local } from '@icon-park/vue-next'
</script>

<style lang='less' scoped>
efb-map-controls{
    position: absolute;
    right: 10px;
    //top: 55px;
    top: 15px;
    width: 34px;
    height: 102px;
    background-color: unset;
    border-radius: 8px;
    background-image: linear-gradient(30deg, rgba(255, 255, 255, 0.48) 40%, rgba(255, 255, 255, 0.59) 80%);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: $backdrop-filter;
    user-select: none;
    z-index: 5;
    .control-item{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: middle;
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        transition-duration: 0.3s;
        span{
            position: relative;
            top: 7px;
        }
    }
    .divider{
        position: relative;
        width: 100%;
        height: 1px;
        background-color: rgba(125, 125, 125, 0.4);
    }
}
</style>