<template>
    <efb-navbar-bottom>
        <van-tabbar v-model="activeTab" @change="handleChange">
            <van-tabbar-item name="airport">
                <light-house theme="outline" size="22" fill="#fff"/> <br>
                机场信息
            </van-tabbar-item>
            <van-tabbar-item name="flight">
                <in-flight theme="outline" size="22" fill="#fff"/> <br>
                航班签派
            </van-tabbar-item>
            <van-tabbar-item name="explore">
                <search theme="outline" size="22" fill="#fff"/> <br>
                探索世界
            </van-tabbar-item>
            <van-tabbar-item name="hangar">
                <airplane theme="outline" size="22" fill="#fff"/> <br>
                我的机库
            </van-tabbar-item>
            <van-tabbar-item @click="clickMore" name="more">
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
    <NavbarPhoneChoice :showState="isShowChoice" />
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import pubsub from 'pubsub-js'
import {LightHouse, InFlight, Search, Airplane, DoubleUp} from '@icon-park/vue-next'
import NavbarPhoneChoice from '@/layouts/NavBarLeft/PhoneChoice.vue'
import router from '@/router';

const activeTab = ref('')
const isShowChoice = ref(false)
const clickMore = () => {
    activeTab.value = ''
    if (isShowChoice.value){
        return isShowChoice.value = false
    }
    pubsub.publish('phone-open-choice',1)
    isShowChoice.value = true
}

const handleChange = (tab: string) => {
    if (tab === 'more') return
    router.push(`/${tab}`)
}

onMounted(() => {
    pubsub.subscribe('phone-close-choice',() => isShowChoice.value = false)
})

</script>

<style lang='less' scoped>
efb-navbar-bottom{
    position: fixed;
    left: 0;
    width: 100%;
    bottom: 0;
    height: 45px;
    background-color: var(--global-background-color);
    z-index: 399;
}
</style>