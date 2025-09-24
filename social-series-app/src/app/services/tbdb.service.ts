import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../enviroments/enviroment';
import { Observable, map } from 'rxjs';
import { TmdbPagedResponse, TvResult } from '../models/tv.model';

@Injectable({ providedIn: 'root' })
export class TmdbService {
  private api = environment.tmdb.apiBase;
  private key = environment.tmdb.apiKey;
  private img = environment.tmdb.imageBase;

  constructor(private http: HttpClient) {}

  topRatedTv(page = 1): Observable<TvResult[]> {
    const params = new HttpParams()
      .set('api_key', this.key)
      .set('language', 'es-AR')
      .set('page', page);
    return this.http.get<TmdbPagedResponse<TvResult>>(`${this.api}/tv/top_rated`, { params })
      .pipe(
        map(res =>
          res.results
            .filter(tv => tv.poster_path)            
            .sort((a, b) => b.vote_average - a.vote_average)
            .map(tv => ({
              ...tv,
              // mapeo de imagen completa
              poster_path: tv.poster_path ? `${this.img}${tv.poster_path}` : null
            }))
        )
      );
  }
}
