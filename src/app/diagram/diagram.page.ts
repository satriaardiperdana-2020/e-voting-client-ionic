import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { RemoteServiceService, Calon } from './../remote-service.service';
import { NavController,ToastController,LoadingController,Platform } from '@ionic/angular'
import { Chart, BarController,CategoryScale, LineController,BarElement, LineElement, ArcElement, PointElement,DoughnutController, LinearScale, Title,PieController } from 'chart.js';

Chart.register(BarController,LineController,CategoryScale,BarElement,DoughnutController,PieController, LineElement, ArcElement,PointElement, LinearScale, Title);
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.page.html',
  styleUrls: ['./diagram.page.scss'],
})
export class DiagramPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  @ViewChild("doughnutCanvas") doughnutCanvas: ElementRef;

  laporans: any = [];
  label:any = [];
  data:any = [];
  colorArray:any = [];
  private barChart: Chart;
  private doughnutChart: Chart;
  constructor(
    public loadingController: LoadingController,
    private remoteServiceService: RemoteServiceService,
  ) { }

  ngOnInit(){

  }

  async ionViewDidEnter() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present(); 
    this.remoteServiceService.getLaporan().subscribe((response) => {
      this.laporans = response;
      console.log(response);
      
      for (let index = 0; index < this.laporans.length; index++) {
        this.label.push(this.laporans[index].nama)
        this.data.push(this.laporans[index].voting)
        this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        // console.log(colorArray[index])
      }
      this.createBarChart();
      this.createDonutChart();
      loading.dismiss();
    })
  }

  createDonutChart(){
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "pie",
      data: {
        labels: this.label,
        datasets: [
          {
            label: "Jumlah Suara",
            data: this.data,
            backgroundColor: this.colorArray,
            borderWidth: 1,
            hoverBackgroundColor: this.colorArray,
            hoverOffset: 4
          },
        ]
      },
      options : {
        plugins : {
          legend: {
            display: true,
            fullSize:true,
            position:"top",
            align:"center",
          },
          title: {
            display: true,
          },
        }
      }
    });
  }

  createBarChart() {
    
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.label,
        datasets: [{
          label: 'Jumlah Suara',
          data: this.data,
          backgroundColor: this.colorArray,
          borderColor: 'rgb(38, 194, 129)',
          borderWidth: 1
        }]
      },
    });
  }
}
