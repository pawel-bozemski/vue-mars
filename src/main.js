import Vue from 'vue'
const App = () => import("./App.vue")
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "lightgallery.js";
import "lightgallery.js/dist/css/lightgallery.css";



Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


new Vue({
  render: h => h(App),
}).$mount('#app')
