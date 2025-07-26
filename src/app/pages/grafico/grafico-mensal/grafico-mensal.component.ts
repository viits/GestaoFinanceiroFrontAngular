import { Component, OnInit, ViewChild } from '@angular/core';
import { GraficoService } from '../../../shared/grafico.service';
import { ToastrService } from 'ngx-toastr';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
Chart.register(CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Title);

@Component({
  selector: 'app-grafico-mensal',
  standalone: false,
  templateUrl: './grafico-mensal.component.html',
  styleUrl: './grafico-mensal.component.css'
})
export class GraficoMensalComponent implements OnInit {
  loader: boolean = false;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  data: any = {
    dataInicio: '',
    dataFim: ''
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total valor bruto dos meses',
        backgroundColor: '#36A2EB',
        borderRadius: 5
      }
    ]
  };

  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: true },
      title: { display: true, text: 'Total valor bruto' }
    }
  };

  ngOnInit(): void {
  }

  constructor(private graficoService: GraficoService, private toast: ToastrService) { }

  getGraficoMensal(value: any) {
    this.limparGrafico();
    this.graficoService.GetGraficoMensalValores(value, {
      onSuccess: (res: any) => {
        console.log(res)
       res.data.listGrafico?.map((x: any)=>{
        this.barChartData.labels?.push(`${x.mes}/${x.ano}`)
        this.barChartData.datasets[0].data.push(x.totalValorBruto);
       })
        this.chart?.update();
        console.log(this.barChartData)
      },
      onErrorror: (error: any) => {
        this.loader = false;
        if (error.status != 400) {
          this.toast.error('Ocorreu um erro, tente novamente mais tarde!');
        } else {
          error.error.errors?.map((x: any) => {
            this.toast.error(x);
          });
        }
      }
    });
  }

  filtrar() {
    this.getGraficoMensal(this.data);
  }
  limparGrafico(){
    this.barChartData.labels = []
    this.barChartData.datasets[0].data = []
  }

}
