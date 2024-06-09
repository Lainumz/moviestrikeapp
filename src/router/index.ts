import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import TopRatedView from '../views/TopRatedView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import NewReleasesView from '../views/NewReleasesView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'movieDetail',
    component: MovieDetailView
  },
  {
    path: '/top-rated',
    name: 'top-rated',
    component: TopRatedView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView
  },
  {
    path: '/new-releases',
    name: 'new-releases',
    component: NewReleasesView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchResultsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
