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

</style>