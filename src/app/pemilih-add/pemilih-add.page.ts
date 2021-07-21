import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { RemoteServiceService } from './../remote-service.service';
import { NavController,ToastController,LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pemilih-add',
  templateUrl: './pemilih-add.page.html',
  styleUrls: ['./pemilih-add.page.scss'],
})
export class PemilihAddPage implements OnInit {

  public datepipe: DatePipe
  addPemilihForm: FormGroup;
  today : string = "";

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private zone: NgZone,
    private remoteServiceService: RemoteServiceService,
    public navCtrl: NavController,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private storage: Storage,
  ) {
    this.addPemilihForm = this.formBuilder.group({
      nik: [''],
      nama: [''],
      password: [''],
    });
  }

  async onSubmit() {
    if (!this.addPemilihForm.valid) {
      console.log(this.addPemilihForm.value);
      this.presentToast("Isi Form","danger");
      return false;
    } else {
        const loading = await this.loadingController.create({
          message: 'Loading'
        });
        await loading.present();
        
        this.remoteServiceService.cekNIK(
          this.addPemilihForm.value.nik
          ).subscribe((response) => {
          this.zone.run(() => {
            let json = JSON.parse(JSON.stringify(response));
            console.log(json.status);
            if(json.status == true){
              this.remoteServiceService.daftarPemilih(
                this.addPemilihForm.value.nik,
                this.addPemilihForm.value.nama,
                this.addPemilihForm.value.password
                ).subscribe((response) => {
                this.zone.run(() => {
                  let json = JSON.parse(JSON.stringify(response));
                  console.log(json.status);
                  if(json.status == true){
                    this.navCtrl.navigateForward('/pemilih/'+Math.random());
                    this.presentToast("Pemilih Add Berhasil","success");
                  }else{
                    this.presentToast("Error","danger");
                  }
                  loading.dismiss();
                })
              });
            }else{
              this.presentToast("NIK Telah Digunakan","danger");
              loading.dismiss();
              return false;
            }
            loading.dismiss();
          })
        });
        
      
    }
  }

  ngOnInit() {
  }

  kembali(){
    this.router.navigate(['/login-pemilih']);
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
