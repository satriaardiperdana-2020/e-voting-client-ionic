import { Component, OnInit, NgZone } from '@angular/core';

import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService, Calon } from './../remote-service.service';
import { NavController,ToastController,LoadingController,ActionSheetController } from '@ionic/angular';
import { CameraOptions, CameraPopoverOptions, Camera } from '@ionic-native/camera';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  profileCalonForm: FormGroup;
  id: any;
  foto: any;
  endpoint: string;
  jenis_kelamin: any;
  public image: any;

  width : any;
  quality : any;
  constructor(
    private remoteServiceService: RemoteServiceService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    private router: Router,
    public navCtrl: NavController,
    public loadingController: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public toastController: ToastController,
    private zone: NgZone,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchCalon(this.id);
    this.profileCalonForm = this.formBuilder.group({
      nik: [''],
      nama: [''],
      motto: [''],
      alamat: [''],
      jenis_kelamin: [''],
      tempat_lahir: [''],
      tanggal_lahir: [''],
    })
  }

  async fetchCalon(id) {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.remoteServiceService.getCalonIDPemilih(id).subscribe((data) => {
      this.profileCalonForm.setValue({
        nik: data['nik'],
        nama: data['nama'],
        motto: data['motto'],
        alamat: data['alamat'],
        jenis_kelamin: data['jenis_kelamin'],
        tempat_lahir: data['tempat_lahir'],
        tanggal_lahir: data['tanggal_lahir'],
      });
      this.foto = data['foto'];
      this.jenis_kelamin = data["jenis_kelamin"];
      loading.dismiss();
    });
  }

  async ionViewWillEnter() {
    this.endpoint = this.remoteServiceService.endpoint;
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
