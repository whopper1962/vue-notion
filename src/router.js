import Vue from 'vue';
import Router from 'vue-router';
import Main from '@/components/MainPage.vue';
import Binding from '@/views/Study/BindingPage';
import Directive from '@/views/Study/DirectivePage';
import Event from '@/views/Study/EventPage';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes:[
    {
      path:'/',
      name: 'main',
      component: Main
    },
    {
      path:'/study/binding',
      name: 'binding',
      component: Binding
    },
    {
      path:'/study/directive',
      name: 'directive',
      component: Directive
    },
    {
      path:'/study/event',
      name: 'event',
      component: Event
    },
    {
      path:'/*',
      component: Main
    }
  ]
})
