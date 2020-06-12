import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.css";
import "uikit/dist/css/uikit.min.css";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";

UIkit.use(Icons);
Vue.use(VueAxios, axios);
