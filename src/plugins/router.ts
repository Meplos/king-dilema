import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: () => import("../views/HomePage.vue") },
  { path: "/player", component: () => import("../views/PlayerPage.vue") },
  //   { path: "/admin", component: () => import("@/views/AdminPage.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
