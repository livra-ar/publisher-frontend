import { Component } from '@angular/core';
import { fadeInAnimation } from './animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fadeInAnimation
  ]
})
export class AppComponent {
  title = 'ar-frontend';

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
