# Matias Bueno — Portfolio

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

## Variables de entorno

Crear un archivo `.env` en la raíz con:

```
VITE_EMAILJS_SERVICE_ID=service_llsue5y
VITE_EMAILJS_TEMPLATE_ID=template_mwumigd
VITE_EMAILJS_PUBLIC_KEY=1p3uLuID7GIyEr60h
```

## Deploy en Vercel

1. Subí el proyecto a GitHub (sin el `.env`)
2. Entrá a vercel.com → New Project → importá el repo
3. En **Environment Variables** agregá las 3 variables del `.env`
4. Click en Deploy — listo

## Stack
- React 19 + Vite
- EmailJS para el formulario de contacto
- Sin dependencias de UI externas
