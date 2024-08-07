<template>
    <div class="rowdata-item">
        <div class="icon-wrapper-flexed">
            <div @click="handleChange"  :class="`icon-button ${isActive ? 'actived' : 'inactive'}`"">
                <slot></slot>
            </div>
        </div>
        <div class="ins-text-a">{{props.content}}</div>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import pubsub from 'pubsub-js'
import { isActived } from '@/hooks/map/useEnrouteMap';

interface IProps {
    content: string,
    data: string,
    isNaClick?: boolean
}

const props = defineProps<IProps>()
const isActive = ref(isActived(props.data))

const handleChange = () => {
    if (props.isNaClick) return
    pubsub.publish('change-enroute-style', props.data)
    isActive.value = !isActive
}

onMounted(() => {
    pubsub.subscribe('change-enroute-preset',() => {
        isActive.value = isActived(props.data)
    })
})

</script>

<style lang='less' scoped>
.filter-rows{
    position: relative;
    width: calc(100% - 20px);
    padding: 0 10px;
    margin: 4px 0;
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    .rowdata-item{
        position: relative;
        width: 70px;
        margin: 0;
        padding: 2px;
        text-align: center;
        .icon-wrapper-flexed{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .icon-button{
            position: relative;
            //margin-top: 8px;
            width: 26px;
            padding: 6px;
            height: $width;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            vertical-align: middle;
            cursor: pointer;
            border: 0px solid black;
            border-width: 1.2px;
            border-color: var(--model-border-color);
            background-color: var(--model-icon-background-color);
            &.actived{
                background-color:#3CB371 !important;
            }
        }
        .ins-text-a{
            position: relative;
            margin-top: 5px;
            color: white;
            font-size: 14px;
            line-height: 22px;
        }
    }
}
</style>