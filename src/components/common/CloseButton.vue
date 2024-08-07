<template>
    <div class="close-button" :button-type=props.isAeroGlass>
            <close theme="outline" size="14" fill="#ffffff"/>
        </div>
</template>

<script lang='ts' setup>
import { Close } from '@icon-park/vue-next'

interface IProps {
    isAeroGlass: boolean
}
const props = defineProps<IProps>()

</script>

<style lang='less' scoped>
.close-button{
    position: absolute;
    top: 10px;
    right: 8px;
    width: 24px;
    height: $width;
    border-radius: 50%;
    background-color: var(--global-background-color);
    cursor: pointer;
    transition-duration: 0.3s;
    &:hover{
        background-color: var(--button-back-hover-lighter);
    }
    span{
        position: relative;
        top: 5px;
    }
    &[button-type = 'true']{
        background-color: var(--button-aero-hover);
        &:hover{
            background-color: var(--button-aero-pressed);
        }
    }
}
</style>