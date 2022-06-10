import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";


describe('Component: App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create app component', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy()
  })
})
