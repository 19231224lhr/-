import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login'
import Main from '../components/Main'
import Register from '../components/register'
import Person from '../components/Person'
import TrueWenJuan from "@/components/TrueWenJuan";
import NewQuestion1 from "@/components/NewQuestion1";
import NewQuestion2 from "@/components/NewQuestion2";
import Edit from "@/components/Edit";
import ShuJuFenXi from "@/components/ShuJuFenXi";
import ViewWenjuan from "@/components/ViewWenjuan";
import ViewRecovery from "@/components/ViewRecovery";
import ViewAnswer from "@/components/ViewAnswer/ViewAnswer";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/person',
    name: 'Person',
    component: Person
  },
  {
    path: '/wenjuan',
    name: 'TrueWenJuan',
    component: TrueWenJuan
  },
  {
    path: '/new1',
    name: 'NewQuestion1',
    component: NewQuestion1
  },
  {
    path: '/new2',
    name: 'NewQuestion2',
    component: NewQuestion2
  },
  {
    path: '/edit',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/shujufenxi',
    name: 'ShuJuFenXi',
    component: ShuJuFenXi
  },
  {
    path: '/view',
    name: 'View',
    component: ViewWenjuan
  },
  {
    path: '/recovery',
    name: 'Recovery',
    component: ViewRecovery
  },
  {
    path: '/viewanswer',
    name: 'ViewAnswer',
    component: ViewAnswer
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
