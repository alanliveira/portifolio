# Portfólio Alan Oliveira

Landing page pessoal de Alan Oliveira, desenvolvida com Next.js, TypeScript, Tailwind CSS, Three.js e um formulário de contato protegido por Cloudflare Turnstile.

## Stack

- Next.js 16 com App Router e React 19
- TypeScript e Tailwind CSS 4
- Three.js, React Three Fiber e Drei para o cubo 3D
- Resend para envio server-side de email
- Cloudflare Turnstile, honeypot e Vercel Firewall para proteção do formulário
- Zod para validação e Vitest para testes

## Requisitos

- Git
- [asdf](https://asdf-vm.com/) para gerenciar versões, recomendado
- Node.js `25.9.0`
- npm `11.12.1`

As versões usadas pelo projeto estão em [`.tool-versions`](.tool-versions).

## Setup da máquina

### Com asdf

Instale os plugins de Node.js e npm, caso ainda não existam:

```bash
asdf plugin add nodejs https://github.com/asdf-vm/asdf-nodejs.git
asdf plugin add npm https://github.com/neoasun/asdf-npm.git
```

Na raiz do projeto, instale as versões definidas:

```bash
asdf install
```

### Sem asdf

Instale manualmente as versões de Node.js e npm indicadas em `.tool-versions` e confirme:

```bash
node --version
npm --version
```

## Instalação da aplicação

```bash
git clone git@github.com:alanliveira/portifolio.git
cd portifolio
npm ci
cp .env.example .env.local
```

Complete as variáveis de `.env.local` antes de testar o formulário. Esse arquivo é ignorado pelo Git e nunca deve ser enviado ao repositório.

## Comandos

```bash
npm run dev        # Servidor local em http://localhost:3000
npm run lint       # ESLint
npm run typecheck  # TypeScript sem emissão de arquivos
npm test           # Testes com Vitest
npm run build      # Build de produção
npm start          # Servidor do build de produção
```

## Variáveis de ambiente

Use [`.env.example`](.env.example) como referência. Todas as variáveis abaixo são configuradas em `.env.local` localmente e em **Vercel → Settings → Environment Variables** no deploy.

| Variável | Uso | Visibilidade |
| --- | --- | --- |
| `RESEND_API_KEY` | Chave privada para enviar emails pelo Resend | Somente servidor |
| `RESEND_FROM_EMAIL` | Remetente com domínio verificado no Resend | Somente servidor |
| `CONTACT_TO_EMAIL` | Destinatário privado das mensagens | Somente servidor |
| `TURNSTILE_SITE_KEY` | Site key pública do widget Turnstile, configurada como Config/Plain Text na Vercel | Build e client |
| `TURNSTILE_SECRET_KEY` | Chave privada de validação do Turnstile | Somente servidor |
| `TURNSTILE_HOSTNAMES` | Lista de hostnames públicos aceitos pelo Siteverify | Somente servidor |
| `SITE_URL` | URL pública canônica, usada na validação de hostname | Somente servidor |

## Formulário de contato

O navegador envia os dados para `POST /api/contact`. O Route Handler:

1. Limita o tamanho do payload e valida os dados com Zod.
2. Descarta submissões que preencham o honeypot.
3. Valida o token Turnstile no servidor.
4. Envia o email pelo Resend usando remetente e destinatário definidos no servidor.

O email informado pelo visitante é usado somente como `replyTo`. O formulário nunca aceita `from` ou `to` do client.

O widget usa a action `contact`. Em produção, o Route Handler exige `success === true`, `action === "contact"` e um hostname presente em `TURNSTILE_HOSTNAMES`.

### Desenvolvimento local

Use as chaves oficiais de teste do Turnstile no `.env.local`:

```env
TURNSTILE_SITE_KEY=1x00000000000000000000AA
TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA
```

Para o widget de produção já criado, a site key pública está em `.env.example`. Cadastre a secret correspondente apenas no painel da Vercel como `TURNSTILE_SECRET_KEY`; ela nunca deve ser adicionada ao Git ou compartilhada em chat. Configure também:

```env
TURNSTILE_HOSTNAMES=alanliveira.dev
SITE_URL=https://alanliveira.dev
```

No painel Cloudflare Turnstile, o widget precisa permitir `alanliveira.dev`, `localhost` e `127.0.0.1`. Os dois últimos são para desenvolvimento local e não entram em `TURNSTILE_HOSTNAMES` de produção.

Para testar o Resend sem domínio próprio, use o sandbox. Ele entrega apenas para o email usado na conta Resend:

```env
RESEND_FROM_EMAIL="Portfolio Alan Oliveira <onboarding@resend.dev>"
CONTACT_TO_EMAIL="seu-email-da-conta-resend"
```

Em produção, verifique o domínio no [Resend Domains](https://resend.com/domains), publique os registros DNS solicitados e defina um remetente desse domínio em `RESEND_FROM_EMAIL`.

### Rate limit na Vercel

No Vercel Firewall, configure uma regra para `POST /api/contact` identificada por IP. Sugestão inicial: permitir no máximo 3 requisições em 10 minutos. Essa regra complementa Turnstile e honeypot, sem adicionar Redis ou outra dependência ao projeto.

## Setup de IA

O projeto não depende de serviços de IA para rodar. As integrações abaixo são opcionais e servem apenas para agentes de desenvolvimento, como OpenCode ou Claude Code.

Para instalar as skills recomendadas de email e Resend localmente:

```bash
npx skills add resend/resend-skills -y
```

O comando instala skills em `.agents/` e/ou `.claude/`. Esses diretórios e `skills-lock.json` são locais e ignorados pelo Git para não versionar configurações pessoais de agentes.

## Deploy na Vercel

1. Importe o repositório no painel da Vercel.
2. Cadastre todas as variáveis de ambiente.
3. Configure os domínios permitidos no widget Turnstile.
4. Verifique o domínio remetente no Resend.
5. Crie a regra de rate limit no Vercel Firewall.
6. Faça um envio real pelo formulário após o deploy.

Antes de publicar, execute:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```
