import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./book/pages/home/home.component";

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./book/book-routing.module').then(module => module.BookRoutingModule)
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: '**', redirectTo: 'home'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{}
