import {createApp} from 'vue'
import App from './App.vue'
import router from "@/router/router";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import FoodEdit from "@/components/FoodEdit";
import TagShow from "@/components/TagShow";
import FoodTagShow from "@/view/FoodTagShow";


const app = createApp(App);
app.use(router)
    .use(ElementPlus);
app.component("food-edit", FoodEdit);
app.component("tag-show", TagShow);
app.component("food-table-show", FoodTagShow);

app.mount('#app')
