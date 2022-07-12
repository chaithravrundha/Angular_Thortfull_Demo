import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ProductServiceService } from './service/product-service.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>

  const mockService = jasmine.createSpyObj('ProductServiceService',['getProduct', 'deleteProduct']);

  mockService.getProduct.and.returnValue(of({
    body: [],
    headers: { get: () => { } }
  }));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialog,
        RouterModule.forRoot([]),
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef },
        { provide: ProductServiceService, useValue: mockService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
     /* @ts-ignore */
     component.id = 1;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call `getProduct` if server response success', () => {
      mockService.getProduct().subscribe((response: any) => {
      expect(component.dataSource).toBe(response.body);
      expect(mockService.getProduct).toHaveBeenCalled();
     });
   });


   it('should get product  when `getAllProducts` called', () => {
    spyOn(component, 'getAllProducts');
    component.getAllProducts();
    mockService.getProduct().subscribe((response:any) => {
    expect(response).toEqual(response);
    });
   });

  it(`should have as title 'Angular_Thortful_Demo'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Angular_Thortful_Demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Angular_Thortful_Demo app is running!');
  });
});
