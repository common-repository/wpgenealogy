import Vue from 'vue'
import Router from 'vue-router'
import publicRoutes from './public'
import dashboardRoutes from './dashboard'
Vue.use(Router)
var routes = []
routes = routes.concat(publicRoutes, dashboardRoutes)
const router = new Router({
	linkActiveClass: "active",
	linkExactActiveClass: "exact-active",
	routes: routes
})
export default router;