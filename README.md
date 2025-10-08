Guia de Comandos Essenciais do Git
Este é um guia de consulta rápida para os comandos do Git que vimos no minicurso "Dominando a Máquina do Tempo". Use as analogias para se lembrar do papel de cada comando no fluxo de trabalho.

1. Configuração Inicial (A Identidade do Piloto)
Ações que você faz apenas uma vez por computador.

git config
O que faz: Define as suas informações de autor para todos os seus repositórios locais.

Como funciona: "Carimba" o seu nome e email em cada "foto" (commit) que você tira, identificando a sua autoria no histórico.

Exemplos de Uso:

# Define o seu nome de usuário
git config --global user.name "Seu Nome Completo"

# Define o seu email
git config --global user.email "seuemail@exemplo.com"



# Adiciona um ficheiro específico
git add nome_do_arquivo.txt

git add .

git commit
Analogia: O Clique Final (Tirar a Foto e Escrever a Legenda).

Como funciona: Pega em tudo o que foi "enquadrado" com git add e cria um ponto permanente na sua linha do tempo, acompanhado de uma mensagem descritiva.

Exemplo de Uso:

git commit -m "feat: Adiciona funcionalidade de login"

Dica Pro: Use o padrão Conventional Commits (feat:, fix:, docs:, etc.) para mensagens claras e profissionais.

4. Navegando no Histórico (O Álbum de Fotos)
Comandos para visualizar e entender a linha do tempo.
git log
Analogia: Ver o Álbum de Fotos.

O que faz: Mostra o histórico de commits.


# Mostra o log de forma compacta, numa só linha
git log --graph --oneline

# Mostra o que mudou em cada commit (o "patch")
git log -p

5. Trabalhando com Branches (As Linhas do Tempo Alternativas)
Comandos para gerir os "universos paralelos".

git branch
O que faz: Lista, cria ou apaga branches.

Como funciona: Permite gerir as suas linhas do tempo.

Exemplos de Uso:

# Lista todas as branches locais
git branch

# Cria uma nova branch
git branch nome-da-nova-branch

# Apaga uma branch que já foi fundida (merge)
git branch -d nome-da-branch

git checkout
Analogia: Viajar entre as Linhas do Tempo.

O que faz: Muda de uma branch para outra.

Como funciona: Altera todos os ficheiros no seu "estúdio" para que correspondam à versão da branch de destino.

Exemplos de Uso:

# Muda para uma branch existente
git checkout nome-da-branch

# Cria uma nova branch e já muda para ela (atalho)
git checkout -b nome-da-nova-branch

git merge
Analogia: Fundir as Realidades.

O que faz: Incorpora as alterações de uma branch na branch atual.

Como funciona: Estando na branch de destino (ex: main), o git merge traz todo o histórico de commits da branch que você quer fundir (ex: feature/login) para a sua linha do tempo atual.

6. Sincronizando com Repositórios Remotos (O GitHub)
Comandos para colaborar e partilhar o seu trabalho.

git push
Analogia: Enviar o seu "álbum de fotos" para a "galeria online".

O que faz: Envia os seus commits locais para o repositório remoto.

Exemplo de Uso:

# Envia a branch 'main' para o remoto 'origin'
git push origin main

git pull
Analogia: Receber as "fotos novas" da "galeria online".

O que faz: Busca e funde as alterações do repositório remoto no seu repositório local.

Como funciona: É uma combinação de dois comandos: git fetch (que baixa as novidades) e git merge (que as incorpora na sua branch local).

Exemplo de Uso:

git pull origin main

7. Investigando o Código (O Modo Detetive)
Ferramentas para entender o código e as suas mudanças.

git diff
O que faz: Mostra as diferenças entre versões.

Como funciona: É extremamente útil para ver o que você alterou mas ainda não moveu para a Staging Area (git add).

Exemplos de Uso:

# Mostra as mudanças no estúdio que não foram "enquadradas"
git diff

# Mostra as mudanças que estão na Staging Area (enquadradas) mas não foram "fotografadas"
git diff --staged

git blame
O que faz: Mostra quem foi a última pessoa a modificar cada linha de um ficheiro.

Como funciona: É uma ferramenta de "arqueologia" para entender o contexto de uma alteração, não para culpar.

Exemplo de Uso:

git blame nome_do_arquivo.txt
