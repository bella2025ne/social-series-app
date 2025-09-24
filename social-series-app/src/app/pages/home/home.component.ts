import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmdbService } from '../../services/tbdb.service';
import { TvResult } from '../../models/tv.model';
import { SeriesCardComponent } from '../../shared/components/series-card/series-card.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, SeriesCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loading = true;
  series: TvResult[] = [];

  constructor(private tmdb: TmdbService) {
    this.tmdb.topRatedTv().subscribe(list => {
      this.series = list;
      this.loading = false;
    });
  }
}
