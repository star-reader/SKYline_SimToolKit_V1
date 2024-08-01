import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import Vant from 'vant'
import App from './App.vue'
import router from './router'

import 'mapbox-gl/dist/mapbox-gl.css';
import 'vant/lib/index.css';
import 'element-plus/dist/index.css'
import './themes/root.less'
import './themes/global.less'
import './themes/element-overrid.less'
import './themes/phone-overrid.less'
import './themes/night.less'
import './themes/animation.css'
import './themes/aero.less'

const app = createApp(App)

app.use(router).use(ElementPlus).use(Vant)

app.mount('#app')
