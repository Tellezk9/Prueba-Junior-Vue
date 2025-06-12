import { createRouter, createWebHistory } from "vue-router";
import ProductList from "@/components/ProductList.vue";
import ProductForm from "@/components/ProductForm.vue";

const routes = [
  {
    path: "/product",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/product/new",
    name: "ProductCreate",
    component: ProductForm,
  },
  {
    path: "/product/edit/:id",
    name: "ProductEdit",
    component: ProductForm,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
