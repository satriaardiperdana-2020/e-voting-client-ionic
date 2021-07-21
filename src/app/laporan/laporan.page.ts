import { Component, OnInit, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewEncapsulation } from '@angular/core';
import { RemoteServiceService, Calon } from './../remote-service.service';
import { Router } from '@angular/router';
import { NavController,ToastController,LoadingController,Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.page.html',
  styleUrls: ['./laporan.page.scss'],
})
export class LaporanPage implements OnInit {

  laporans: any = [];
  endpoint: string;
  pdfObj = null;
  today : string = "";
  constructor(
    private remoteServiceService: RemoteServiceService,
    private router: Router,
    private storage: Storage,
    private zone: NgZone,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private platform: Platform,
    private file: File,
    private fileOpener: FileOpener,
  ) {
  }
  ngOnInit() {
  }
  diagram() {
    this.router.navigate(['/diagram']);
  }
  async ionViewWillEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.endpoint = this.remoteServiceService.endpoint;
    this.remoteServiceService.getLaporan().subscribe((response) => {
      this.laporans = response;
      console.log(response);
      loading.dismiss();
    })
  }

  async export(){
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    
    var date : any = new Date().toISOString(); 

    var year : any= date.split("-")[0];
    var month : any = date.split("-")[1];
    var day : any= ( date.split("-")[2] ).split("T")[0];

    this.today = year+"-"+month+"-"+day;
    this.remoteServiceService.getLaporan().subscribe((response) => {
      this.laporans = response;
      console.log(response);
    
      console.log(this.laporans);

      var docDefinition = {
        content: [
          { text: 'Laporan Voting', style: 'header',alignment: 'center' },
          { text: this.today, alignment: 'center' },
          {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: [ 'auto', 'auto', 'auto', 'auto' , 'auto' , 'auto' , 'auto' ],
      
              body: [
                [ 'NO', 'NIK', 'Nama', 'Jenis Kelamin', 'Tempat/Tanggal Lahir', 'Foto', 'Jumlah Suara' ],
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 15, 0, 0]
          },
          nonheader: {
            fontSize: 12,
            bold: false,
            margin: [0, 15, 0, 0]
          },
          story: {
            italic: true,
            alignment: 'center',
            width: '50%',
          }
        }
      }
      for (let index = 0; index < this.laporans.length; index++) {
        console.log(this.laporans[index].base64)
        docDefinition['content'][2].table.body.push(
          
          [ (index + 1).toString(), this.laporans[index].nik, this.laporans[index].nama, this.laporans[index].jenis_kelamin, this.laporans[index].tempat_lahir + '/' + this.laporans[index].tanggal_lahir, 
          {image: this.laporans[index].base64, fit:[50,50]}
          , this.laporans[index].voting ],
        );
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
      if (this.platform.is('cordova')) {
        this.pdfObj.getBuffer((buffer) => {
          var blob = new Blob([buffer], { type: 'application/pdf' });
          this.file.writeFile(this.file.dataDirectory, 'laporan.pdf', blob, { replace: true }).then(fileEntry => {
            this.fileOpener.open(this.file.dataDirectory + 'laporan.pdf', 'application/pdf');
            loading.dismiss();
          })
        });
      } else {
        this.pdfObj.download();
        loading.dismiss();
      }
    })
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
  
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
  
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
  
        var dataURL = canvas.toDataURL("image/png");
  
        resolve(dataURL);
      };
  
      img.onerror = error => {
        reject(error);
      };
  
      img.src = url;
    });
  }
}
