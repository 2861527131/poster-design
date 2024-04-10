/*
 * @Author: ShawnPhang
 * @Date: 2022-03-03 14:13:16
 * @Description:
 * @LastEditors: ShawnPhang <https://m.palxp.cn>
 * @LastEditTime: 2024-04-08 18:19:35
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import utils from './utils'
import 'normalize.css/normalize.css'
import '@/assets/styles/index.less'
import elementConfig from './utils/widgets/elementConfig'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

elementConfig.components.forEach((component) => {
  app.component(component.name, component)
})

elementConfig.plugins.forEach((plugin) => {
  app.use(plugin)
})

app
  // .use(store)
  .use(pinia)
  .use(router)
  .use(utils)
  .mount('#app')
