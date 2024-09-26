import { CommonModule } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent implements OnInit {
  newsArticles: any[] = [];
  youtubeVideoUrls: SafeResourceUrl[] = [];

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.fetchNews();
    this.loadYoutubeVideos();
  }

  fetchNews(): void {
    const apiUrl = 'https://newsapi.org/v2/everything';
    const apiKey = '584c2240c03448618392b242a7a083ac'; // 584c2240c03448618392b242a7a083ac :Replace with your actual NewsAPI key

    let params = new HttpParams()
      .set('q', 'cryptocurrency OR bitcoin')
      .set('language', 'en')
      .set('pageSize', '3')
      .set('apiKey', apiKey);

    this.http.get<any>(apiUrl, { params }).subscribe({
      next: (data) => {
        this.newsArticles = data.articles;
      },
      error: (error) => {
        console.error('Failed to fetch news:', error);
      }
    });
  }

  loadYoutubeVideos(): void {
    const videoIds = ['iyOq8DhaMYw', 'EYwLa1ZWD2o'];
    this.youtubeVideoUrls = videoIds.map(id => 
      this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${id}`)
    );
  }
}
