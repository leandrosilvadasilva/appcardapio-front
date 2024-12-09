export interface Insumo {

  id        : string;
  nome_insumo       : string;
	marca_insumo      : string;
  //Inserido após:
  //preco_insumo      : number;
  //quantidade_insumo : number;

  //tipo_unidade int not null REFERENCES unidade (id_unidade)
}

