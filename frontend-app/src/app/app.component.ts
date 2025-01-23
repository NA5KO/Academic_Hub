import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  showHeader = true;
  showLeftMenu = true;
  showRightMenu = true;

  // zedt constructor to handle route data w nchouf el etat mtaa header w left w right menu
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentRoute = this.getCurrentRoute(this.activatedRoute);
        this.showHeader = currentRoute.snapshot.data['showHeader'] ?? true;
        this.showLeftMenu = currentRoute.snapshot.data['showLeftMenu'] ?? true;
        this.showRightMenu = currentRoute.snapshot.data['showRightMenu'] ?? true;
      });
  }

  private getCurrentRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }
}

