import datetime

class Usuario:
    def __init__(self, nome, email, senha):
        self.nome = nome
        self.email = email
        self.senha = senha
        self.pontos = 0
        self.nivel = 1
        self.objetivos = []

class Objetivo:
    def __init__(self, titulo, descricao, data_fim):
        self.titulo = titulo
        self.descricao = descricao
        self.data_inicio = datetime.date.today()
        self.data_fim = data_fim
        self.metas = []
        self.status = "Ativo"

class Meta:
    def __init__(self, descricao, meta_atingida):
        self.descricao = descricao
        self.progresso_atual = 0.0
        self.meta_atingida = meta_atingida
        self.concluida = False

usuarios = []
usuario_logado = None

def cadastrar_usuario():
    nome = input("Nome de usuário: ")
    email = input("Email: ")
    senha = input("Senha: ")
    usuarios.append(Usuario(nome, email, senha))
    print("Usuário cadastrado com sucesso!\n")

def login():
    global usuario_logado
    email = input("Email: ")
    senha = input("Senha: ")
    for u in usuarios:
        if u.email == email and u.senha == senha:
            usuario_logado = u
            print(f"Bem-vindo(a), {u.nome}!\n")
            return
    print("Email ou senha incorretos.\n")

def criar_objetivo():
    if not usuario_logado:
        print("Faça login primeiro.\n")
        return
    titulo = input("Título do objetivo: ")
    descricao = input("Descrição: ")
    data_fim = input("Data de conclusão (YYYY-MM-DD): ")
    objetivo = Objetivo(titulo, descricao, datetime.datetime.strptime(data_fim, "%Y-%m-%d").date())
    usuario_logado.objetivos.append(objetivo)
    print("Objetivo criado com sucesso!\n")

def listar_objetivos():
    if not usuario_logado or not usuario_logado.objetivos:
        print("Nenhum objetivo encontrado.\n")
        return
    for i, obj in enumerate(usuario_logado.objetivos):
        print(f"[{i}] {obj.titulo} - Status: {obj.status}")
    print()

def criar_meta():
    if not usuario_logado:
        print("Faça login primeiro.\n")
        return
    listar_objetivos()
    idx = int(input("Selecione o objetivo pelo número: "))
    if idx < 0 or idx >= len(usuario_logado.objetivos):
        print("Objetivo inválido.\n")
        return
    descricao = input("Descrição da meta: ")
    meta_atingida = float(input("Meta a atingir (número): "))
    meta = Meta(descricao, meta_atingida)
    usuario_logado.objetivos[idx].metas.append(meta)
    print("Meta adicionada com sucesso!\n")

def atualizar_progresso():
    if not usuario_logado:
        print("Faça login primeiro.\n")
        return
    listar_objetivos()
    idx_obj = int(input("Selecione o objetivo: "))
    if idx_obj < 0 or idx_obj >= len(usuario_logado.objetivos):
        print("Objetivo inválido.\n")
        return
    objetivo = usuario_logado.objetivos[idx_obj]
    if not objetivo.metas:
        print("Nenhuma meta neste objetivo.\n")
        return
    for i, m in enumerate(objetivo.metas):
        print(f"[{i}] {m.descricao} - {m.progresso_atual}/{m.meta_atingida}")
    idx_meta = int(input("Selecione a meta: "))
    if idx_meta < 0 or idx_meta >= len(objetivo.metas):
        print("Meta inválida.\n")
        return
    progresso = float(input("Adicionar progresso: "))
    meta = objetivo.metas[idx_meta]
    meta.progresso_atual += progresso
    if meta.progresso_atual >= meta.meta_atingida:
        meta.concluida = True
        usuario_logado.pontos += 10
        print("Meta concluída! +10 pontos.\n")
        if usuario_logado.pontos >= usuario_logado.nivel * 50:
            usuario_logado.nivel += 1
            print(f"Parabéns! Você subiu para o nível {usuario_logado.nivel}!\n")
    else:
        print("Progresso atualizado.\n")

def exibir_status():
    if not usuario_logado:
        print("Faça login primeiro.\n")
        return
    print(f"Usuário: {usuario_logado.nome}")
    print(f"Pontos: {usuario_logado.pontos}")
    print(f"Nível: {usuario_logado.nivel}\n")

def menu():
    while True:
        print("===== MENU =====")
        print("1. Cadastrar usuário")
        print("2. Login")
        print("3. Criar objetivo")
        print("4. Listar objetivos")
        print("5. Criar meta")
        print("6. Atualizar progresso da meta")
        print("7. Exibir status do usuário")
        print("0. Sair")
        opcao = input("Escolha uma opção: ")

        if opcao == "1":
            cadastrar_usuario()
        elif opcao == "2":
            login()
        elif opcao == "3":
            criar_objetivo()
        elif opcao == "4":
            listar_objetivos()
        elif opcao == "5":
            criar_meta()
        elif opcao == "6":
            atualizar_progresso()
        elif opcao == "7":
            exibir_status()
        elif opcao == "0":
            print("Saindo...")
            break
        else:
            print("Opção inválida.\n")

menu()
