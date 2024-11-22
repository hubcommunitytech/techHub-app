import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TimelineModule } from 'primeng/timeline';
interface EventItem {
  name?: string;
  date?: string;
  about?: string;
}
interface InfosItem {
  titulo?: string;
  texto?: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TimelineModule, CardModule, ScrollPanelModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  events: EventItem[] = this.getEvents();
  infos: InfosItem[] = this.getInfos();

  getInfos() {
    return [
      { titulo: 'Sobre Nós: Tech Hub', texto: 'Bem-vindo ao Tech Hub, o ponto de encontro ideal para todos que vivem, respiram e transformam a Ciência da Computação. Somos mais que uma plataforma; somos uma comunidade que inspira, conecta e potencializa o conhecimento, reunindo mentes brilhantes em um só lugar.' },
      { titulo: 'Nossa Missão', texto: 'Fomentar a colaboração, o aprendizado contínuo e a inovação na área de Ciência da Computação, criando um ambiente onde acadêmicos, profissionais e entusiastas possam explorar, compartilhar e aplicar conhecimentos que impactem o mundo.' },
    ]
  }
  getEvents(): EventItem[] {
    return [
      {
        name: 'O Que é o Tech Hub?',
        about: `
          <p>
            O Tech Hub é uma plataforma centralizada projetada para unir estudantes, professores, pesquisadores e profissionais do setor de tecnologia. Nosso objetivo é ser o ponto de encontro digital definitivo para quem deseja:
          </p>
          <ul>
            <li><b>Colaborar:</b> Trabalhar em projetos conjuntos, compartilhar ideias e co-criar soluções.</li>
            <li><b>Aprender:</b> Acessar recursos educacionais, participar de webinars e workshops e trocar experiências.</li>
            <li><b>Conectar:</b> Estabelecer contatos com outros profissionais, acadêmicos e instituições de renome.</li>
            <li><b>Divulgar:</b> Publicar artigos, pesquisas e estudos de caso para alcançar um público global.</li>
          </ul>
          <img class="h-15rem" src="assets/image.png" />
        `
      },
      {
        name: 'Nossa Proposta de Valor',
        about: `
          <p>
            No Tech Hub, acreditamos que o conhecimento cresce ao ser compartilhado. Por isso, criamos um ambiente colaborativo e inclusivo onde você pode:
          </p>
          <p><b>Acessar Recursos Exclusivos:</b> Biblioteca digital, cursos especializados e materiais de estudo de alta qualidade.</p>
          <p><b>Fazer Networking:</b> Conectar-se a profissionais e acadêmicos de todo o mundo.</p>
          <p><b>Inovar em Projetos:</b> Trabalhar em projetos práticos, desde programação até inteligência artificial, com suporte de mentores experientes.</p>
        `
      },
      {
        name: 'Quem Somos?',
        about: `
          <p>
            Somos um time apaixonado por tecnologia, formado por educadores, pesquisadores e desenvolvedores que entendem os desafios e oportunidades do mundo da computação. Trabalhamos para construir uma comunidade global unida pelo propósito de transformar a tecnologia em um agente de mudança positiva.
          </p>
          <h3>Por que Escolher o Tech Hub?</h3>
          <ul>
            <li><b>Ambiente Colaborativo:</b> Fóruns de discussão, desafios de programação e eventos virtuais.</li>
            <li><b>Recursos Atualizados:</b> Sempre alinhados às tendências mais recentes do setor.</li>
            <li><b>Integração Acadêmica e Profissional:</b> Um espaço para construir uma carreira sólida e contribuir para a ciência.</li>
          </ul>
        `
      }
    ];

  }
}
