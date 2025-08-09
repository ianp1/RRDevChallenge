import { Routes } from '@angular/router';
import { PlatformSearch } from './features/platform-search/platform-search';
import { PlatformDetails } from './features/platform-details/platform-details';

export const routes: Routes = [
    {
        path: '',
        component: PlatformSearch
    },
    {
        path: 'platforms/:platformId',
        component: PlatformDetails
    }
];
