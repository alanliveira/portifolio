# Portfólio Alan Oliveira

## Formulário de contato

O formulário envia mensagens pelo Route Handler `POST /api/contact`. O envio é feito no servidor com Resend; nenhuma credencial é exposta ao navegador.

### Variáveis na Vercel

Cadastre as variáveis abaixo em **Settings → Environment Variables** para Production, Preview e Development quando aplicável:

```bash
RESEND_API_KEY=
RESEND_FROM_EMAIL="Portfolio Alan Oliveira <contato@alanliveira.dev>"
CONTACT_TO_EMAIL=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=
SITE_URL=https://alanliveira.dev
```

`RESEND_FROM_EMAIL` deve usar um endereço de um domínio verificado no Resend. `CONTACT_TO_EMAIL` é privado e nunca é enviado ao client.

Para desenvolvimento local, copie `.env.example` para `.env.local` e use as chaves oficiais de teste do Cloudflare Turnstile. Não use chaves de produção no repositório.

### Resend

1. Verifique o domínio `alanliveira.dev` no painel do Resend e publique os registros DNS solicitados.
2. Crie uma API key de envio e cadastre-a como `RESEND_API_KEY`.
3. Configure um endereço desse domínio em `RESEND_FROM_EMAIL`.

### Turnstile

1. Crie um widget Turnstile para o domínio de produção e para os domínios de preview necessários.
2. Cadastre a site key pública e a secret key privada nas variáveis acima.
3. O servidor verifica o token no endpoint oficial da Cloudflare antes de chamar o Resend.

### Rate limit no Vercel Firewall

Configure uma regra de rate limit no Vercel Firewall para `POST /api/contact`, identificada por IP. Sugestão inicial: permitir no máximo 3 requisições em 10 minutos e bloquear o excedente. Essa proteção é complementar ao Turnstile e ao honeypot e não requer Redis ou outra dependência no projeto.
