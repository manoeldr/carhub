# CarHub

Projeto desenvolvido para a cadeira de **Programação e Modelagem para Web**. O CarHub é uma proposta de comunidade para entusiastas de carros, com compartilhamento de fotos, interação entre usuários e descoberta de encontros automotivos.

## Autores

- Gabriela Faraon
- Manoel Rodrigues
- Mariana Santos

## Tecnologias

HTML5, CSS3 e JavaScript puro, sem frameworks ou etapa de compilação.

## Como executar

Abra a pasta no VS Code e use **Open with Live Server** no `index.html`. Como os componentes HTML são carregados com `fetch`, é necessário um servidor HTTP local; abrir os arquivos diretamente por `file://` não funciona.

Se você tiver Python instalado, uma alternativa é executar na raiz:

```bash
python3 -m http.server 5500
```

Acesse [http://localhost:5500](http://localhost:5500).

## Funcionalidades atuais

- Página Principal com feed responsivo, ordem aleatória e carregamento progressivo em lotes.
- Catálogo local de 12 fotos, sem repetição na sessão. Ao esgotar as imagens, o feed mostra uma mensagem de término.
- Busca por título, autor, legenda e tags.
- Curtidas, comentários, favoritos e publicação com imagem, mantidos apenas durante a sessão da página.
- Sidebar e topbar fixas, com menu recolhível.
- Tela Tema com aparência escura, clara ou de acordo com o sistema. A preferência é salva no `localStorage` e aplicada às duas telas.

O projeto está em desenvolvimento. Encontros, criação completa de publicação, perfil e configurações aparecem no protótipo, mas suas telas ainda não foram implementadas. Não há backend, autenticação ou banco de dados. Dados de autores e interações do feed são fictícios. Avatares e fonte usam serviços externos e dependem de internet; as fotos dos posts estão no projeto.

## Organização

```text
index.html                 # Entrada para a página Principal
pages/
  principal.html           # Feed
  tema.html                # Preferência de aparência
  containers/              # HTML da sidebar e topbar
styles/
  main.css                 # Importações dos estilos compartilhados
  global.css               # Base visual e estilos compartilhados
  principal.css            # Estilos do feed
  tema.css                 # Estilos da tela Tema
  containers/              # CSS da sidebar e topbar
scripts/
  main.js                  # Carregamento dos arquivos e da tela atual
  global.js                # Funções compartilhadas e preferência de tema
  principal.js             # Comportamento do feed
  tema.js                  # Controles de aparência
  containers/              # JavaScript da sidebar e topbar
images/
  posts/                   # Fotografias do catálogo de demonstração
  figma/                   # Referências visuais do protótipo
```

Cada tela possui seu HTML, CSS e JavaScript. Os componentes compartilhados seguem a mesma separação dentro das pastas `containers`.

## Protótipo no Figma

[Ver o projeto CARHUB no Figma](https://www.figma.com/design/m7DuEU4P5v5mPEITvPsP3M/CARHUB?node-id=0-1).

As imagens abaixo são **referências do Figma**, não capturas da implementação atual. O rodapé foi removido da implementação conforme a definição do projeto. A tela Tema foi criada seguindo o estilo visual das referências.

### Principal

![Referência do feed](images/figma/principal.png)

### Encontros — planejado

![Referência de encontros](images/figma/encontros.png)

### Nova publicação — planejado

![Referência de nova publicação](images/figma/nova-publicacao.png)

### Perfil — planejado

![Referência do perfil](images/figma/perfil.png)

### Configurações — planejado

![Referência das configurações](images/figma/configuracoes.png)

## Recursos visuais

Fotos de demonstração: [Unsplash](https://unsplash.com/). Avatares de demonstração: [Pravatar](https://pravatar.cc/). Fonte Roboto: [Google Fonts](https://fonts.google.com/specimen/Roboto). Os títulos do catálogo descrevem as fotos conferidas visualmente, sem atribuir versões ou anos não confirmados.

## Repositório

[github.com/manoeldr/carhub](https://github.com/manoeldr/carhub)
