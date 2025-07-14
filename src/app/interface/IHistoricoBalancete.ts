export interface IHistoricoBalancete {
  idHistoricoBalancete: number,
  idFornecedorAtendente: number,
  idAtendente: number,
  idAtendente2: number,
  idFornecedor: number,
  idMetodoPagamento: number,
  idStatusPagamento: number,
  idUsuario: number,
  nomeAtendente: string,
  nomeAtendente2: string,
  nomeUsuario: string,
  nomeFornecedor: string,
  metodoPagamento: string,
  statusPagamento: string,
  valorBruto: number,
  valorLiquidoAtendente: number,
  valorLiquidoAtendente2: number,
  valorLiquidoFornecedor: number,
  valorLiquidoTime: number,
  dataVenda: Date
  dataCriacao: Date
}
