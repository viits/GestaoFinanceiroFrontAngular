import { Component, OnInit, ViewChild } from '@angular/core';
import { BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraficoService } from '../../../shared/grafico.service';
import { ToastrService } from 'ngx-toastr';
Chart.register(CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Tooltip,
  Legend,
  Title);

@Component({
  selector: 'app-grafico-mensal-dia',
  standalone: false,
  templateUrl: './grafico-mensal-dia.component.html',
  styleUrl: './grafico-mensal-dia.component.css'
})
export class GraficoMensalDiaComponent implements OnInit {
  loader: boolean = false;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Total valor bruto dia',
        backgroundColor: '#36A2EB',
        borderRadius: 5
      }
    ]
  };
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Total valor bruto' }
    }
  };

  ngOnInit(): void {
    this.getGraficoMensalDia()
  }

  constructor(private graficoService: GraficoService, private toast: ToastrService) { }

  getGraficoMensalDia() {
    this.limparGrafico();
    this.graficoService.GetGraficoMensalDia({
      onSuccess: (res: any) => {
        res.data.listGrafico?.map((x: any) => {
          this.barChartData.labels?.push(`${x.dia}/${x.mes}`)
          this.barChartData.datasets[0].data.push(x.totalValorBruto);
        })
        this.chart?.update();
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

  limparGrafico() {
    this.barChartData.labels = []
    this.barChartData.datasets[0].data = []
  }
}
