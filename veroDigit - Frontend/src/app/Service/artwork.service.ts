import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Artwork} from "../Model/Artwork";


@Injectable({
  providedIn: 'root'
})
export class ArtworkService {
  private baseUrl = environment.baseUrl + '/api/artworks';

  constructor(private http: HttpClient) {
  }
  ArtWorkList(page: number, itemsPerPage: number): Observable<Artwork[]> {
    const params = {
      page: page.toString(),
      limit: itemsPerPage.toString(), // Match backend parameter name
    };
    return this.http.get<Artwork[]>(`${this.baseUrl}`, { params });
  }
  ArtWorkSearch(q: string, page: number, itemsPerPage: number): Observable<Artwork[]> {
    const params = {
      q: q || '', // Match backend parameter name
      page: page.toString(),
      limit: itemsPerPage.toString(), // Match backend parameter name
    };
    return this.http.get<Artwork[]>(`${this.baseUrl}/search`, { params });
  }
}
