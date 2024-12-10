import { Produto } from "./produto";

export interface Insumo {

  id        : string;
  nome_insumo       : string;
	marca_insumo      : string;
  produtos?: Produto[];

}

