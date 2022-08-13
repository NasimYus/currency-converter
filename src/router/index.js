import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "core",
    component: () => import("../../src/layouts/CoreLayout"),
    meta: {
      title: "Главная",
    },
    redirect: { name: "currency-list" },
    children: [
      {
        path: "/currency-list",
        name: "currency-list",
        component: () => import("../../src/pages/CurrencyListIndex"),
        meta: {
          title: "Список валют",
        },
      },
      {
        path: "/converter",
        name: "converter",
        component: () => import("../../src/pages/ConverterIndex"),
        meta: {
          title: "Конвертер",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to) => {
  document.title =
    "Eclipse Digital" + (to?.meta?.title ? " - " + to.meta.title : "");
});

export default router;
