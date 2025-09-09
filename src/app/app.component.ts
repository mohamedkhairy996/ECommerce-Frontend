import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { ReactiveFormsModule } from '@angular/forms';
import { UserHeaderComponent } from './components/user-header/user-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet , ReactiveFormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Fruit-True Tech';
}
