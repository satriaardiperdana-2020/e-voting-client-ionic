import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { RemoteServiceService, Calon } from './../remote-service.service';
import { Router } from '@angular/router';
import { NavController,ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-pemilih',
  templateUrl: './pemilih.page.html',
  styleUrls: ['./pemilih.page.scss'],
})
export class PemilihPage implements OnInit {

  Pemilihs: any = [];
  endpoint: string;

  constructor(
    private remoteServiceService: RemoteServiceService,
    private router: Router,
    public loadingController: LoadingController
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
    this.remoteServiceService.getPemilih().subscribe((response) => {
      this.Pemilihs = response;
      console.log(response);
      loading.dismiss();
    })
  }
}
