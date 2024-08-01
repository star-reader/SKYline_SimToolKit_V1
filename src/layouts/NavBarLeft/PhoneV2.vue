<template>
    <van-floating-panel
        class="efb-floating-panel efb-float-bottom aero-glass-top"    
        v-model:height="height" 
        :anchors="anchors"
    >
        <!-- 在这里展示搜索框等内容 -->
        <van-search v-model="searchValue" 
        input-align="center" 
        placeholder="探索世界" />
        <main>
            <div class="divider-text">更多功能</div>
            <el-card class="inner-model-teary">
                <van-badge class="inner-badge">
                    <div class="inner-child"
                    @click="() => handleRouterGo('/airport')">
                        <light-house theme="outline" size="24" fill="#fff"/> <br>
                        机场信息
                    </div>
                </van-badge>
                <van-badge class="inner-badge">
                    <div class="inner-child"
                    @click="() => handleRouterGo('/flight')">
                        <in-flight theme="outline" size="24" fill="#fff"/> <br>
                        航班签派
                    </div>
                </van-badge>
                <van-badge class="inner-badge">
                    <div class="inner-child"
                    @click="() => handleRouterGo('/hanger')">
                        <airplane theme="outline" size="24" fill="#fff"/> <br>
                        我的机库
                    </div>
                </van-badge>
                <van-badge class="inner-badge">
                    <div class="inner-child"
                    @click="() => handleRouterGo('/activity')">
                        <flag theme="outline" size="25" fill="#fff"/> <br>
                        官方活动
                    </div>
                </van-badge>
                <van-badge class="inner-badge">
                    <div class="inner-child"
                    @click="() => handleRouterGo('/checklist')">
                    <list-checkbox theme="outline" size="25" fill="#fff"/> <br>
                        检查单
                    </div>
                </van-badge>
                <van-badge class="inner-badge">
                    <div class="inner-child"
                    @click="() => handleRouterGo('/setting')">
                    <config theme="outline" size="25" fill="#fff"/> <br>
                        系统设置
                    </div>
                </van-badge>
            </el-card>
        </main>
    </van-floating-panel>

</template>

<script lang='ts' setup>
import { ref } from 'vue'
import {LightHouse, InFlight, Airplane, Flag, ListCheckbox, Config} from '@icon-park/vue-next'
import router from '@/router';

const anchors = [
    75,
    Math.round(0.4 * window.innerHeight),
    Math.round(0.7 * window.innerHeight),
    Math.round(0.9 * window.innerHeight),
]
const height = ref(anchors[0])
const searchValue = ref('')

const handleRouterGo = (to: string) => {
    router.push(to)
}
</script>

<style lang='less' scoped>
main{
    margin: 15px;
}
.divider-text{
    font-size: 14px;
    font-weight: bolder;
    color: var(--background-text);
    line-height: 24px;
}
.inner-child {
    width: 42px;
    height: $width;
    background: var(--model-icon-background-color);
    border-radius: 8px;
    padding: 6px;
}
.inner-badge{
    // position: relative;
    // display: block;
    // width: 40px;
    margin: 0 5px;
    margin-bottom: 10px;
    text-align: center;
    font-size: 10px;
    color: var(--background-text-lighter);
    line-height: 16px;
}
</style>