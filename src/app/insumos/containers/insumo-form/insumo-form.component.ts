import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Insumo } from '../../model/Insumo';
import { Produto } from '../../model/produto';
import { InsumosService } from '../../services/insumos.service';
import { FormUtilsService } from '../../../shared/form/form-utils.service';

@Component({
  selector: 'app-insumo-form',
  templateUrl: './insumo-form.component.html',
  styleUrl: './insumo-form.component.scss'
})
export class InsumoFormComponent implements OnInit{

  form!: FormGroup;

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: InsumosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    public formUtils: FormUtilsService
  ){

  }

  ngOnInit(): void {
    const insumo: Insumo = this.route.snapshot.data['insumo'];

    this.form = this.formBuilder.group(
    {
      id: [insumo.id],
      nome_insumo: [insumo.nome_insumo,[Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)]],
      marca_insumo: [insumo.marca_insumo,[Validators.required]],
      produtos: this.formBuilder.array(this.retrieveProdutos(insumo), Validators.required)
    });

  }

  private retrieveProdutos(insumo: Insumo){
      const produtos = [];
      if(insumo?.produtos){
        insumo.produtos.forEach(produto => produtos.push(this.createProduto(produto)))
      }else{
        produtos.push(this.createProduto());
      }
      return produtos;
  }

  private createProduto(produto: Produto={id:'', nomeProduto:'', marcaProduto:''}){

      //Criar um grupo de campos
      return this.formBuilder.group({
          id: [produto.id],
          nomeProduto: [produto.nomeProduto, [Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)]],
          marcaProduto: [produto.marcaProduto,[Validators.required,
            Validators.minLength(2),
            Validators.maxLength(100)]]
        });

  }

  getProdutosFormArray(){
    return (<UntypedFormArray>this.form.get('produtos')).controls;
  }

  addNewProduct(){
    const produtos = this.form.get('produtos') as UntypedFormArray;
    produtos.push(this.createProduto());
  }
  removeProduct(index: number){
    const produtos = this.form.get('produtos') as UntypedFormArray;
    produtos.removeAt(index);
  }


  onSubmit(){
    if(this.form.valid){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(),
      error => this.onError());
    } else {
      this.formUtils.validateAllFormFields(this.form);
    }


}

onCancel(){
  this.location.back();
}

private onError(){
    this.snackBar.open('Erro ao salvar produto', '', {duration: 3000});

  }
  private onSuccess(){
    this.snackBar.open('Produto Salvo com sucesso', '', {duration: 3000});
    this.onCancel();
  }





}

