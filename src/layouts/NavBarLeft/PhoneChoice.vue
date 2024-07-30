<template>
    <Transition name="mask">
        <!-- 过渡动画 -->
        <!-- <efb-global-mask v-if="props.showState">
        </efb-global-mask> -->
        <van-floating-panel
            bottom-collapse
            class="efb-floating-panel"
            v-if="props.showState" 
            v-model:height="height" 
            :anchors="anchors" 
            @heightChange="heightChange"
            style="overflow: hidden;"
        >
            <div class="navitem clickable --notbeta" @click="() => handleRouterClick('/checklist')">
                <div class="icon-container">
                    <list-checkbox theme="outline" size="22" fill="#fff"/>
                </div>
                <div class="context-container">
                    <div class="upper-main">
                        检查单
                    </div>
                </div>
            </div>
            <div class="navitem clickable --notbeta" @click="() => handleRouterClick('/setting')">
                <div class="icon-container">
                    <config theme="outline" size="22" fill="#fff"/>
                </div>
                <div class="context-container">
                    <div class="upper-main">
                        系统设置
                    </div>
                </div>
            </div>
            </van-floating-panel>
    </Transition>
    
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import { ListCheckbox, Config } from '@icon-park/vue-next'
import pubsub from 'pubsub-js'
import router from '@/router';

interface Props {
    showState: boolean
}
const props = defineProps<Props>()

const anchors = [
    0,
    150
]
const height = ref(anchors[1])

const heightChange = (h: {height: number}) => {
    if (h.height <= 50){
        pubsub.publish('phone-close-choice', 1)
    }
}

const handleRouterClick = (to: string) => {
    router.push(to)
    pubsub.publish('phone-close-choice', 1)
}

onMounted(() => {
    pubsub.subscribe('phone-open-choice',() => {
        height.value = anchors[1]
    })
})


</script>

<style lang='less' scoped>
.navitem.clickable{
    position: relative;
    height: 50px;
    margin: 5px 10px;
    margin-left: 15px;
    display: flex;
    flex-wrap: nowrap;
    justify-content: left;
    align-items: center;
    transition-duration: 0.3s;
    &:hover{
        background-color: var(--model-back-hover);
    }
    .icon-container{
        position: relative;
        width: 26px;
        margin: 14px;
        padding: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: var(--model-icon-background-color);
        border: 1px solid var(--model-border-color);
    }
    .context-container{
        margin-left: 4px;
        .upper-main{
            line-height: 22px;
            font-size: 15px;
        }
        .lower-sub{
            line-height: 16px;
            font-size: 14px;
        }
    }
}
</style>