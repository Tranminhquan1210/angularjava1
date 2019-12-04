import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/model/movie';
import { MovieService } from 'src/app/movie/movie.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = '';
  model: any;
  page = 1;
  pageSize = 2;
  // movies: Movie[] = [];

  // Inject the MovieService, ToastService
  constructor(private movieService: MovieService, private toastService: ToastService) {
  }

  ngOnInit(): void {
    // this.movies = this.movieService.getMovies();
  }

  
  
}
