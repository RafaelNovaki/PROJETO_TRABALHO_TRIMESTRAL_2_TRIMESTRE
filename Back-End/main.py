import datetime

usuarios = {}
objetivos = {}
metas = {}
usuario_logado = None

def cadastrar_usuario():
    print("=== Cadastro ===")
    nome = input("Nome: ").strip()
    email = input("Email: ").strip()
    senha = input("Senha: ").strip()
    if email in usuarios:
        print("Email já cadastrado.")
        return
    usuarios[email] = {
        'nome': nome,
        'email': email,
        'senha': senha,
        'data_registro': datetime.datetime.now(),
        'pontos_total': 0
    }
    print(f"Usuário {nome} cadastrado com sucesso!")

def login():
    global usuario_logado
    print("=== Login ===")
    email = input("Email: ").strip()
    senha = input("Senha: ").strip()
    user = usuarios.get(email)
    if not user or user['senha'] != senha:
        print("Usuário ou senha inválidos.")
        return
    usuario_logado = email
    print(f"Bem-vindo(a), {user['nome']}!")

def criar_objetivo():
    global objetivos
    if usuario_logado is None:
        print("Faça login primeiro.")
        return
    print("=== Criar Objetivo ===")
    titulo = input("Título do objetivo: ").strip()
    descricao = input("Descrição: ").strip()
    data_inicio = datetime.date.today()
    status = 'Ativo'
    id_obj = len(objetivos) + 1
    objetivos[id_obj] = {
        'id_usuario': usuario_logado,
        'titulo_objetivo': titulo,
        'descricao': descricao,
        'data_inicio': data_inicio,
        'status': status,
        'metas': []
    }
    print(f"Objetivo '{titulo}' criado com sucesso!")

def listar_objetivos():
    if usuario_logado is None:
        print("Faça login primeiro.")
        return
    print("=== Seus Objetivos ===")
    tem_obj = False
    for id_obj, obj in objetivos.items():
        if obj['id_usuario'] == usuario_logado:
            tem_obj = True
            print(f"ID {id_obj} | {obj['titulo_objetivo']} - {obj['status']}")
    if not tem_obj:
        print("Nenhum objetivo cadastrado.")

def criar_meta():
    if usuario_logado is None:
        print("Faça login primeiro.")
        return
    listar_objetivos()
    try:
        id_obj = int(input("Digite o ID do objetivo para adicionar meta: "))
        if id_obj not in objetivos or objetivos[id_obj]['id_usuario'] != usuario_logado:
            print("Objetivo inválido.")
            return
    except:
        print("ID inválido.")
        return
    descricao_meta = input("Descrição da meta: ").strip()
    progresso_atual = 0.0
    meta_atingida = float(input("Meta a ser atingida (ex: 100): "))
    unidade_medida = input("Unidade de medida (ex: horas, páginas): ").strip()
    concluida = False
    id_meta = len(metas) + 1
    metas[id_meta] = {
        'id_objetivo': id_obj,
        'descricao_meta': descricao_meta,
        'progresso_atual': progresso_atual,
        'meta_atingida': meta_atingida,
        'unidade_medida': unidade_medida,
        'concluida': concluida
    }
    objetivos[id_obj]['metas'].append(id_meta)
    print(f"Meta adicionada ao objetivo '{objetivos[id_obj]['titulo_objetivo']}' com sucesso!")

def listar_metas():
    if usuario_logado is None:
        print("Faça login primeiro.")
        return
    listar_objetivos()
    try:
        id_obj = int(input("Digite o ID do objetivo para listar metas: "))
        if id_obj not in objetivos or objetivos[id_obj]['id_usuario'] != usuario_logado:
            print("Objetivo inválido.")
            return
    except:
        print("ID inválido.")
        return
    print(f"=== Metas do objetivo '{objetivos[id_obj]['titulo_objetivo']}' ===")
    for id_meta in objetivos[id_obj]['metas']:
        meta = metas[id_meta]
        status = "Concluída" if meta['concluida'] else "Em progresso"
        print(f"ID {id_meta} | {meta['descricao_meta']} - {meta['progresso_atual']}/{meta['meta_atingida']} {meta['unidade_medida']} - {status}")

def atualizar_progresso_meta():
    if usuario_logado is None:
        print("Faça login primeiro.")
        return
    listar_objetivos()
    try:
        id_obj = int(input("Digite o ID do objetivo da meta: "))
        if id_obj not in objetivos or objetivos[id_obj]['id_usuario'] != usuario_logado:
            print("Objetivo inválido.")
            return
    except:
        print("ID inválido.")
        return
    listar_metas()
    try:
        id_meta = int(input("Digite o ID da meta para atualizar: "))
        if id_meta not in metas or metas[id_meta]['id_objetivo'] != id_obj:
            print("Meta inválida.")
            return
    except:
        print("ID inválido.")
        return
    try:
        valor = float(input("Digite o valor a somar ao progresso atual: "))
    except:
        print("Valor inválido.")
        return
    meta = metas[id_meta]
    meta['progresso_atual'] += valor
    if meta['progresso_atual'] >= meta['meta_atingida']:
        meta['concluida'] = True
        meta['progresso_atual'] = meta['meta_atingida']
        print("Meta concluída!")
    else:
        print(f"Progresso atualizado: {meta['progresso_atual']} / {meta['meta_atingida']} {meta['unidade_medida']}")

def logout():
    global usuario_logado
    usuario_logado = None
    print("Deslogado com sucesso.")

def menu():
    while True:
        print("\n--- MENU ---")
        if usuario_logado:
            print(f"Logado como: {usuarios[usuario_logado]['nome']} ({usuario_logado})")
            print("1 - Criar objetivo")
            print("2 - Listar objetivos")
            print("3 - Criar meta")
            print("4 - Listar metas")
            print("5 - Atualizar progresso da meta")
            print("6 - Logout")
            print("0 - Sair")
            opc = input("Escolha: ")
            if opc == '1':
                criar_objetivo()
            elif opc == '2':
                listar_objetivos()
            elif opc == '3':
                criar_meta()
            elif opc == '4':
                listar_metas()
            elif opc == '5':
                atualizar_progresso_meta()
            elif opc == '6':
                logout()
            elif opc == '0':
                print("Saindo...")
                break
            else:
                print("Opção inválida.")
        else:
            print("1 - Cadastrar")
            print("2 - Login")
            print("0 - Sair")
            opc = input("Escolha: ")
            if opc == '1':
                cadastrar_usuario()
            elif opc == '2':
                login()
            elif opc == '0':
                print("Saindo...")
                break
            else:
                print("Opção inválida.")

if __name__ == "__main__":
    menu()
