import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import MoviesView from '../views/MoviesView.vue'
import SeriesView from '../views/SeriesView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import NewReleasesView from '../views/NewReleasesView.vue'

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
    path: '/movies',
    name: 'movies',
    component: MoviesView
  },
  {
    path: '/series',
    name: 'series',
    component: SeriesView
  },
  {
    path: '/search',
    name: 'searchResults',
    component: SearchResultsView
  },
  {
    path: '/new-releases',
    name: 'newReleases',
    component: NewReleasesView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
