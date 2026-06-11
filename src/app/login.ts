import { Component, afterNextRender } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  mensagemErro = '';
  mensagens = [
    {
      titulo: 'Todos os seus medicamentos em um único lugar',
      descricao: 'Cadastre tratamentos, organize horários e mantenha sua rotina sempre sob controle.'
    },
    {
      titulo: 'Nunca perca uma dose importante',
      descricao: 'Receba lembretes inteligentes e acompanhe seu histórico de utilização.'
    },
    {
      titulo: 'Acompanhe sua evolução',
      descricao: 'Visualize sua linha do tempo e entenda seus hábitos ao longo do tratamento.'
    },
    {
      titulo: 'Conquiste medalhas e metas',
      descricao: 'Transforme disciplina em progresso através do sistema de conquistas.'
    },
    {
      titulo: 'Mais segurança para sua saúde',
      descricao: 'Consulte possíveis interações medicamentosas e mantenha informações importantes sempre acessíveis.'
    }
  ];

  indiceMensagem = 0;

  constructor(private router: Router) {
    // O Angular garante que tudo aqui dentro só roda no navegador, ignorando o SSR
    afterNextRender(() => {
      // Opcional: Se já existir um usuário logado no localStorage, manda direto pro dashboard
      if (localStorage.getItem('medimind_user')) {
        this.router.navigate(['/dashboard']);
      }

      setInterval(() => {
        this.indiceMensagem =
          (this.indiceMensagem + 1) % this.mensagens.length;
      }, 5000);
    });
  }

  executarLogin(event: Event): void {
    event.preventDefault();

    if (this.email.trim() && this.password.trim()) {
      const usuarioSimulado = {
        email: this.email,
        nome: this.email.split('@')[0],
        logadoEm: new Date().toISOString()
      };

      // Como essa função é disparada por um clique de botão (evento do usuário), 
      // ela SEMPRE roda no navegador, então aqui o localStorage está seguro!
      localStorage.setItem('medimind_user', JSON.stringify(usuarioSimulado));

      this.mensagemErro = '';
      this.router.navigate(['/dashboard']);

    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos corretamente.';
    }
  }
}