import { Component, OnInit, ViewChild } from '@angular/core';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, ChartConfiguration, ChartOptions, ChartType, Legend, LinearScale, PieController, Tooltip } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraficoService } from '../../shared/grafico.service';
import { ToastrService } from 'ngx-toastr';
import { IFiltroData } from '../../interface/IFiltroData';
Chart.register(PieController,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement);

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  loader: boolean = false;

  data: IFiltroData = {
    dataInicio: '',
    dataFim: ''
  }

  pieChartType: ChartType = 'pie';

  pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#01e733ff', '#36A2EB', '#dd1717ff', '#e3c205ff', '#3117ddff', '#60b7d6ff']
      }
    ],
  };

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
      title: { display: false, text: 'Total valor bruto' }
    }
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    }
  };

  ngOnInit(): void {
    this.getGraficoMetodoPagemento(this.data)
    this.getGraficoMensalDia();
  }

  constructor(private graficoService: GraficoService, private toast: ToastrService) { }

  limpaGrafico() {
    this.pieChartData = {
      labels: [],
      datasets: [{
        data: [],
        backgroundColor: ['#01e733ff', '#36A2EB', '#dd1717ff', '#05e369ff', '#3117ddff', '#60b7d6ff']
      }],
    };
    this.barChartData = {
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
  }
  filter() {
    this.limpaGrafico();
    if (this.data.dataInicio != '' && this.data.dataFim != '') {
      this.getGraficoMetodoPagemento(this.data);
      this.getGraficoMensal(this.data)
    } else {
      this.getGraficoMensalDia();
    }
  }
  getGraficoMetodoPagemento(value: any) {
    // this.limpaGrafico();
    this.graficoService.GetGraficoMetodoPagamentoAtual(value, {
      onSuccess: (res: any) => {
        res.data.graficoResponse?.map((x: any) => {
          this.pieChartData.labels?.push(x.metodoPagamento);
          this.pieChartData.datasets[0].data.push(x.total);
        });
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

  getGraficoMensalDia() {
    // this.limpaGrafico();
    this.loader = true;
    this.graficoService.GetGraficoMensalDia({
      onSuccess: (res: any) => {
        res.data.listGrafico?.map((x: any) => {
          this.barChartData.labels?.push(`${x.dia}/${x.mes}`)
          this.barChartData.datasets[0].data.push(x.totalValorBruto);
        })
        this.chart?.update();
        this.loader = false;
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

  getGraficoMensal(value: any) {
    this.graficoService.GetGraficoMensalValores(value, {
      onSuccess: (res: any) => {
        res.data.listGrafico?.map((x: any) => {
          this.barChartData.labels?.push(`${x.mes}/${x.ano}`)
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

}
