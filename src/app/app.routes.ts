import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'all',
        pathMatch: 'full'
    },
    {
        path: 'all',
        loadComponent: () => import('./components/landing-page/landing-page.component').then(m => m.LandingPageComponent),
    },
    {
        path: 'favorites',
        loadComponent: () => import('./components/favorite-films/favorite-films.component').then(m => m.FavoriteFilmsComponent),
    },
    {
        path: 'watchlist',
        loadComponent: () => import('./components/watch-list/watch-list.component').then(m => m.WatchListComponent),
    },
];
