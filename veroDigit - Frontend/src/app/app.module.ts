import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Shared/header/header.component';
import { LeftsidebarComponent } from './Shared/leftsidebar/leftsidebar.component';
import { MainSharedComponenetComponent } from './Shared/main-shared-componenet/main-shared-componenet.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DragScrollModule} from "ngx-drag-scroll";
import {FullCalendarModule} from "@fullcalendar/angular";
import {NgxPaginationModule, PaginationControlsComponent} from "ngx-pagination";
import {RichTextEditorModule} from "@syncfusion/ej2-angular-richtexteditor";
import {CommonModule, DatePipe} from "@angular/common";
import {ToastrModule} from "ngx-toastr";
import {ListArtworkComponent} from "./Artwork/listArtwork/listArtwork.component";
import {HomeComponent} from "./Home/home.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LeftsidebarComponent,
    MainSharedComponenetComponent,
    ListArtworkComponent,
    HomeComponent
  ],
  imports: [
    ToastrModule.forRoot(),
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragScrollModule,
    FullCalendarModule,
    BrowserModule,
    AppRoutingModule,
    FullCalendarModule, // Add FullCalendarModule here
    RichTextEditorModule,
    NgxPaginationModule,
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
