import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddComponent } from "./pages/add/add.component";
import { BookComponent } from "./pages/book/book.component";
import { ListComponent } from "./pages/list/list.component";

const routes: Routes = [
    {
        path: 'libros',
        component : BookComponent,
        children: [
            {
                path: 'registrar',
                component: AddComponent             
            },
            {
                path: 'editar/:id',
                component: AddComponent
            },
            {
                path: 'listado',
                component: ListComponent
            },
            {
                path: '**',
                redirectTo: 'registrar'
            }
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BookRoutingModule{}
