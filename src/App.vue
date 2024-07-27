<template>
  <!-- 顶部导航栏 -->
   <NavBarLeftWindows v-if="!isPhone" />
  <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component v-if="$route.meta.keepAlive" :key="$route.name" :is="Component" />
        </KeepAlive>
        <component v-if="!$route.meta.keepAlive" :key="$route.name" :is="Component" />
    </RouterView>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import NavBarLeftWindows from '@/layouts/NavBarLeft/Windows.vue'
import usePhoneWidth from './hooks/global/usePhoneWidth';

const isPhone = ref(false)

onMounted(() => {
    isPhone.value = usePhoneWidth()

    addEventListener('resize',() => isPhone.value = usePhoneWidth())
})
</script>

<style lang='less' scoped>

</style>