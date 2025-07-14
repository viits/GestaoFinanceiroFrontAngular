export interface IPagamento {
  idFornecedorAtendente: number,
  idAtendente: number,
  idAtendente2: number,
  idFornecedor: number,
  idMetodoPagamento: number,
  idStatusPagamento: number,
  valorBruto: any,
  dataVenda?: Date,
  nomeAtendente?: string
  nomeAtendente2?: string
}
