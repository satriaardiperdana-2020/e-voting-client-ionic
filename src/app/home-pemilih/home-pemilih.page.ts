import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home-pemilih',
  templateUrl: './home-pemilih.page.html',
  styleUrls: ['./home-pemilih.page.scss'],
})
export class HomePemilihPage implements OnInit {

  nama: string;

  constructor(
    public toastController: ToastController,
    private storage: Storage,
    private router: Router,
    private authService: AuthenticationService
  ) { 

  }

  async ngOnInit() {
    await this.storage.create();
  }
  ionViewWillEnter() {
    this.storage.get('session_storage').then((res) => {
      console.log(res);
      this.nama = res.data.nama;
    });
  }

  async logout() {
    this.storage.clear();
    this.authService.logout();
    this.router.navigate(['/login-pemilih']);
    this.presentToast("Logout Berhasil","primary");
  }

  voting() {
    this.router.navigate(['/voting']);
  }

  perolehanSuara() {
    this.router.navigate(['/perolehan-suara']);
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
