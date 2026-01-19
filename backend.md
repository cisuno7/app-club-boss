# BACKEND - BOSS CONNECTION PLATFORM

## 📋 ESTRUTURA DO PROJETO

```
back end/
├── src/
│   ├── config/
│   │   ├── env.js          # Configuração de variáveis de ambiente
│   │   └── logger.js       # Configuração de logging
│   ├── features/           # Organização por feature/domínio
│   │   ├── auth/           # Autenticação (JWT, refresh token)
│   │   ├── client/         # Endpoints do Cliente
│   │   ├── company/       # Endpoints da Empresa
│   │   ├── admin/         # Endpoints do Admin
│   │   └── select/        # Endpoints Select (área exclusiva)
│   ├── middlewares/
│   │   ├── auth.js        # Middleware de autenticação JWT
│   │   ├── errorHandler.js # Tratamento centralizado de erros
│   │   └── rateLimit.js   # Rate limiting
│   ├── models/
│   │   └── store.js       # Mock de dados em memória
│   ├── routes/
│   │   └── index.js       # Agregação de todas as rotas
│   ├── utils/
│   │   ├── pagination.js  # Utilitários de paginação
│   │   └── relevance.js   # Cálculo de relevância de anúncios
│   ├── app.js             # Configuração do Express
│   └── server.js          # Ponto de entrada do servidor
├── package.json
└── .env                   # Variáveis de ambiente
```

## 🛠 TECNOLOGIAS

- **Express.js** 4.19.2 - Framework web
- **JWT** (jsonwebtoken) - Autenticação
- **express-validator** - Validação de dados
- **multer** - Upload de arquivos
- **helmet** - Segurança HTTP
- **cors** - Cross-Origin Resource Sharing
- **compression** - Compressão de respostas
- **morgan** - Logging de requisições
- **express-rate-limit** - Rate limiting
- **nodemon** - Desenvolvimento (auto-reload)

## 🚀 COMO RODAR

```bash
cd "back end"
npm install
npm run dev
```

O servidor inicia na porta definida em `PORT` (padrão: 3000).

## 📡 ENDPOINTS DA API

Base URL: `/api/v1`

### 🔐 AUTENTICAÇÃO (`/auth`)

#### POST `/auth/login`
Login de usuário (cliente, empresa, admin, select)

**Body:**
```json
{
  "email": "string",
  "password": "string",
  "role": "client" | "company" | "admin" | "select"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token",
    "refreshToken": "refresh_token",
    "user": { ... }
  }
}
```

#### POST `/auth/refresh`
Renovar token de acesso

**Body:**
```json
{
  "refreshToken": "string"
}
```

---

### 👤 CLIENTE (`/client`)

**Requer autenticação:** Sim (Bearer token)

#### GET `/client/feed`
Feed personalizado de anúncios

**Query params:**
- `page` (number, default: 1)
- `limit` (number, default: 10)
- `category` (string, opcional)
- `search` (string, opcional)

**Response:**
```json
{
  "success": true,
  "data": {
    "ads": [...],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 50,
      "totalPages": 5
    }
  }
}
```

#### GET `/client/coupons/available`
Lista cupons disponíveis

**Query params:**
- `page` (number)
- `limit` (number)

#### POST `/client/coupons/:adId/redeem`
Resgatar cupom de um anúncio

**Body:**
```json
{
  "couponId": "string"
}
```

#### GET `/client/coupons/history`
Histórico de cupons resgatados

**Query params:**
- `page` (number)
- `limit` (number)
- `status` ("active" | "used" | "expired")

#### POST `/client/contact`
Contatar equipe Boss

**Body:**
```json
{
  "channel": "whatsapp" | "email" | "chat",
  "message": "string",
  "adId": "string (opcional)"
}
```

---

### 🏢 EMPRESA (`/company`)

**Requer autenticação:** Sim (Bearer token, role: company)

#### POST `/company/ads`
Criar novo anúncio

**Body:**
```json
{
  "title": "string (max 100 chars)",
  "description": "string (max 500 chars)",
  "category": "string",
  "targetAudience": {
    "ageRange": { "min": 18, "max": 65 },
    "interests": ["string"],
    "location": "string"
  },
  "dailyBudget": 50.00,
  "scheduledAt": "ISO date string (opcional)"
}
```

#### GET `/company/ads`
Listar anúncios da empresa

**Query params:**
- `status` ("pending" | "active" | "paused" | "finished")
- `page` (number)
- `limit` (number)

#### PATCH `/company/ads/:adId`
Atualizar anúncio

**Body:** (campos opcionais)
```json
{
  "title": "string",
  "description": "string",
  "status": "active" | "paused"
}
```

#### POST `/company/ads/:adId/banners`
Upload de banners (máx 5 arquivos, 5MB cada)

**Form-data:**
- `banners`: arquivos (JPG, PNG)

#### GET `/company/metrics`
Dashboard de métricas

**Query params:**
- `startDate` (ISO date)
- `endDate` (ISO date)
- `adId` (string, opcional)

**Response:**
```json
{
  "success": true,
  "data": {
    "views": 1000,
    "clicks": 150,
    "conversions": 25,
    "roi": 2.5,
    "timeline": [...]
  }
}
```

#### GET `/company/reports/export`
Exportar relatório (CSV/JSON)

**Query params:**
- `format` ("csv" | "json")
- `startDate` (ISO date)
- `endDate` (ISO date)

---

### 👨‍💼 ADMIN (`/admin`)

**Requer autenticação:** Sim (Bearer token, role: admin)

#### GET `/admin/moderation/pending`
Lista anúncios pendentes de moderação

**Response:**
```json
{
  "success": true,
  "data": {
    "ads": [...],
    "priority": "high" | "medium" | "low"
  }
}
```

#### POST `/admin/moderation/:adId/approve`
Aprovar anúncio

**Body:**
```json
{
  "comment": "string (opcional)"
}
```

#### POST `/admin/moderation/:adId/reject`
Rejeitar anúncio

**Body:**
```json
{
  "reason": "string (predefinido ou livre)",
  "comment": "string"
}
```

#### GET `/admin/moderation/history`
Histórico de moderação

**Query params:**
- `page` (number)
- `limit` (number)
- `adminId` (string, opcional)

#### GET `/admin/banners`
Listar banners rotativos

#### POST `/admin/banners`
Criar banner rotativo

**Body (Form-data):**
- `banner`: arquivo (máx 10MB)
- `order`: number
- `targetUserType`: "client" | "company" | "select" | "all"
- `scheduledStart`: ISO date (opcional)
- `scheduledEnd`: ISO date (opcional)

#### PATCH `/admin/banners/:bannerId`
Atualizar banner

**Body:**
```json
{
  "order": number,
  "targetUserType": "string",
  "scheduledStart": "ISO date",
  "scheduledEnd": "ISO date"
}
```

#### GET `/admin/users`
Listar usuários

**Query params:**
- `search` (string)
- `role` ("client" | "company" | "admin" | "select")
- `status` ("active" | "blocked")
- `page` (number)
- `limit` (number)

#### PATCH `/admin/users/:userId`
Atualizar usuário

**Body:**
```json
{
  "role": "string",
  "status": "active" | "blocked",
  "interests": ["string"]
}
```

#### POST `/admin/coupons/bulk`
Criar cupons em massa

**Body:**
```json
{
  "adId": "string",
  "count": number,
  "rules": {
    "validUntil": "ISO date",
    "maxRedemptions": number,
    "discount": number,
    "isExclusive": boolean
  }
}
```

#### GET `/admin/coupons`
Listar todos os cupons

**Query params:**
- `adId` (string, opcional)
- `status` ("active" | "used" | "expired")
- `page` (number)
- `limit` (number)

#### GET `/admin/audit`
Logs de auditoria

**Query params:**
- `action` (string, opcional)
- `adminId` (string, opcional)
- `startDate` (ISO date)
- `endDate` (ISO date)
- `page` (number)
- `limit` (number)

#### PATCH `/admin/ads/:adId`
Editar conteúdo de anúncio (admin)

**Body:**
```json
{
  "title": "string",
  "description": "string"
}
```

---

### ⭐ SELECT (`/select`)

**Requer autenticação:** Sim (Bearer token, role: select)

#### POST `/select/access`
Validar acesso Select (código especial)

**Body:**
```json
{
  "accessCode": "string"
}
```

#### GET `/select/content`
Conteúdo exclusivo para membros Select

#### GET `/select/coupons`
Cupons exclusivos Select

#### GET `/select/events`
Eventos fechados Select

#### GET `/select/benefits`
Benefícios exclusivos Select

**Response:**
```json
{
  "success": true,
  "data": {
    "exclusiveCoupons": [...],
    "priorityDiscounts": [...],
    "closedEvents": [...],
    "vipSupport": true
  }
}
```

---

## 🔒 SEGURANÇA

### Autenticação JWT
- Token de acesso expira em 24h
- Refresh token para renovação
- MFA opcional para empresas (flag `mfaEnabled`)

### Rate Limiting
- 100 requisições por 15 minutos por IP
- Endpoints de autenticação: 5 tentativas por 15 minutos

### Validações
- Todos os endpoints validam entrada com `express-validator`
- Upload limitado: 5MB por arquivo (empresa), 10MB (admin banners)
- Máximo 5 arquivos por upload (empresa)

### Headers de Segurança
- Helmet configurado
- CORS habilitado
- Compression ativo

---

## 📊 ESTRUTURA DE DADOS (Mock)

### Usuário
```javascript
{
  id: "uuid",
  email: "string",
  password: "hashed",
  role: "client" | "company" | "admin" | "select",
  name: "string",
  interests: ["string"],
  status: "active" | "blocked",
  mfaEnabled: boolean,
  createdAt: Date
}
```

### Anúncio
```javascript
{
  id: "uuid",
  companyId: "uuid",
  title: "string",
  description: "string",
  category: "string",
  banners: ["url"],
  status: "pending" | "active" | "paused" | "rejected" | "finished",
  targetAudience: {
    ageRange: { min: number, max: number },
    interests: ["string"],
    location: "string"
  },
  dailyBudget: number,
  scheduledAt: Date,
  metrics: {
    views: number,
    clicks: number,
    conversions: number
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Cupom
```javascript
{
  id: "uuid",
  adId: "uuid",
  code: "string",
  discount: number,
  validUntil: Date,
  maxRedemptions: number,
  currentRedemptions: number,
  isExclusive: boolean,
  createdAt: Date
}
```

### Resgate de Cupom
```javascript
{
  id: "uuid",
  userId: "uuid",
  couponId: "uuid",
  adId: "uuid",
  status: "active" | "used" | "expired",
  redeemedAt: Date,
  usedAt: Date
}
```

### Histórico de Moderação
```javascript
{
  id: "uuid",
  adId: "uuid",
  adminId: "uuid",
  action: "approve" | "reject",
  reason: "string",
  comment: "string",
  createdAt: Date
}
```

### Log de Auditoria
```javascript
{
  id: "uuid",
  adminId: "uuid",
  action: "string",
  resource: "string",
  resourceId: "uuid",
  details: {},
  createdAt: Date
}
```

---

## 🎯 REGRAS DE NEGÓCIO IMPLEMENTADAS

### Feed de Anúncios (RF-CLI-001)
- ✅ Segmentação por interesses do usuário
- ✅ Ordenação por relevância (views, clicks, conversões)
- ✅ Paginação infinita
- ✅ Filtros por categoria
- ✅ Busca por palavra-chave
- ✅ Anúncios vistos não aparecem por 24h

### Resgate de Cupons (RF-CLI-002)
- ✅ Visualização de cupons disponíveis
- ✅ Limite de resgates por usuário (validação)
- ✅ Validação de regras (validade, limite de resgates)
- ✅ Histórico completo de cupons

### Contato Boss (RF-CLI-003)
- ✅ Múltiplos canais (WhatsApp, Email, Chat)
- ✅ Contexto do anúncio anexado
- ✅ Histórico de conversas
- ✅ Status do atendimento

### Criação de Anúncios (RF-EMP-001)
- ✅ Upload de banners (imagem/vídeo)
- ✅ Agendamento de publicação
- ✅ Validação: título max 100 chars, descrição max 500 chars
- ✅ Validação: orçamento mínimo R$50

### Dashboard Métricas (RF-EMP-002)
- ✅ Visualizações, cliques, conversões
- ✅ Gráficos temporais
- ✅ ROI calculado
- ✅ Exportação de dados (CSV/JSON)

### Moderação (RF-ADM-001)
- ✅ Lista de anúncios pendentes
- ✅ Aprovação/rejeição com motivo
- ✅ Edição de conteúdo
- ✅ Histórico completo de moderação

### Gerenciamento de Banners (RF-ADM-002)
- ✅ Upload de banners
- ✅ Definição de ordem/rotação
- ✅ Targeting por tipo de usuário
- ✅ Agendamento de exibição

### Gerenciamento de Usuários (RF-ADM-003)
- ✅ Busca e filtros
- ✅ Bloqueio/desbloqueio
- ✅ Mudança de tipo de conta
- ✅ Visualização de atividade

### Gerenciamento de Cupons (RF-ADM-004)
- ✅ Criação em massa
- ✅ Definição de regras (validade, limites)
- ✅ Tracking de resgates
- ✅ Relatórios de performance

### Acesso Select (RF-SEL-001)
- ✅ Login com credenciais especiais
- ✅ Validação de código de acesso
- ✅ Interface diferenciada
- ✅ Conteúdo exclusivo

### Benefícios Select (RF-SEL-002)
- ✅ Cupons exclusivos
- ✅ Descontos prioritários
- ✅ Eventos fechados
- ✅ Suporte VIP

---

## 📝 VARIÁVEIS DE AMBIENTE

Criar arquivo `.env` na raiz de `back end/`:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=seu_secret_jwt_aqui
JWT_REFRESH_SECRET=seu_refresh_secret_aqui
JWT_EXPIRES_IN=24h
JWT_REFRESH_EXPIRES_IN=7d
```

---

## 🧪 TESTES

Para testar os endpoints, use ferramentas como:
- Postman
- Insomnia
- curl
- Thunder Client (VS Code)

**Exemplo de requisição:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"client@example.com","password":"123456","role":"client"}'
```

---

## 📌 OBSERVAÇÕES

- **Mock de dados:** Atualmente usando store em memória (`src/models/store.js`)
- **Banco de dados:** Pronto para integração com MongoDB/PostgreSQL
- **Upload de arquivos:** Usando `multer` com storage em memória (pronto para S3/local)
- **Logs:** Morgan configurado para desenvolvimento
- **Error handling:** Centralizado em `middlewares/errorHandler.js`

---

## 🔄 PRÓXIMOS PASSOS

1. Integrar banco de dados real (MongoDB/PostgreSQL)
2. Implementar storage de arquivos (S3 ou local)
3. Adicionar testes automatizados (Jest + Supertest)
4. Implementar filas para processamento assíncrono
5. Adicionar monitoramento (APM)
6. Documentação Swagger/OpenAPI
