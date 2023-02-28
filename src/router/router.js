import {createWebHistory, createRouter} from "vue-router";
import SolveProblem from "@/view/SolveProblem";
import FoodShow from "@/view/FoodShow";
import FoodUpdate from "@/view/FoodUpdate";
import FoodCreate from "@/view/FoodCreate";
import FoodTagShow from "@/view/FoodTagShow";
import MenuFoodShow from "@/view/MenuFoodShow";
import MenuShow from "@/view/MenuShow";
import MenuUpdate from "@/view/MenuUpdate";
import MenuCreate from "@/view/MenuCreate";
import SolveShow from "@/view/SolveShow";
import TagAll from "@/view/TagAll";
import SignUpPage from "@/view/account/SignUpPage";
import SignInPage from "@/view/account/SignInPage";

const routes = [
    {
        path: "/",
        name: "solve",
        component: SolveProblem
    },
    {
        path: "/food",
        name: "food",
        component: FoodShow
    },
    {
        path: "/food/:id/edit",
        name: "foodEdit",
        component: FoodUpdate
    },
    {
        path: "/food/create",
        name: "foodCreate",
        component: FoodCreate
    },
    {
        path: "/food/:id/tags",
        name: "foodTagShow",
        component: FoodTagShow
    },
    {
        path: "/menu",
        name: "menu",
        component: MenuShow
    },
    {
        path: "/menu/:id/food",
        name: "menuFoodShow",
        component: MenuFoodShow
    },
    {
        path: "/menu/:id/edit",
        name: "menuEdit",
        component: MenuUpdate
    },
    {
        path: "/menu/create",
        name: "menuCreate",
        component: MenuCreate
    },
    {
        path: "/answer",
        name: "answer",
        component: SolveShow
    },
    {
        path: "/tag",
        name: "tag",
        component: TagAll
    },
    {
        path: "/signup",
        name: "signUp",
        component: SignUpPage
    },
    {
        path: "/signin",
        name:"signIn",
        component: SignInPage
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;