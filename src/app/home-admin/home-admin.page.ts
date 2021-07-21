import { AuthAdminService } from './../services/auth-admin.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.page.html',
  styleUrls: ['./home-admin.page.scss'],
})
export class HomeAdminPage implements OnInit {

  username: string;

  constructor(
    public toastController: ToastController,
    private storage: Storage,
    private router: Router,
    private authAdminService: AuthAdminService
    ) { }

    async ngOnInit() {
      await this.storage.create();
    }
  ionViewWillEnter() {
    this.storage.get('session_storage').then((res) => {
      console.log(res);
      
      this.username = res.data.username;
    });
  }

  calon() {
    this.router.navigate(['/calon']);
  }

  pemilih() {
    this.router.navigate(['/pemilih']);
  }

  laporan() {
    this.router.navigate(['/laporan']);
  }

  async logout() {
    this.storage.clear();
    this.authAdminService.logout();
    this.router.navigate(['/login-admin']);
    this.presentToast("Logout Berhasil","primary");
  }

  async presentToast(Message,color) {
    const toast = await this.toastController.create({
      message: Message,
      duration: 2500,
      position: "bottom",
      color: color
    });
    toast.present();
  }
}
