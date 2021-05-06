import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookEditionsFormComponent } from './add-book-editions-form.component';

describe('AddBookEditionsFormComponent', () => {
  let component: AddBookEditionsFormComponent;
  let fixture: ComponentFixture<AddBookEditionsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookEditionsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBookEditionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
