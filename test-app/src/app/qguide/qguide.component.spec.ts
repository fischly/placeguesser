import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QguideComponent } from './qguide.component';

describe('QguideComponent', () => {
  let component: QguideComponent;
  let fixture: ComponentFixture<QguideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QguideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QguideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
