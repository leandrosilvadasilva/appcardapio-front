import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { InsumosService } from '../../services/insumos.service';
import { Insumo } from '../../model/insumo';

@Component({
  selector: 'app-insumo-form',
  templateUrl: './insumo-form.component.html',
  styleUrl: './insumo-form.component.scss'
})
export class InsumoFormComponent implements OnInit{

  form = this.formBuilder.group(
    {
      id: [''],
      nome_insumo: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      marca_insumo: ['',[Validators.required]]
    });

  constructor(private formBuilder: NonNullableFormBuilder,
    private service: InsumosService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ){
    //this.form = this.formBuilder.group({
      //nome_insumo: [''],
      //marca_insumo: ['']
    //});
  }
  ngOnInit(): void {

    const insumo: Insumo = this.route.snapshot.data['insumo'];
    console.log(insumo);

      this.form.setValue({
        id: insumo.id,
        nome_insumo: insumo.nome_insumo,
        marca_insumo: insumo.marca_insumo,
      });

  }


  onSubmit(){
    this.service.save(this.form.value)
    .subscribe(result => this.onSuccess(),
      error => this.onError()
    //.subscribe(result => console.log(result),
      //error => this.onError()

    //  console.log(error)
  );
  //console.log(this.form.value);
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


  getErrorMessage(fieldName: string){
     const  field = this.form.get(fieldName);

     if(field?.hasError('required')){
      return 'Campo obrigatório.'
    }
    if(field?.hasError('minlength')){
      const requiredLength: number = field.errors ? field.errors['minlength']['requiredLength'] : 2;
      return `Tamanho mínimo precisa ser de ${requiredLength} caracteres.`;
    }
    if(field?.hasError('maxlength')){
      const requiredLength: number = field.errors ? field.errors['maxlength']['requiredLength'] : 200;
      return `Tamanho máximo excedido de ${requiredLength} caracteres.`;
    }
    return 'Campo inválido.';
  }

}

