export interface IPagamentoTable {
  idFornecedorAtendente: number,
  idAtendente: number,
  idFornecedor: number,
  idMetodoPagamento: number,
  idStatusPagamento: number,
  nomeAtendente: string,
  nomeFornecedor: string,
  metodoPagamento: string,
  statusPagamento: string,
  valorBruto: number,
  valorLiquidoAtendente: number,
  valorLiquidoFornecedor: number,
  valorLiquidoTime: number,
  dataVenda: string
}
