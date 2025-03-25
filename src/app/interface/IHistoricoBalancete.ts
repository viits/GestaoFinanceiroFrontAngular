export interface IHistoricoBalancete {
  idHistoricoBalancete: number,
  idFornecedorAtendente: number,
  idAtendente: number,
  idFornecedor: number,
  idMetodoPagamento: number,
  idStatusPagamento: number,
  idUsuario: number,
  nomeAtendente: string,
  nomeUsuario: string,
  nomeFornecedor: string,
  metodoPagamento: string,
  statusPagamento: string,
  valorBruto: number,
  valorLiquidoAtendente: number,
  valorLiquidoFornecedor: number,
  valorLiquidoTime: number,
  dataVenda: Date
  dataCriacao: Date
}
