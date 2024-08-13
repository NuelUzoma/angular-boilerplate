import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { HlmButtonDirective } from '../../components/ui-button-helm/src/lib/hlm-button.directive';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    HlmButtonDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * Toggle menu function to encapsulate signup & login at 1024px
   */
  isMenuOpen = false;
  showNavigation = true;
  private routerSubscription!: Subscription;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute.firstChild),
      map((route) => {
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      map((route) => route?.routeConfig?.path),
      map((path) => {
        return !(path === 'signup' || path === 'login' || path === 'dashboard' || path === 'deposit' || path === 'transfer');
      })
    ).subscribe((showNavigation) => {
      this.showNavigation = showNavigation;
      this.isMenuOpen = false;
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
