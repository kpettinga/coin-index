// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import Normalize from "normalize-css";
import ElementUI from "element-ui";
import App from "./App";

Vue.config.productionTip = true;
Vue.use(Normalize);
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
	el: "#app",
	components: { App },
	template: "<App/>"
});
