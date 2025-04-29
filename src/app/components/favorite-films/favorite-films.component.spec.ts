import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteFilmsComponent } from './favorite-films.component';

describe('FavoriteFilmsComponent', () => {
  let component: FavoriteFilmsComponent;
  let fixture: ComponentFixture<FavoriteFilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteFilmsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteFilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
