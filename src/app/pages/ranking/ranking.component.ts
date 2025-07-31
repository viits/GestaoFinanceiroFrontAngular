import { Component, OnInit } from '@angular/core';
import { RankingService } from '../../shared/ranking.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ranking',
  standalone: false,
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent implements OnInit {
  cards: any = [
  ];
  loader: boolean = false;

  ngOnInit(): void {
    this.getGraficoMetodoPagemento();
  }

  constructor(private rankingService: RankingService, private toast: ToastrService) { }

  getGraficoMetodoPagemento() {
    this.rankingService.GetRankingAtendente({
      onSuccess: (res: any) => {
       this.cards =  res.data.rankingAtendente?.map((x: any) => {
          return {
            nomeAtendente: x.nomeAtendente,
            totalAtendente: x.totalAtendente.toLocaleString(
              'pt-BR',
              { minimumFractionDigits: 2, maximumFractionDigits: 2 }
            ),
            color: x.cor
          }

        })
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
