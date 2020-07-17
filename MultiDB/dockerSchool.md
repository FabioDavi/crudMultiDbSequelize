saber o q o outro quer ouvir
contar historias para preparar o outro e deixar a pessoa se sentir convidada a particiipar da conversa
definir a sua propria contribuição no universo nos dialogos (ex .. o q vc faz da vida) sou pedreiro mas estou 
construindo o maracana para a posteridade
vc é julgado pela aparencia (estar adequadamento bem vestido para a ocasião)

docker
//lista os commandos principais

docker -v
//exibe a versão do docker


docker run hello-world
//vai procurar a imagem no computador local - não encontrando baixa - por fim executa

docker images
//lista as imagens

//docker hub +++++++++++++++++++++++++++++++
hub.docker.com
docker pull nginx //ou docker pull nginx:stable
docker container run --publish 8282:80 nginx // cria um server tipo iis (da certo assim tb: docker container run -p 8282:80 nginx)

o comando detach não segura o prompt 
docker container run -p 8282:80 --detach nginx
docker container ls // lista

//docker cli +++++++++++++++++++++++++++++++++++++++
comand line interface... são os comando que rodamos no terminal
docs.docker.com/engine/reference/commandline/cli

//parar um container
docker container stop b95b5306a111

//mostra todos os container ativos e inativos que ja estão rodando ou ja foram rodados alguma vez
docker container ls -a
//criando um container sem nome randomico
docker container run --publish 8080:80 --detach --name webrserv nginx

//mostra todos os comando pra container
docker container --help

//para apagar um container inativo
docker container rm id-do-container ou nome
//funciona para mais de um
docker container rm 234234 444333

//iniciar um container 
docker container start 9987767

//mostra os processos de um container
docker container top 9987767
//mostra as configurações de um container
docker container inspect 9987767


//estatistica - funciona para todos os container que foram inicializados --consegue ver qual container está gastando mais memoria
docker container stats


//docker run  roda um processo em um container isolado
docker run -a stdin -a stdout -i  -t ubuntu /bin/bash
//abaixo uma forma simplificada
docker container run -it ubuntu /bin/bash
//atualizar o container (precisa dessa atualização para instalar o git)
apt-get update
apt-get install git
 git --version
 //exit sai de dentro do terminal linux dentro do container.
//docker container start 45454545(linux) no background
docker container start 8989889
docker container attach 8989889 (volta ao prompt de forma simplificada)

//criando mais um container
docker container run -it ubuntu


//o comando exec executa um comando dentro de um container
//usado pra não precisar se attachar a ele (se anexar)
docker container exec 1d1df8a3bfae ls -la
docker container exec 1d1df8a3bfae git --version

//remove todos os containers parados
docker container prune

//docker rmi 423332fs remove uma imagem

+++++++++ interessante usar cloud9 = ide completa desenvolvida em nodejs... trabalha com containers... roda em debian,, acesso localhost porta louco 













+++++++++++++ Principios 






