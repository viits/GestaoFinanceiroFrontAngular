import { IPagamento } from "./IPagamento";
import { ISelect } from "./ISelect";
import { IUsuario } from "./IUsuario";

export interface IDataUsuario {
  perfilUsuario: ISelect[],
  usuario: IUsuario
}
