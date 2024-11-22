import { NgIf } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PasswordModule } from "primeng/password";
import { Project } from "../items/items";
import { ItemsService } from "../items/items.service";

@Component({
  selector: 'app-modal-gen',
  imports: [
    DialogModule,
    ButtonModule,
    NgIf,
    InputTextareaModule,
    ReactiveFormsModule,
    PasswordModule,
    InputTextModule
  ],
  standalone: true,
  template: `
    <section class="w-full flex flex-column gap-2 h-full">
      <form [formGroup]="form">
        <section class="flex flex-column gap-2">
          <div class="flex flex-column gap-2">
            <label for="title">Título</label>
            <input pInputText id="title" formControlName="title" />
            <small *ngIf="form.get('title')?.hasError('required') && form.get('title')?.touched">
              Título é obrigatório.
            </small>
          </div>

          <div class="flex flex-column gap-2">
            <label for="description">Descrição</label>
            <textarea 
              rows="5" 
              cols="30" 
              id="description" 
              pInputTextarea 
              formControlName="description">
            </textarea>
            <small *ngIf="form.get('description')?.hasError('required') && form.get('description')?.touched">
              Descrição é obrigatória.
            </small>
          </div>

          <div class="flex flex-column gap-2">
            <label for="link_aplication">Link da Aplicação</label>
            <input pInputText id="link_aplication" formControlName="link_aplication" />
            <small *ngIf="form.get('link_aplication')?.hasError('required') && form.get('link_aplication')?.touched">
              Link da aplicação é obrigatório.
            </small>
          </div>

          <div class="flex flex-column gap-2">
            <label for="photo">Foto de Capa (Link)</label>
            <input pInputText id="photo" formControlName="photo" />
            <small *ngIf="form.get('photo')?.hasError('required') && form.get('photo')?.touched">
              Foto de capa é obrigatória.
            </small>
          </div>
        </section>
      </form>

      <div class="flex justify-content-between pt-4 gap-2">
        <p-button label="Cancelar" severity="secondary"></p-button>
        <p-button label="Salvar" (onClick)="save()"></p-button>
      </div>
    </section>
  `
})
export class ModalGenComponent implements OnInit {
  obj!: Project;

  form: FormGroup = new FormGroup({
    _id: new FormControl<string | null>(null),
    title: new FormControl<string | null>(null, Validators.required),
    description: new FormControl<string | null>(null, Validators.required),
    link_aplication: new FormControl<string | null>(null, Validators.required),
    photo: new FormControl<string | null>(null, Validators.required),
  });

  constructor(
    private service: ItemsService,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    const data = this.config.data as Project;
    if (data) {
      this.form.patchValue(data);
    }
  }

  save(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Dados do formulário:', formData);
      if (formData._id) {
        this.service.updateItem(formData?._id, formData)
          .subscribe({
            next: () => console.log('Projeto salvo com sucesso!'),
            error: (err) => console.error('Erro ao salvar projeto:', err)
          });
      } else {
        this.service.createItem(formData)
          .subscribe({
            next: () => console.log('Projeto salvo com sucesso!'),
            error: (err) => console.error('Erro ao salvar projeto:', err)
          });
      }
    } else {
      this.form.markAllAsTouched();
    }
  }
}
