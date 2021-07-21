import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { RemoteServiceService, Calon } from './../remote-service.service';
import { Router } from '@angular/router';
import { NavController,ToastController,LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-calon',
  templateUrl: './calon.page.html',
  styleUrls: ['./calon.page.scss'],
})
export class CalonPage implements OnInit {

  Calons: any = [];
  endpoint: string;

  constructor(
    private remoteServiceService: RemoteServiceService,
    private router: Router,
    public loadingController: LoadingController
  ) {
  }

  ngOnInit() {
  }

  removeCalon(calon) {
    if (window.confirm('Hapus Calon ?')) {
      this.remoteServiceService.deleteCalon(calon.id_calon)
      .subscribe(() => {
          this.ionViewWillEnter();
          console.log('Calon Terhapus!')
        }
      )
    }
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.endpoint = this.remoteServiceService.endpoint;
    this.remoteServiceService.getCalon().subscribe((response) => {
      this.Calons = response;
      console.log(response);
      loading.dismiss();
    })
  }
}
