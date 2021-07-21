
import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { RemoteServiceService, Calon } from './../remote-service.service';
import { Router } from '@angular/router';
import { NavController,ToastController,LoadingController } from '@ionic/angular'
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.page.html',
  styleUrls: ['./voting.page.scss'],
})
export class VotingPage implements OnInit {

  Calons: any = [];
  endpoint: string;
  id_pemilih: string;

  constructor(
    private remoteServiceService: RemoteServiceService,
    private router: Router,
    private storage: Storage,
    private zone: NgZone,
    public loadingController: LoadingController,
    public toastController: ToastController,
  ) {
  }

  async ngOnInit() {
    await this.storage.create();
  }

  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.endpoint = this.remoteServiceService.endpoint;
    this.remoteServiceService.getCalonPemilih().subscribe((response) => {
      this.Calons = response;
      console.log(response);
      loading.dismiss();
    })
  }

  async pilih(calon){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.storage.get('session_storage').then((res) => {
      console.log(res);
      this.id_pemilih = res.data.id;
    });
    this.remoteServiceService.pilihCalon(calon.id_calon,this.id_pemilih).subscribe((response) => {
      this.zone.run(() => {
        let json = JSON.parse(JSON.stringify(response));
        console.log(json);
        if(json.status == true){
          this.presentToast("Voting Berhasil","success");
        }else{
          this.presentToast("Sudah Voting","danger");
        }
        loading.dismiss();
      })
    });
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
