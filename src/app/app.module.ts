import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { MenuComponent } from './components/menu/menu.component';
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { MatTableModule } from '@angular/material/table';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';
import { CheckComponent } from './components/check/check.component';
import { LoaderComponent } from './components/loader/loader.component';
import { GerenteComponent } from './pages/cadastros/gerente/gerente.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ModalGerenteComponent } from './components/modal-gerente/modal-gerente.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FornecedorComponent } from './pages/cadastros/fornecedor/fornecedor.component';
import { ModalFornecedorComponent } from './components/modal-fornecedor/modal-fornecedor.component';
import { AtendenteComponent } from './pages/cadastros/atendente/atendente.component';
import { ModalAtendenteComponent } from './components/modal-atendente/modal-atendente.component';
import { MatSelectModule } from '@angular/material/select';
import { PagamentoAtualComponent } from './pages/pagamento-atual/pagamento-atual.component';
import { ModalPagamentoAtualComponent } from './components/modal-pagamento-atual/modal-pagamento-atual.component';
import { RelatorioPagamentoComponent } from './pages/relatorios/relatorio-pagamento/relatorio-pagamento.component';
import { ModalRelatorioPagamentoComponent } from './components/modal-relatorio-pagamento/modal-relatorio-pagamento.component';
import { MatAccordion } from '@angular/material/expansion';
import { MatExpansionModule } from '@angular/material/expansion';
import { ModalUsuarioComponent } from './components/modal-usuario/modal-usuario.component';
import { NgxMaskConfig, NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { GerarBalanceteComponent } from './pages/gerar-balancete/gerar-balancete.component';
import { PdfBalanceteComponent } from './components/pdf-balancete/pdf-balancete.component';
import { ModalHistoricoAtendenteComponent } from './components/modal-historico-atendente/modal-historico-atendente.component';
import { ModalHistoricoFornecedorComponent } from './components/modal-historico-fornecedor/modal-historico-fornecedor.component';
import { ModalHistoricoBalanceteComponent } from './components/modal-historico-balancete/modal-historico-balancete.component';
import { ModalConfirmacaoComponent } from './components/modal-confirmacao/modal-confirmacao.component';
import { ModalEsqueceuSenhaComponent } from './components/modal-esqueceu-senha/modal-esqueceu-senha.component'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
const maskConfig: Partial<NgxMaskConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    MenuComponent,
    UsuarioComponent,
    RedefinirSenhaComponent,
    CheckComponent,
    LoaderComponent,
    GerenteComponent,
    ModalGerenteComponent,
    FornecedorComponent,
    ModalFornecedorComponent,
    AtendenteComponent,
    ModalAtendenteComponent,
    PagamentoAtualComponent,
    ModalPagamentoAtualComponent,
    RelatorioPagamentoComponent,
    ModalRelatorioPagamentoComponent,
    ModalUsuarioComponent,
    GerarBalanceteComponent,
    PdfBalanceteComponent,
    ModalHistoricoAtendenteComponent,
    ModalHistoricoFornecedorComponent,
    ModalHistoricoBalanceteComponent,
    ModalConfirmacaoComponent,
    ModalEsqueceuSenhaComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 3,
      autoDismiss: true,
      preventDuplicates: true,
      progressBar: true
    }),
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatAccordion,
    MatExpansionModule,
    NgxMaskDirective, NgxMaskPipe
  ],
  exports: [
    HomeComponent,
    LayoutComponent,
    MenuComponent,
    CheckComponent,
    LoaderComponent,
    ModalGerenteComponent,
    ModalFornecedorComponent,
    ModalAtendenteComponent,
    PdfBalanceteComponent
  ],
  providers: [provideEnvironmentNgxMask(maskConfig)],
  bootstrap: [AppComponent]
})
export class AppModule { }
