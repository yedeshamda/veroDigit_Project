import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListArtworkComponent} from "./Artwork/listArtwork/listArtwork.component";
import {HomeComponent} from "./Home/home.component";

const routes: Routes = [
  {
    path:"artwork",
    component:ListArtworkComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
