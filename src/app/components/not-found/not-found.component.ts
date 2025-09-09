import { Component } from '@angular/core';
import { UserHeaderComponent } from '../user-header/user-header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-not-found',
  imports: [UserHeaderComponent , FooterComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

}
