export interface IPagamento {
  idFornecedorAtendente: number,
  idAtendente: number,
  idFornecedor: number,
  idMetodoPagamento: number,
  idStatusPagamento: number,
  valorBruto: number,
  dataVenda?: Date
}
