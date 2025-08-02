import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, PieController, ArcElement, Tooltip, Legend, ChartType, ChartConfiguration } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GraficoService } from '../../../shared/grafico.service';
import { ToastrService } from 'ngx-toastr';
Chart.register(PieController, ArcElement, Tooltip, Legend);

@Component({
  selector: 'app-grafico-atual',
  standalone: false,
  templateUrl: './grafico-atual.component.html',
  styleUrl: './grafico-atual.component.css'
})
export class GraficoAtualComponent implements OnInit {
  loader: boolean = false;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  data: any = {
    dataInicio: '',
    dataFim: ''
  }
  pieChartType: ChartType = 'pie';
  pieChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#01e733ff', '#36A2EB', '#dd1717ff', '#e3c205ff', '#3117ddff', '#60b7d6ff']
    }],
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
  }
  getGraficoMetodoPagemento(value: any) {
    this.limpaGrafico();
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

  filtrar() {
    this.getGraficoMetodoPagemento(this.data);
  }

}
