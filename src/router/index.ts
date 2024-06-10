import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewReleasesView from '../views/NewReleasesView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import MoviesView from '../views/MoviesView.vue'
import SeriesView from '../views/SeriesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/new-releases',
    name: 'newReleases',
    component: NewReleasesView
  },
  {
    path: '/search',
    name: 'searchResults',
    component: SearchResultsView
  },
  {
    path: '/movies',
    name: 'movies',
    component: MoviesView
  },
  {
    path: '/series',
    name: 'series',
    component: SeriesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
