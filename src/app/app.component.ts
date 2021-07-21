import { AuthAdminService } from './services/auth-admin.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private authAdminService: AuthAdminService,
    private router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
  }
  async ngOnInit() {
    await this.storage.create();
  }
  initializeApp() {
    this.platform.ready().then(() => {
 
      this.storage.create();
      this.authenticationService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home-pemilih']);
          return
        }
      });

      this.authAdminService.authenticationState.subscribe(state => {
        if (state) {
          this.router.navigate(['home-admin']);
          return
        }
      });

      this.router.navigate(['home']);
 
    });
  }
}
