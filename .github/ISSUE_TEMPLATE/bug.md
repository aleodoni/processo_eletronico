---
name: Bug
about: Descreva o bug que você encontrou no sistema
title: "[BUG]"
labels: bug
assignees: ''

---

---
name: Bug
about: Descreva o bug que você encontrou no sistema
title: ''
labels: bug
assignees: ''
---

<!-- Verifique primeiro se este bug não foi reportado -->

<!-- Se possível preencha todo o template. Não retire nenhuma parte do mesmo -->

**Descrição do Bug**

<!-- Descreva de maneira clara o bug. -->

**Para Reproduzir**

<!--
Passos para reproduzir o bug:
1. Vá para '...'
2. Clique em '....'
3. Desça até '....'
4. Veja o erro
-->

**Comportamento Esperado**

<!-- Descreva de maneira clara como o sistema deveria se comportar. -->

**Exceção ou Erro**

<pre><code>
<!-- Se a issue vem acompanhada de uma exceção ou erro, coloque-a abaixo: -->
<!-- ✍️-->
</code></pre>

**Screenshots**

<!-- Se possível, anexe screenshots do bug. -->

**Contexto Adicional**

<!-- Adicione qualquer contexto adicional do bug aqui. -->

**Testes de regressão**

Testes de regressão são testes, que mostram como um pedaço de código falha em determinadas circunstâncias, e a beleza maior é que mesmo após a falha, o conjunto de testes nunca falha. Na verdade, é uma boa maneira de notificar sobre erros, mas certificando-se de que tudo esteja verde.

Um exemplo de fácil compreensão pode ser :
```javascript
test.failing('2 + 2 deve retornar 4, mas o método _add está retornando 6', (assert) => {
 assert.true(_add(2, 2), 4)
})
```
Após corrigido o bug, a simples exclusão de ~~.failing~~ e ajuste da descrição do teste
```javascript
test('2 + 2 deve retornar 4', (assert) => {
 assert.true(_add(2, 2), 4)
})
```
já habilita o teste para o bug corrigido.
