const GerenciadorDeTarefas = require("../src/Trabalho01Turma01");

describe('GerenciadorDeTarefas', () => {
    let gerenciador;

    beforeEach(() => {
        gerenciador = new GerenciadorDeTarefas();
    });

    test('deve adicionar uma nova tarefa', () => {
        const tarefa = { id: 1, descricao: 'Comprar leite', prioridade: 1, data: '2024-09-01' };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefas()).toHaveLength(1);
    });

    test('deve lançar um erro ao adicionar uma tarefa com descrição inválida', () => {
        const tarefa = { id: 2, descricao: 'abc', prioridade: 1, data: '2024-09-01' };
        expect(() => gerenciador.adicionarTarefa(tarefa)).toThrow('Erro ao cadastrar tarefa');
    });

    test('deve remover uma tarefa existente', () => {
        const tarefa = { id: 3, descricao: 'Lavar o carro', prioridade: 2, data: '2024-09-02' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.removerTarefa(3);
        expect(gerenciador.listarTarefas()).toHaveLength(0);
    });

    test('deve atualizar uma tarefa existente', () => {
        const tarefa = { id: 4, descricao: 'Ir ao supermercado', prioridade: 1, data: '2024-09-03' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.atualizarTarefa(4, { descricao: 'Ir ao mercado' });
        expect(gerenciador.buscarTarefaPorId(4).descricao).toBe('Ir ao mercado');
    });

    test('deve marcar uma tarefa como concluída', () => {
        const tarefa = { id: 5, descricao: 'Estudar JavaScript', prioridade: 1, data: '2024-09-04' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.marcarTarefaComoConcluida(5);
        expect(gerenciador.buscarTarefaPorId(5).concluida).toBe(true);
    });

    test('deve listar tarefas concluídas', () => {
        const tarefa1 = { id: 6, descricao: 'Ler um livro', prioridade: 3, data: '2024-09-05', concluida: true };
        const tarefa2 = { id: 7, descricao: 'Jogar futebol', prioridade: 2, data: '2024-09-06' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasConcluidas()).toHaveLength(1);
    });

    test('deve listar tarefas pendentes', () => {
        const tarefa1 = { id: 8, descricao: 'Fazer exercício', prioridade: 2, data: '2024-09-07' };
        const tarefa2 = { id: 9, descricao: 'Reparar o carro', prioridade: 1, data: '2024-09-08', concluida: true };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        expect(gerenciador.listarTarefasPendentes()).toHaveLength(1);
    });

    test('deve adicionar e remover tags de uma tarefa', () => {
        const tarefa = { id: 10, descricao: 'Comprar presente', prioridade: 2, data: '2024-09-09' };
        gerenciador.adicionarTarefa(tarefa);
        gerenciador.adicionarTagATarefa(10, 'importante');
        expect(gerenciador.buscarTarefaPorId(10).tags).toContain('importante');
        gerenciador.removerTagDaTarefa(10, 'importante');
        expect(gerenciador.buscarTarefaPorId(10).tags).not.toContain('importante');
    });

    test('deve listar tarefas por tag', () => {
        const tarefa = { id: 11, descricao: 'Comprar ingredientes', prioridade: 1, data: '2024-09-10', tags: ['culinária'] };
        gerenciador.adicionarTarefa(tarefa);
        expect(gerenciador.listarTarefasPorTag('culinária')).toHaveLength(1);
    });

    test('deve ordenar tarefas por data', () => {
        const tarefa1 = { id: 12, descricao: 'Reunião', prioridade: 3, data: '2024-09-12' };
        const tarefa2 = { id: 13, descricao: 'Entregar relatório', prioridade: 1, data: '2024-09-11' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorData();
        expect(gerenciador.listarTarefas()[0].id).toBe(13);
    });

    test('deve ordenar tarefas por prioridade', () => {
        const tarefa1 = { id: 14, descricao: 'Chamar cliente', prioridade: 2, data: '2024-09-13' };
        const tarefa2 = { id: 15, descricao: 'Enviar e-mail', prioridade: 1, data: '2024-09-14' };
        gerenciador.adicionarTarefa(tarefa1);
        gerenciador.adicionarTarefa(tarefa2);
        gerenciador.ordenarTarefasPorPrioridade();
        expect(gerenciador.listarTarefas()[0].id).toBe(15);
    });
});