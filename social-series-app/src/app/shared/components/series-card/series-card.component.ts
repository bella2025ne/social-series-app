import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TvResult } from '../../../models/tv.model';

@Component({
  standalone: true,
  selector: 'app-series-card',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './series-card.component.html',
  styleUrls: ['./series-card.component.scss'],
})
export class SeriesCardComponent implements OnInit {
  @Input() tv!: TvResult;
  userForm!: FormGroup;

  // cache de lo ingresado para mostrarlo debajo
  submitted = false;
  userRating: number | null = null;
  userComment = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // estado local del usuario (no se persiste)
    this.userForm = this.fb.group({
      rating: [null as number | null, [Validators.required, Validators.min(1), Validators.max(10)]],
      comment: [''],
    });
  }

  get displayAverage(): string {
    if (this.userRating == null) return this.tv.vote_average.toFixed(1);
    const avg = (this.tv.vote_average + this.userRating) / 2;
    return avg.toFixed(1);
  }

  submitUserRating() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.userRating = this.userForm.value.rating!;
    this.userComment = this.userForm.value.comment || '';
    this.submitted = true;
  }
}
