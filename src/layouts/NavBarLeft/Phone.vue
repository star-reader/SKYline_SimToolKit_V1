<template>
    <efb-navbar-bottom>
        <van-tabbar v-model="activeTab">
            <van-tabbar-item>
                <light-house theme="outline" size="22" fill="#fff"/> <br>
                机场信息
            </van-tabbar-item>
            <van-tabbar-item>
                <in-flight theme="outline" size="22" fill="#fff"/> <br>
                航班签派
            </van-tabbar-item>
            <van-tabbar-item>
                <search theme="outline" size="22" fill="#fff"/> <br>
                探索世界
            </van-tabbar-item>
            <van-tabbar-item>
                <airplane theme="outline" size="22" fill="#fff"/> <br>
                我的机库
            </van-tabbar-item>
            <van-tabbar-item>
                <double-up theme="outline" size="22" fill="#fff"/> <br>
                更多功能
            </van-tabbar-item>
            <!-- <van-tabbar-item>
                <list-checkbox theme="outline" size="22" fill="#fff"/> <br>
                检查单
            </van-tabbar-item>
            <van-tabbar-item>
                <config theme="outline" size="22" fill="#fff"/> <br>
                系统设置
            </van-tabbar-item> -->
        </van-tabbar>
    </efb-navbar-bottom>
</template>

<script lang='ts' setup>
import { ref } from 'vue';
import {LightHouse, InFlight, Search, Airplane, DoubleUp} from '@icon-park/vue-next'


const activeTab = ref('')


</script>

<style lang='less' scoped>
efb-navbar-bottom{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 45px;
    background-color: var(--global-background-color);
}
</style>