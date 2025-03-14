import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { CadastroUsuarioComponent } from './pages/cadastros/cadastro-usuario/cadastro-usuario.component';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { GerenteComponent } from './pages/cadastros/gerente/gerente.component';
import { FornecedorComponent } from './pages/cadastros/fornecedor/fornecedor.component';
import { AtendenteComponent } from './pages/cadastros/atendente/atendente.component';
import { PagamentoAtualComponent } from './pages/pagamento-atual/pagamento-atual.component';
import { RelatorioPagamentoComponent } from './pages/relatorios/relatorio-pagamento/relatorio-pagamento.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'home', component: HomeComponent },
  { path: 'home', component: PagamentoAtualComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'nova-senha', component: RedefinirSenhaComponent },
  { path: 'cadastro/usuario', component: CadastroUsuarioComponent },
  { path: 'cadastro/gerente', component: GerenteComponent },
  { path: 'cadastro/fornecedor', component: FornecedorComponent },
  { path: 'cadastro/atendente', component: AtendenteComponent },
  { path: 'relatorio/pagamento', component: RelatorioPagamentoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
