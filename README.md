# **Countdownly** 🚀

**Self-hosted countdown timers with SSO-first admin access.**

Countdownly is a lightweight, open-source application for creating and managing public/private countdown timers. Built with **Next.js (App Router)**, **Drizzle ORM**, and **PostgreSQL**, it’s designed for easy deployment in your homelab or enterprise environment.

---

## **Features**
* ✅ **Public Countdowns**: Share timers with anyone via a simple link.
* ✅ **SSO-First Admin**: Secure admin access via OAuth/SSO (Authentik, Google, GitHub, etc.).
* ✅ **Self-Hosted**: Deploy with Docker + Traefik, no external dependencies.
* ✅ **Simple & Fast**: Minimal setup, optimized for performance.

---

## **Prerequisites**
- Docker + Docker Compose (rootless recommended)
- Traefik (for reverse proxy + SSO middleware)
- PostgreSQL (or SQLite for testing)
- Node.js 22+ (for development)

---

## **Quick Start**

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/countdownly.git
cd countdownly
```

### 2. Install Dependencies (pnpm)
```bash
pnpm install
```

### 3. Configure Environment
Copy `.env.example` to `.env` and update:
```env
DATABASE_URL="postgresql://user:password@postgres:5432/countdownly"
AUTH_SECRET="your-secret-key"
# SSO Provider (e.g., Authentik)
AUTHENTIK_ISSUER="https://auth.yourdomain.fr"
AUTHENTIK_CLIENT_ID="your-client-id"
AUTHENTIK_CLIENT_SECRET="your-client-secret"
```

### 4. Run with Docker Compose
```bash
docker compose up -d
```
*(Includes Next.js + PostgreSQL services, pre-configured for Traefik.)*

---

## **Development**
### Install Dependencies
```bash
pnpm install
```

### Run Locally
```bash
pnpm dev
```
*(Next.js will start on `http://localhost:3000`.)*

### Build for Production
```bash
pnpm build
```

---

## **Contributing** 🛠️

### **How to Contribute**
1. **Fork** the repository.
2. **Clone** your fork:
   ```bash
   git clone https://github.com/yourusername/countdownly.git
   ```
3. **Create a branch**:
   ```bash
   git checkout -b feat/your-feature
   ```
4. **Commit** your changes:
   ```bash
   git commit -m "feat: add your feature"
   ```
5. **Push** to your fork:
   ```bash
   git push origin feat/your-feature
   ```
6. **Open a Pull Request** to the `main` branch.

### **Code Guidelines**
- Use **Drizzle ORM** for database operations.
- Follow **Next.js App Router** conventions.
- Avoid hardcoding secrets (use `.env`).
- Keep Dockerfiles simple (Alpine-based).

### **Testing**
- Run tests with:
  ```bash
  pnpm test
  ```
- Ensure your changes work with:
  ```bash
  pnpm lint
  pnpm build
  ```
