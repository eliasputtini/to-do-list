# To Do List App

Este é uma aplicação simples de ToDo List desenvolvido como parte de um projeto de estudo. Ele permite que os usuários criem, visualizem, atualizem e excluam tarefas em sua lista de afazeres.

Deploy link:

[https://to-do-list-eliasputtini.vercel.app/](https://to-do-list-eliasputtini.vercel.app/)

## Tecnologias Utilizadas

- **MongoDB**: Banco de dados NoSQL utilizado para armazenar as tarefas dos usuários.
- **Next.js**: Framework React utilizado para a construção da aplicação.
- **Tailwind CSS**: Framework CSS utilizado para a estilização da interface.
- **TypeScript**: Linguagem de programação utilizada para adicionar tipagem estática ao JavaScript.

## Funcionalidades Principais

- **Autenticação**: A aplicação oferece a opção de autenticação para os usuários. Os usuários podem criar uma conta fornecendo um email e senha válidos ou optar por entrar como visitantes.
- **Criar Lista**: Os usuários podem criar novas listas clicando no botão "Criar nova Lista" e inserindo o nome da Lista desejada.
- **Adicionar Tarefa**: Os usuários podem adicionar novas tarefas à lista clicando no botão "Adicionar Tarefa" e inserindo o nome da tarefa desejada.
- **Marcar como Concluída**: Os usuários podem marcar uma tarefa como concluída clicando no checkbox ao lado da tarefa.
- **Excluir Tarefa**: Os usuários podem excluir uma tarefa da lista clicando no botão de Delete ao lado da tarefa.
- **Compartilhas Lista**: Os usuários podem compartilhar o link de uma lista clicando no botão de Share na lista.

## Melhorias a se fazer

- Impedir que o usuário cadastre-se com caracteres de espaço pois pode causar bugs
- Melhor lógica para criação do permalink. Utilizando Hash e impedindo listas duplicadas
- Implementação de loading e melhor design
- Edição e ordenação das tarefas
