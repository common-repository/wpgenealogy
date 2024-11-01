import Vue from 'vue'
import 'bootstrap'
import App from './App.vue'
import router from './router'
import store from './store'
import './modules/jquery-ui'
import panZoom from 'vue-panzoom'
import Qs from "qs";
import Axios from 'axios'

import VCalendar from 'v-calendar';

import VueApexCharts from 'vue-apexcharts'
Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)



Vue.prototype.$http = Axios;
Vue.prototype.$qs = Qs;
Vue.use(panZoom);
Vue.use(VCalendar);
import {
	library,
	dom
}
from '@fortawesome/fontawesome-svg-core'
import {
	faTachometerAlt,
	faArrowCircleRight
}
from '@fortawesome/free-solid-svg-icons'
import {
	faBuilding,
	faEdit
}
from '@fortawesome/free-regular-svg-icons'
library.add(faTachometerAlt, faBuilding, faEdit, faArrowCircleRight)
dom.watch()
Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#treeprerss')