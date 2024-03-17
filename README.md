# Challenge AutoForce 🏎

## Cenários de Teste Automatizados
1. Deve ser exibido feedback ao enviar um formulário completo 
2. Deve ser exibido feedback de campos obrigatórios ao tentar enviar o formulário incompleto 
3. Deve ser exibido feedback para campos em formato inválido ao tentar enviar o formulário incompleto
4. Deve ser resetado o status do formulário após corrigir os erros de preenchimento 

## Informações Adicionais

[Faker-js](https://github.com/faker-js/faker) utilizado para gerar massa de dados

[Cypress-Mochawesome-Reporter](https://github.com/LironEr/cypress-mochawesome-reporter) utilizado para gerar o report de resultado dos testes



## Hierarquia de Pastas

```
challenge-autoforce
        ├─cypress
        │    ├───e2e         | teste e2e automatizados *.js
        │    ├───reports     | relatório de execução dos testes *.html
        │    └───support     | arquivos de suporte do projeto *.js
        ├─cypress.config.js  | arquivo de configuração do cypress
        └─README.md          | documentação
```
## Bugs Encontrados
1. Ajuste de foco desnecessário ao clicar fora da lista de telefones expandida
2. Botão "Saiba mais sobre o Veículo" na oferta não funcionou
3. Feedback de campo vazio não atualizado ao selecionar checkbox de contato
4. Erros de digitação no endereço: Letra minúscula e vírgula no local incorreto
5. Busca por modelos não funciona corretamente
6. Link quebrado no modal de contato por whatsapp
7. Instabilidade ao carregar a imagem da oferta 
8. Não há feedback de campos obrigatórios para selects na modal de contato por whatsapp

## Sugestão de Melhorias
1. Adicionar botão para limpar formulário externo, como é feito no formulário do modal
2. Telefones são clicáveis somente no header, padronizar o comportamento para todos os telefones
3. Remover a possibilidade de inserir números no campo de Nome do formulário
4. Padronizar placeholder de inputs, alguns tem ":" outros não tem
5. Incluir na limpeza dos campos do formulário a remoção do feedback de informações inválidas
6. Padronizar radius nas bordas, a maior parte do site tem, exceto em dois modais
7. Padronizar comportamento após envio do formulário, somente um deles limpa o formulário após envio.
8. Padronizar a possibilidade de realizar buscas em selects.
9. Adicionar seletores próprios para utilizar no desenvolvimento de testes automatizados