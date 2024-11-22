import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { Project } from "../items/items";

@Component({
  selector: 'app-modal-view',
  imports: [ScrollPanelModule],
  standalone: true,
  template: `
  <section class="w-full flex flex-column gap-2 h-full">
  <p-scrollPanel [style]="{ width: '100%', height: 'auto', 'max-height':'5rem' }">
   <p class="text-sm lg:text-base m-0 font-semibold"><strong>Descrição:</strong> {{obj.description}}</p>
  </p-scrollPanel>
  <section class="flex w-full flex-column gap-1 lg:flex-row justify-content-between">
    <section class="flex flex-column gap-1">
      <p class="m-0 font-bold">Previa do site:</p>
      <span class="m-0 font-semibold text-sm lg:text-base">
        <strong>Observação:</strong> Para uma melhor experiência ou caso encontre algum erro, clique no botão <strong>"Abrir Site"</strong> para acessar o projeto diretamente.
      </span>
    </section>
    <button class="success doc_ theme" (click)="open()">Abrir Site <i class="bi bi-box-arrow-up-right"></i></button>
  </section>
  <section class="w-full h-full overflow-hidden shadow-2 border-round">
    @if(safeUrl){
      <iframe [src]="safeUrl" width="100%" height="100%" frameborder="0"></iframe>
    }
  </section>
  </section>
  `
})
export class ModalViewComponent implements OnInit {
  safeUrl: SafeResourceUrl | null = null;
  fileExterno: boolean = false;
  link: string | null = null;
  obj!: Project;
  constructor(
    private sanitizer: DomSanitizer,
    private config: DynamicDialogConfig
  ) { }

  ngOnInit(): void {
    const data = this.config.data as Project;
    if (data) {
      this.obj = data;
      if (data.link_aplication) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(data.link_aplication);
      }
    }
    console.log(data)
  }

  open() {
    const link = this.obj?.link_aplication;
    if (link) {
      window.open(link, '_blank');
    }
  }
}