import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Medicamento {
  id: number;
  nome: string;
  forma: string;
  intervaloHoras: number;
  dataInicio: string;
  dataFim?: string | null;
  Observacao: string;
  status: 'ativo' | 'inativo' | 'finalizado';
  proximaTomada: string;
  lembrarEmail: boolean;
  lembrarSms: boolean;
  statusVisual: 'verde' | 'laranja' | 'vermelho';
  /* Cor e Símbolo Personalizados (propriedades de acessibilidade) */
  corPersonalizada?: string; // Guarda a cor em Hexadecimal (ex: #3b82f6)
  simboloPersonalizado?: string; // Guarda um emoji identificador
}

interface LogHistorico {
  id: number;
  nomeMedicamento: string;
  dataHora: string;
  statusNoMomento:
  | 'Na Hora'
  | 'Com Atraso'
  | 'Tratamento Iniciado'
  | 'Tratamento Pausado'
  | 'Tratamento Retomado'
  | 'Tratamento Finalizado'
  | 'Tratamento Removido';
}

interface Medalha {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  classe: string;
  quantidade: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  // CORRIGIDO: Movido para dentro da classe do componente
  processandoClique: boolean = false;

  // Controle de Abas (Sub-páginas funcionais)
  abaAtiva: 'monitoramento' | 'cadastro' | 'destaques' = 'monitoramento';

  // Controle de Filtros de Medicamento
  filtroStatus: 'todos' | 'ativo' | 'inativo' | 'finalizado' = 'todos';

  relogioDigital: string = '';
  private timerClockAndStatus: any;

  // Campos do Formulário de Cadastro
  novoNome: string = '';
  novaForma: string = '';
  novaObservacao: string = '';
  corEscolhida: string = '#0ea5e9'; // Azul padrão do sistema
  simboloEscolhido: string = '💊'; // Ícone padrão

  // Lista de símbolos amigáveis para o usuário escolher
  opcoesSimbolos = [
    { valor: '💊', label: '💊 Comprimido' },
    { valor: '☀️', label: '☀️ Manhã / Dia' },
    { valor: '🌙', label: '🌙 Noite / Sono' },
    { valor: '❤️', label: '❤️ Coração / Uso Contínuo' },
    { valor: '🧠', label: '🧠 Mente / Controle' },
    { valor: '💧', label: '💧 Gotas / Líquido' },
    { valor: '🥗', label: '🥗 Com Alimentação' },
    { valor: '⭐', label: '⭐ Importante' }
  ];
  novoIntervalo: number | null = null;
  dataPrimeiraTomada: string = '';
  horaPrimeiraTomada: string = '';
  dataFimMedicamento = '';
  checkEmail: boolean = false;
  checkSms: boolean = false;

  // Campos do Modal de Retomada
  novaDataRetomada: string = '';
  novaHoraRetomada: string = '';
  medicamentoRetomando: Medicamento | null = null;
  mostrarModalRetomada: boolean = false;

  opcoesFormas = [

    { valor: 'Comprimido/Cápsula', label: '💊 Comprimido / Cápsula' },
    { valor: 'Líquido/Gotas', label: '💧 Líquido / Gotas' },
    { valor: 'Creme/Pomada/Gel', label: '🧴 Creme / Pomada / Gel' },
    { valor: 'Inalador/Spray', label: '💨 Inalador / Spray' },
    { valor: 'Injeção', label: '💉 Injeção' },
    { valor: 'Pó', label: '🥄 Pó' },
    { valor: 'Sachê', label: '📦 Sachê' },
    { valor: 'Goma', label: '🍬 Goma' },
    { valor: 'Barra', label: '🍫 Barra' },
    { valor: 'Pastilha', label: '🟣 Pastilha' },
    { valor: 'Outro', label: '📋 Outro' }
  ];


  medicamentos: Medicamento[] = [];
  historicoLogs: LogHistorico[] = [];
  medalhas: Medalha[] = [];
  mensagemErro: string = '';

  constructor(private router: Router) { }

  // Getter para retornar os medicamentos filtrados na interface de monitoramento
  get medicamentosFiltrados(): Medicamento[] {
    if (this.filtroStatus === 'todos') {
      return this.medicamentos;
    }
    return this.medicamentos.filter(med => med.status === this.filtroStatus);
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const usuarioLogado = localStorage.getItem('medimind_user');
      if (!usuarioLogado) {
        this.router.navigate(['/login']);
        return;
      }

      this.carregarMedicamentos();
      this.carregarHistoricoEMedalhas();
      this.atualizarRelogioEEstados();

      this.timerClockAndStatus = setInterval(() => {
        this.atualizarRelogioEEstados();
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    if (this.timerClockAndStatus) {
      clearInterval(this.timerClockAndStatus);
    }
  }

  // Método central para registrar eventos no histórico
  private registrarEvento(
    nomeMedicamento: string,
    status: LogHistorico['statusNoMomento']
  ): void {
    this.historicoLogs.unshift({
      id: Date.now(),
      nomeMedicamento,
      dataHora: new Date().toLocaleString('pt-BR'),
      statusNoMomento: status
    });

    this.salvarHistoricoEMedalhas();
  }

  // Atalho do Cabeçalho para abrir o formulário na nova aba dedicada
  atalhoNovoMedicamento(): void {
    this.abaAtiva = 'cadastro';
    setTimeout(() => {
      const inputNome = document.getElementById('nome');
      if (inputNome) inputNome.focus();
    }, 100);
  }

  mudarAba(aba: 'monitoramento' | 'cadastro' | 'destaques'): void {
    this.abaAtiva = aba;
  }

  atualizarRelogioEEstados(): void {
    const agora = new Date();
    this.medicamentos.forEach(med => {
      if (med.status !== 'finalizado' && med.dataFim) {
        const dataFim = new Date(med.dataFim);
        dataFim.setHours(23, 59, 59, 999);

        if (agora >= dataFim) {
          med.status = 'finalizado';
          this.registrarEvento(med.nome, 'Tratamento Finalizado');
        }
      }
    });
    this.relogioDigital = agora.toLocaleTimeString('pt-BR');

    let houveMudanca = false;
    this.medicamentos.forEach(med => {
      const dataProxima = new Date(med.proximaTomada);
      const diferencaMilissegundos = dataProxima.getTime() - agora.getTime();
      const diferencaMinutos = diferencaMilissegundos / (1000 * 60);

      let novoStatus: 'verde' | 'laranja' | 'vermelho' = 'verde';

      if (diferencaMinutos <= 0 && diferencaMinutos >= -2) {
        novoStatus = 'laranja';
      } else if (diferencaMinutos < -2) {
        novoStatus = 'vermelho';
      } else {
        novoStatus = 'verde';
      }

      if (med.statusVisual !== novoStatus) {
        med.statusVisual = novoStatus;
        houveMudanca = true;
      }
    });

    this.medicamentos.sort((a, b) => {
      const dataA = new Date(a.proximaTomada).getTime();
      const dataB = new Date(b.proximaTomada).getTime();
      return dataA - dataB;
    });

    if (houveMudanca) {
      this.salvarNoStorage();
    }
  }

  carregarMedicamentos(): void {
    if (typeof window !== 'undefined') {
      const dadosLocais = localStorage.getItem('medimind_lista_v4');
      this.medicamentos = dadosLocais
        ? JSON.parse(dadosLocais).map((med: any) => ({
          ...med,
          status: med.status || 'ativo',
          dataFim: med.dataFim || null,
          Observacao: med.Observacao !== undefined ? med.Observacao : '' // 👈 ADICIONE ESSA LINHA
        }))
        : [];
    }
  }

  carregarHistoricoEMedalhas(): void {
    if (typeof window !== 'undefined') {
      const logsLocais = localStorage.getItem('medimind_logs');
      this.historicoLogs = logsLocais ? JSON.parse(logsLocais) : [];

      const medalhasLocais = localStorage.getItem('medimind_medalhas');
      if (medalhasLocais) {
        this.medalhas = JSON.parse(medalhasLocais);
      } else {
        this.medalhas = [
          { id: 'primeiro', titulo: 'Primeiro Passo', descricao: 'Tomou o primeiro medicamento no sistema.', icone: '🥇', classe: 'med-ouro', quantidade: 0 },
          { id: 'pontual', titulo: 'Pontualidade', descricao: 'Tomou um medicamento exatamente na hora prevista.', icone: '⏱️', classe: 'med-azul', quantidade: 0 },
          { id: 'constancia', titulo: 'Mestre da Constância', descricao: 'Alcançou 3 tomadas seguidas sem registros de atraso.', icone: '🔥', classe: 'med-roxo', quantidade: 0 }
        ];
        this.salvarHistoricoEMedalhas();
      }
    }
  }

  salvarNoStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('medimind_lista_v4', JSON.stringify(this.medicamentos));
    }
  }

  salvarHistoricoEMedalhas(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('medimind_logs', JSON.stringify(this.historicoLogs));
      localStorage.setItem('medimind_medalhas', JSON.stringify(this.medalhas));
    }
  }

  adicionarMedicamento(event: Event): void {
    event.preventDefault();
    this.mensagemErro = '';

    if (!this.novoNome.trim() || !this.novaForma || !this.novoIntervalo || !this.dataPrimeiraTomada || !this.horaPrimeiraTomada) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios!';
      return;
    }

    const stringDataHora = `${this.dataPrimeiraTomada}T${this.horaPrimeiraTomada}`;
    const dataInicial = new Date(stringDataHora);

    if (isNaN(dataInicial.getTime())) {
      this.mensagemErro = 'Data ou Horário inicial inválido.';
      return;
    }

    const novoRemedio: Medicamento = {
      id: Date.now(),
      nome: this.novoNome,
      forma: this.novaForma,
      dataInicio: dataInicial.toISOString(),
      dataFim: this.dataFimMedicamento || null,
      Observacao: this.novaObservacao.trim() ? this.novaObservacao : (this.novaForma === 'Injeção' ? 'Lembre-se de descartar a seringa de forma segura.' : ''), status: 'ativo',
      intervaloHoras: this.novoIntervalo,
      proximaTomada: dataInicial.toISOString(),
      lembrarEmail: this.checkEmail,
      lembrarSms: this.checkSms,
      statusVisual: 'verde',
      corPersonalizada: this.corEscolhida,
      simboloPersonalizado: this.simboloEscolhido
    };

    this.corEscolhida = '#0ea5e9';
    this.simboloEscolhido = '💊';

    this.medicamentos.push(novoRemedio);
    this.registrarEvento(novoRemedio.nome, 'Tratamento Iniciado');
    this.salvarNoStorage();

    this.abaAtiva = 'monitoramento';
    this.atualizarRelogioEEstados();

    this.novoNome = '';
    this.novaForma = '';
    this.novaObservacao = '';
    this.novoIntervalo = null;
    this.dataPrimeiraTomada = '';
    this.horaPrimeiraTomada = '';
    this.dataFimMedicamento = '';
    this.checkEmail = false;
    this.checkSms = false;
  }

  marcarComoTomado(id: number): void {
    if (this.processandoClique) return;

    const remedio = this.medicamentos.find(m => m.id === id);
    if (!remedio) return;

    this.processandoClique = true;

    const agora = new Date();
    const statusNoMomento = remedio.statusVisual === 'vermelho' ? 'Com Atraso' : 'Na Hora';

    const novoLog: LogHistorico = {
      id: Date.now(),
      nomeMedicamento: remedio.nome,
      dataHora: agora.toLocaleString('pt-BR'),
      statusNoMomento: statusNoMomento
    };
    this.historicoLogs.unshift(novoLog);

    // CORRIGIDO: Chamando a função separada corretamente usando o 'this'
    this.limparHistoricoAntigo();

    this.processarMedalhas(statusNoMomento);

    const dataProximaAntiga = new Date(remedio.proximaTomada);
    const baseCalculo = agora > dataProximaAntiga ? agora : dataProximaAntiga;

    const novaData = new Date(baseCalculo.getTime());
    novaData.setHours(novaData.getHours() + remedio.intervaloHoras);

    remedio.proximaTomada = novaData.toISOString();
    remedio.statusVisual = 'verde';

    this.salvarNoStorage();
    this.salvarHistoricoEMedalhas();
    this.atualizarRelogioEEstados();

    setTimeout(() => {
      this.processandoClique = false;
    }, 300);
  }

  // CORRIGIDO: Declarado como método de classe independente e correto
  limparHistoricoAntigo(): void {
    const LIMITE_MAXIMO_LOGS = 100;
    if (this.historicoLogs.length > LIMITE_MAXIMO_LOGS) {
      this.historicoLogs = this.historicoLogs.slice(0, LIMITE_MAXIMO_LOGS);
    }
  }

  processarMedalhas(statusNoMomento: string): void {
    const mPrimeiro = this.medalhas.find(m => m.id === 'primeiro');
    if (mPrimeiro && this.historicoLogs.length === 1) {
      mPrimeiro.quantidade++;
    }

    if (statusNoMomento === 'Na Hora') {
      const mPontual = this.medalhas.find(m => m.id === 'pontual');
      if (mPontual) mPontual.quantidade++;
    }

    const mConstancia = this.medalhas.find(m => m.id === 'constancia');
    if (mConstancia) {
      const ultimosTresLogs = this.historicoLogs.slice(0, 3);
      if (ultimosTresLogs.length === 3 && ultimosTresLogs.every(log => log.statusNoMomento === 'Na Hora')) {
        const totalNaHora = this.historicoLogs.filter(log => log.statusNoMomento === 'Na Hora').length;
        if (totalNaHora % 3 === 0) {
          mConstancia.quantidade++;
        }
      }
    }
  }

  excluirMedicamento(id: number): void {
    const remedioParaRemover = this.medicamentos.find(m => m.id === id);
    if (remedioParaRemover) {
      this.registrarEvento(remedioParaRemover.nome, 'Tratamento Removido');
    }
    this.medicamentos = this.medicamentos.filter(m => m.id !== id);
    this.salvarNoStorage();
    this.atualizarRelogioEEstados();
  }

  inativarMedicamento(id: number): void {
    const med = this.medicamentos.find(m => m.id === id);
    if (!med) return;

    med.status = 'inativo';
    this.registrarEvento(med.nome, 'Tratamento Pausado');
    this.salvarNoStorage();
  }

  abrirRetomada(med: Medicamento): void {
    this.medicamentoRetomando = med;
    this.novaDataRetomada = '';
    this.novaHoraRetomada = '';
    this.mostrarModalRetomada = true;
  }

  confirmarRetomada(): void {
    if (!this.medicamentoRetomando || !this.novaDataRetomada || !this.novaHoraRetomada) {
      return;
    }

    const dataHora = new Date(`${this.novaDataRetomada}T${this.novaHoraRetomada}`);

    if (isNaN(dataHora.getTime())) {
      alert('Data ou horário inválido.');
      return;
    }

    this.medicamentoRetomando.status = 'ativo';
    this.medicamentoRetomando.proximaTomada = dataHora.toISOString();

    this.registrarEvento(this.medicamentoRetomando.nome, 'Tratamento Retomado');
    this.salvarNoStorage();
    this.atualizarRelogioEEstados();

    this.mostrarModalRetomada = false;
    this.medicamentoRetomando = null;
  }

  formatarDataBr(isoString: string): string {
    const d = new Date(isoString);
    return d.toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
  }

  obterEmojiForma(forma: string): string {
    if (forma.includes('Comprimido')) return '💊';
    if (forma.includes('Líquido')) return '💧';
    if (forma.includes('Creme')) return '🧴';
    if (forma.includes('Inalador')) return '💨';
    if (forma.includes('Injeção')) return '💉';
    return '📝';
  }

  fazerLogout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('medimind_user');
      this.router.navigate(['/login']);
    }
  }
}