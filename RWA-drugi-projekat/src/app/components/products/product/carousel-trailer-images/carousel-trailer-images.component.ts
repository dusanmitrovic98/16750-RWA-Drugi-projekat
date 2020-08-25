import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carousel-trailer-images',
  templateUrl: './carousel-trailer-images.component.html',
  styleUrls: ['./carousel-trailer-images.component.css'],
})
export class CarouselTrailerImagesComponent implements OnInit {
  @Input() model: any;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
  }

  getFromURL(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
