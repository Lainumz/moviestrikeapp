import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieAndSeriesDetailView from '../views/MovieandSeriesView.vue' // Nuevo componente combinado
import MoviesView from '../views/MoviesView.vue'
import NewReleasesView from '../views/NewReleasesView.vue'
import SearchResultsView from '../views/SearchResultsView.vue'
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
    component: MovieAndSeriesDetailView // Usando el componente combinado
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
    component: MovieAndSeriesDetailView
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
