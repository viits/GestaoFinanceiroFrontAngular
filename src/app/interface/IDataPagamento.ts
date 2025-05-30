import { IPagamento } from "./IPagamento";
import { ISelect } from "./ISelect";

export interface IDataPagamento {
  atendenteSelect: ISelect[],
  fornecedorSelect: ISelect[],
  metodoPagamento: ISelect[],
  statusPagamento: ISelect[],
  pagamento: IPagamento
}
