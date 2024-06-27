# MovieStrikeApp

MovieStrikeApp es una aplicación web similar a Netflix que permite a los usuarios ver nuevas películas y series, extrayendo imágenes e información de la API de TMDB (The Movie Database). Está desarrollada utilizando Vue.js con TypeScript, Axios para las solicitudes HTTP y Pinia para el manejo del estado global.

## Características

- Ver una lista de nuevas películas y series.
- Ver detalles de películas y series, incluyendo sinopsis y pósteres.
- Buscar películas y series.
- Navegación fluida entre diferentes vistas y detalles de contenido.

## Tecnologías utilizadas

- [Vue.js](https://vuejs.org/) - Framework JavaScript para construir interfaces de usuario.
- [TypeScript](https://www.typescriptlang.org/) - Superconjunto de JavaScript que añade tipos estáticos.
- [Axios](https://axios-http.com/) - Cliente HTTP basado en promesas.
- [Pinia](https://pinia.vuejs.org/) - Sistema de gestión de estado para Vue.js.
- [TMDB API](https://www.themoviedb.org/documentation/api) - Fuente de datos para información de películas y series.

## Requisitos previos

- Node.js y npm (Node Package Manager) instalados.

## Instalación

1. Clona el repositorio:

   git clone https://github.com/tu-usuario/moviestrikeapp.git

2. Navega al directorio del proyecto:

    cd moviestrikeapp

3. Instala las dependencias:
 
    npm install

4. Crea un archivo .env en la raíz del proyecto y añade tu clave de API de TMDB:

   VUE_APP_TMDB_API_KEY=tu_clave_de_api

5. Inicia el proyecto:

   npm run dev

## Estructura del proyecto

moviestrikeapp/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── AppFooter.css
│   │   │   ├── AppNavbar.css
│   │   │   ├── MovieandSeriesdetail.css
│   │   │   ├── MovieList.css
│   │   │   ├── MovieComponent.css
│   │   │   ├── MovieSwiper.css
│   │   │   ├── NewReleaseComponent.css
│   │   │   ├── SearchResultsComponent.css
│   │   │   └── SeriesComponent.css
│   │   ├── linkein.png
│   │   └── logo.png
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppNavbar.vue
│   │   ├── MovieandSeriesdetail.vue
│   │   ├── MovieList.vue
│   │   ├── MovieComponent.vue
│   │   ├── MovieSwiper.vue
│   │   ├── NewReleaseComponent.vue
│   │   ├── SearchResultsComponent.vue
│   │   └── SeriesComponent.vue
│   ├── router/
│   │   └── index.ts
│   ├── store/
│   │   ├── genres.ts
│   │   ├── index.ts
│   │   ├── movies.ts
│   │   └── series.ts
│   ├── types/
│   │   ├── genres.ts
│   │   ├── movie.ts
│   │   ├── recommendation.d.ts
│   │   ├── series.ts
│   │   └── trailer.ts
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── MovieandSeriesView.vue
│   │   ├── MoviesView.vue
│   │   ├── NewReleasesView.vue
│   │   ├── SearchResultsView.vue
│   │   └── Series.vue
│   ├── App.vue
│   ├── main.ts
│   └── router.ts
├── .eslintrc.js
├── .gitignore
├── babel.config.js
├── package.json
├── tsconfig.json
└── vue.config.js