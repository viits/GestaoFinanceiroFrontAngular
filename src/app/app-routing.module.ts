import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { GerenteComponent } from './pages/cadastros/gerente/gerente.component';
import { FornecedorComponent } from './pages/cadastros/fornecedor/fornecedor.component';
import { AtendenteComponent } from './pages/cadastros/atendente/atendente.component';
import { PagamentoAtualComponent } from './pages/pagamento-atual/pagamento-atual.component';
import { RelatorioPagamentoComponent } from './pages/relatorios/relatorio-pagamento/relatorio-pagamento.component';
import { GerarBalanceteComponent } from './pages/gerar-balancete/gerar-balancete.component';
import { GraficoAtualComponent } from './pages/grafico/grafico-atual/grafico-atual.component';
import { GraficoMensalComponent } from './pages/grafico/grafico-mensal/grafico-mensal.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: PagamentoAtualComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'nova-senha', component: RedefinirSenhaComponent },
  { path: 'cadastro/gerente', component: GerenteComponent },
  { path: 'cadastro/fornecedor', component: FornecedorComponent },
  { path: 'cadastro/atendente', component: AtendenteComponent },
  { path: 'relatorio/pagamento', component: RelatorioPagamentoComponent },
  { path: 'relatorio/balancete', component: GerarBalanceteComponent },
  { path: 'grafico', component: GraficoAtualComponent },
  { path: 'grafico-mensal', component: GraficoMensalComponent },
  { path: 'ranking', component: RankingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
