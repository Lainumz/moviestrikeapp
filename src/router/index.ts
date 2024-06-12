import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import MoviesView from '../views/MoviesView.vue'
import NewReleasesView from '../views/NewReleasesView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
import SeriesDetailView from '../views/SeriesDetailView.vue'
import SeriesView from '../views/SeriesView.vue'

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
    path: '/new-releases',
    name: 'newReleases',
    component: NewReleasesView
  },
  {
    path: '/search-results',
    name: 'searchResults',
    component: SearchResultsView
  },
  {
    path: '/series/:id',
    name: 'seriesDetail',
    component: SeriesDetailView
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
