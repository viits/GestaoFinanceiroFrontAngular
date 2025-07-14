export interface IPagamentoTable {
  idFornecedorAtendente: number,
  idAtendente: number,
  idAtendente2: number,
  idFornecedor: number,
  idMetodoPagamento: number,
  idStatusPagamento: number,
  nomeAtendente: string,
  nomeAtendente2: string,
  nomeFornecedor: string,
  metodoPagamento: string,
  statusPagamento: string,
  valorBruto: number,
  valorLiquidoAtendente: number,
  valorLiquidoAtendente2: number,
  valorLiquidoFornecedor: number,
  valorLiquidoTime: number,
  dataVenda: string
}
