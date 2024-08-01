<template>
  <!-- 顶部导航栏 -->
  <NavBarLeftWindows v-if="!isPhone" />
  <!-- <NavBarLeftPhone v-else /> -->
  <NavbarPhoneV2 v-else />
   <!-- 航路图组件 -->
  <EnrouteView />
  <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component v-if="$route.meta.keepAlive" :key="$route.name" :is="Component" />
        </KeepAlive>
        <component v-if="!$route.meta.keepAlive" :key="$route.name" :is="Component" />
    </RouterView>
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue';
import pubsub from 'pubsub-js'
import NavBarLeftWindows from '@/layouts/NavBarLeft/Windows.vue'
// import NavBarLeftPhone from '@/layouts/NavBarLeft/Phone.vue'
import NavbarPhoneV2 from '@/layouts/NavBarLeft/PhoneV2.vue'
import EnrouteView from './views/EnrouteView.vue';
import usePhoneWidth from './hooks/global/usePhoneWidth';

const isPhone = ref(false)

onMounted(() => {
    isPhone.value = usePhoneWidth()

    addEventListener('resize',() => isPhone.value = usePhoneWidth())
})
</script>

<style lang='less' scoped>

</style>