import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDelteComponent } from './dialog-delte.component';

describe('DialogDelteComponent', () => {
  let component: DialogDelteComponent;
  let fixture: ComponentFixture<DialogDelteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDelteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDelteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
