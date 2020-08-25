import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselTrailerImagesComponent } from './carousel-trailer-images.component';

describe('CarouselTrailerImagesComponent', () => {
  let component: CarouselTrailerImagesComponent;
  let fixture: ComponentFixture<CarouselTrailerImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselTrailerImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselTrailerImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
