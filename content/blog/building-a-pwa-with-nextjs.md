---
title: "Building Progressive Web Apps (PWAs) with Next.js"
slug: "building-a-pwa-with-nextjs"
date: "2024-08-01"
imageId: "blog-pwa-nextjs"
description: "Learn how to enhance your Next.js application with Progressive Web App capabilities, including offline support and installability."
---

Progressive Web Apps (PWAs) bridge the gap between web and native applications, offering features like offline access, push notifications, and the ability to be 'installed' on a user's home screen. Next.js, with its powerful ecosystem, is an excellent framework for building PWAs.

This guide will walk you through the essential steps to turn a standard Next.js app into a PWA. The core components are the **Web App Manifest** and the **Service Worker**.

The manifest is a simple JSON file that tells the browser about your PWA and how it should behave when installed.

```json
// public/manifest.json
{
  "name": "DevSec Portfolio",
  "short_name": "DevSec",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#111827",
  "theme_color": "#111827",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

The Service Worker is a script that runs in the background, separate from your web page. It's the key to enabling offline capabilities by intercepting network requests and caching responses. We'll use the `next-pwa` package to simplify service worker generation and management, ensuring your app stays fast and reliable, even on flaky networks.
