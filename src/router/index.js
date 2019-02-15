import Vue from 'vue';
import Router from 'vue-router';
import Courses from '@/components/Courses.vue';
import Students from '@/components/Students.vue';
import Index from '@/components/Index.vue';

Vue.use(Router);

export default new Router({
    routes: [
      {
          path: '/',
          name: 'index',
          component: Index
      },
      {
          path: '/courses',
          name: 'courses',
          component: Courses
      },
      {
          path: '/students',
          name: 'students',
          component: Students
      }
    ]
});
