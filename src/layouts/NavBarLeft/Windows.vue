<template>
    <efb-navbar-left class="aero-glass-top">
        <el-menu
            router
            class="el-menu-vertical"
            style="background-color: unset;"
            collapse
        >
        <!-- background-color="var(--global-background-color)" -->
            <el-menu-item index="airport">
                <light-house theme="outline" size="25" fill="#fff"/>
            <template #title>机场信息</template>
            </el-menu-item>
            <el-menu-item index="flight">
                <in-flight theme="outline" size="25" fill="#fff"/>
            <template #title>航班签派</template>
            </el-menu-item>
            <el-menu-item index="explore">
                <search theme="outline" size="25" fill="#fff"/>
            <template #title>探索世界</template>
            </el-menu-item>
            <el-menu-item index="hangar">
                <airplane theme="outline" size="25" fill="#fff"/>
            <template #title>我的机库</template>
            </el-menu-item>
            <el-menu-item index="activity">
                <flag theme="outline" size="25" fill="#fff"/>
            <template #title>官方活动</template>
            </el-menu-item>
            <el-menu-item index="checklist">
                <list-checkbox theme="outline" size="25" fill="#fff"/>
            <template #title>检查单</template>
            </el-menu-item>
            <el-menu-item index="setting">
                <config theme="outline" size="25" fill="#fff"/>
            <template #title>系统设置</template>
            </el-menu-item>
        </el-menu>
    </efb-navbar-left>
</template>

<script lang='ts' setup>
import {LightHouse, InFlight, Search, Airplane, Flag, ListCheckbox, Config} from '@icon-park/vue-next'
</script>

<style lang='less' scoped>
@globalWidthHeight: 45px;
efb-navbar-left{
    position: fixed;
    left: 0;
    top: 0;
    width: @globalWidthHeight;
    height: 100%;
    padding-top: 50px;
    background-color: var(--global-background-color);
    z-index: 398;
    .el-menu{
        position: relative;
        width: 100%;
        border-right: 0;
        .el-menu-item{
            left: -1px;
            height: 35px;
            width: $height;
            margin: 5px;
            margin-bottom: 14px;
            border-radius: 8px;
            padding: 18px;
            display: flex;
            justify-content: center;
            align-items: center;
            transition-duration: 0.4s;
            &.is-active{
                background-color: #000;
            }
        }
    }
}
</style>