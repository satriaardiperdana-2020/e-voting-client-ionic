import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { RemoteServiceService, Calon } from './../remote-service.service';
import { Router } from '@angular/router';
import { NavController,ToastController,LoadingController } from '@ionic/angular'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-perolehan-suara',
  templateUrl: './perolehan-suara.page.html',
  styleUrls: ['./perolehan-suara.page.scss'],
})
export class PerolehanSuaraPage implements OnInit {

  perolehan_suaras: any = [];
  endpoint: string;
  constructor(
    private remoteServiceService: RemoteServiceService,
    private router: Router,
    private storage: Storage,
    private zone: NgZone,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
  }

  ngOnInit() {
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.endpoint = this.remoteServiceService.endpoint;
    this.remoteServiceService.getPerolehanSuara().subscribe((response) => {
      this.perolehan_suaras = response;
      console.log(response);
      loading.dismiss();
    })
  }
}
