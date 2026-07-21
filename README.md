# Radar

Quadro kanban para acompanhar prospecção de clientes, feito em **HTML, CSS e JavaScript puro**, sem nenhuma biblioteca.

Esse projeto nasceu de uma necessidade real: na minha agência (Fluxo), eu prospectava pequenos negócios pelo Instagram e perdia o controle de quem eu já tinha abordado e há quanto tempo cada conversa estava parada. O Radar resolve isso.

## O que ele faz

- CRUD completo de leads: criar, editar, mover e excluir
- - Cinco etapas de funil: Mapeado, Abordado, Conversando, Proposta e Fechado
  - - Drag and drop nativo do HTML5 para mover leads entre etapas
    - - Persistência em `localStorage`: os dados continuam lá quando você volta
      - - **Termômetro de follow-up**: cada card mostra há quantos dias você não fala com aquele lead. Até 3 dias está quente, até 7 está morno, acima disso o card avisa que a conversa esfriou
       
        - ## Como rodar
       
        - Sem build, sem dependência. Clone o repositório e abra o `index.html` no navegador.
       
        - ```
          git clone https://github.com/henrii021/radar.git
          ```

          ## Decisões que tomei

          **Por que JavaScript puro e não um framework?** Porque o objetivo aqui era dominar a base: manipulação de DOM, eventos, estado e persistência. Um framework esconderia exatamente o que eu queria praticar.

          **Por que o termômetro?** Em prospecção, o problema não é falta de leads, é conversa que morre por esquecimento. Transformar "dias desde o último contato" em uma barra colorida faz o quadro gritar onde eu preciso agir. A regra está isolada na função `avaliarFollowUp`, então mudar os limites de dias é trivial.

          **Por que `dialog` nativo?** O elemento `<dialog>` do HTML já entrega foco, tecla Esc e backdrop sem eu reescrever nada. Menos código, mais acessibilidade.

          **Segurança:** todo texto digitado pelo usuário passa pela função `escapar` antes de virar HTML, evitando injeção de código nos cards.

          ## Stack

          HTML5 · CSS3 (grid, custom properties) · JavaScript (ES6+) · localStorage · Drag and Drop API
          
