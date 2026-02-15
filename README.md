## Imix -- Servicio de Procesamiento con IA (NestJS + MongoDB)

------------------------------------------------------------------------

# Contexto del reto

Servicio backend que:

-   Recibe solicitudes vía API REST
-   Persiste información en MongoDB
-   Simula procesamiento con IA
-   Retorna resultado procesado
-   Está diseñado bajo principios de seguridad, escalabilidad y
    separación de responsabilidades

------------------------------------------------------------------------

# Diseño Arquitectónico

## 🏗 Enfoque Arquitectónico

Se propone una arquitectura en capas basada en separación de
responsabilidades:

Cliente (Web / Mobile)\
↓\
API Gateway / BFF\
↓\
Backend (NestJS)\
├── Controller Layer\
├── Application Layer (Services)\
├── Domain Layer (Entities / Enums)\
├── Infrastructure Layer (MongoDB / IA)\
↓\
MongoDB

------------------------------------------------------------------------

## 📦 Componentes

### Controller

-   Expone endpoints REST
-   Valida DTOs
-   No contiene lógica de negocio

### Application Service

-   Orquesta el flujo
-   Gestiona estados
-   Maneja errores

### AI Service (Mock)

-   Simula integración externa
-   Desacoplado del core

### Persistencia

-   MongoDB + Mongoose
-   Esquemas tipados

------------------------------------------------------------------------

## 🔄 Flujo

1.  Cliente envía POST /requests
2.  DTO valida payload
3.  Se guarda documento con estado PROCESSING
4.  Se ejecuta IA mock
5.  Se actualiza estado:
    -   COMPLETED
    -   FAILED
6.  Se retorna documento final

------------------------------------------------------------------------

## ⚠️ Manejo de errores

### Negocio

-   Error IA → estado FAILED
-   HTTP 200 con resultado controlado

### Infraestructura

-   Error DB → HTTP 500
-   Log interno

------------------------------------------------------------------------

## 🔐 Seguridad y protección de información

-   ValidationPipe global
-   class-validator
-   No exposición de stack traces
-   Variables sensibles vía ConfigModule

### Protección de datos sensibles

Para evitar consultar DB en cada request:

-   Claims relevantes dentro del JWT
-   Cache distribuido (Redis)
-   Backend de procesamiento no tiene conciencia de seguridad

------------------------------------------------------------------------

## 👤 Manejo de sesión

-   JWT (Access + Refresh Token)
-   Backend stateless
-   Seguridad delegada a API Gateway o Auth Service

------------------------------------------------------------------------

## 🔑 Integración con SSO

Si somos responsables del SSO:

-   Implementar OAuth2 / OpenID Connect
-   Identity Provider (Keycloak/Auth Server propio)
-   Backend valida JWT firmado
-   No se capturan credenciales en cada aplicación

------------------------------------------------------------------------

# Implementación Backend

Tecnologías:

-   NestJS
-   MongoDB
-   Mongoose
-   TypeScript

Estados del Request:

PENDING | PROCESSING | COMPLETED | FAILED

------------------------------------------------------------------------

# Criterio Técnico

# 🚀 Modelo de despliegue recomendado

Cloud Provider (AWS / GCP)\
├── Load Balancer\
├── Backend Containers (Auto Scaling)\
├── MongoDB Atlas\
├── Redis\
└── API Gateway

------------------------------------------------------------------------

## 📈 Escalabilidad

-   Servicio stateless
-   Escalable horizontalmente
-   Preparado para alta concurrencia

------------------------------------------------------------------------

## 🔧 Mejoras futuras en producción

-   Cola de procesamiento (BullMQ)
-   Workers dedicados
-   Circuit breaker para IA
-   Observabilidad (Prometheus + Grafana)
-   Rate limiting
-   Auditoría y trazabilidad
-   Pruebas unitarias y e2e
-   CI/CD pipeline
-   Versionado de API

------------------------------------------------------------------------

# 🧠 Límites de Responsabilidad

| Servicio | Responsabilidad |
| :--- | :--- |
| **Auth Service** | Autenticación |
| **API Gateway** | Seguridad y Rate Limiting |
| **Processing Service** | Lógica de negocio |
| **IA Service** | Procesamiento IA |
| **Frontend** | Presentación |

------------------------------------------------------------------------

# 🛠 Instalación

npm install npm run start:dev

Variables:

DB_URI=mongodb://localhost:27017/imix PORT=3000
