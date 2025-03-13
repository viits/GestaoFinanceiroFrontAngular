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
import { CadastroUsuarioComponent } from './pages/cadastros/cadastro-usuario/cadastro-usuario.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LayoutComponent,
    MenuComponent,
    UsuarioComponent,
    CadastroUsuarioComponent,
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
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSelectModule
  ],
  exports: [
    HomeComponent,
    LayoutComponent,
    MenuComponent,
    CheckComponent,
    LoaderComponent,
    ModalGerenteComponent,
    ModalFornecedorComponent,
    ModalAtendenteComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
