import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArtworkComponent } from './listArtwork.component';

describe('ListreunionComponent', () => {
  let component: ListArtworkComponent;
  let fixture: ComponentFixture<ListArtworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListArtworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArtworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
