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

2. Iniciando um Projeto
Como começar um novo projeto ou obter um projeto existente.

git init
Analogia: Ligar o Capacitor de Fluxo.

O que faz: Inicia um novo repositório Git na pasta atual.

Como funciona: Cria a pasta oculta .git, que é o nosso "álbum de fotos" (repositório local), onde todo o histórico do projeto será armazenado.

git clone
Analogia: Fazer uma cópia do "álbum de fotos" da galeria principal.

O que faz: Baixa um repositório existente de um servidor remoto (como o GitHub) para a sua máquina.

Como funciona: Cria uma cópia local do projeto, já conectada ao repositório remoto (origin).

Exemplo de Uso:

git clone <URL_DO_REPOSITÓRIO_HTTPS_OU_SSH>

3. O Ciclo de Trabalho Diário (A Fotografia)
Os comandos que você mais usará no seu dia a dia.

git status
Analogia: O Painel de Controlo do DeLorean.

O que faz: Mostra o estado atual do seu "estúdio" (Working Directory) e do seu "visor da câmara" (Staging Area).

Como funciona: Informa quais ficheiros foram modificados, quais estão prontos para serem "fotografados" e em qual branch você está. É o seu melhor amigo, use-o a toda a hora!

git add
Analogia: O Visor da Câmara (Enquadrar a Cena).

O que faz: Adiciona as alterações do "estúdio" para a "área de preparação" (Staging Area).

Como funciona: Seleciona quais mudanças específicas farão parte da sua próxima "foto" (commit). É o passo de composição da cena.

Exemplos de Uso:

# Adiciona um ficheiro específico
git add nome_do_arquivo.txt

# Adiciona todos os ficheiros modificados e novos na pasta atual
git add .

git commit
Analogia: O Clique Final (Tirar a Foto e Escrever a Legenda).

O que faz: Salva um "snapshot" (uma foto) do que está na Staging Area para o histórico do repositório.

Como funciona: Pega em tudo o que foi "enquadrado" com git add e cria um ponto permanente na sua linha do tempo, acompanhado de uma mensagem descritiva.

Exemplo de Uso:

git commit -m "feat: Adiciona funcionalidade de login"

Dica Pro: Use o padrão Conventional Commits (feat:, fix:, docs:, etc.) para mensagens claras e profissionais.

4. Navegando no Histórico (O Álbum de Fotos)
Comandos para visualizar e entender a linha do tempo.

git log
Analogia: Ver o Álbum de Fotos.

O que faz: Mostra o histórico de commits.

Como funciona: Lista as "fotos" que você tirou, da mais recente para a mais antiga, mostrando o autor, a data e a legenda de cada uma.

Exemplos de Uso (Dicas Pro):

# Mostra o log de forma compacta, numa só linha
git log --oneline

# Mostra o log com um gráfico das branches
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
