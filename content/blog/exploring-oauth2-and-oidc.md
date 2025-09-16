---
title: "Exploring OAuth 2.0 and OpenID Connect (OIDC)"
slug: "exploring-oauth2-and-oidc"
date: "2024-07-30"
imageId: "blog-oauth-oidc"
description: "Demystifying two of the most important protocols for modern authentication and authorization. What's the difference and when should you use them?"
---

OAuth 2.0 and OpenID Connect (OIDC) are often mentioned together, but they solve different problems. Understanding their roles is crucial for building secure applications.

**OAuth 2.0 is for Authorization.** It's a protocol that allows a user to grant a third-party application limited access to their resources on another service, without sharing their credentials. Think of it as a valet key for your data. The application receives an *access token*, which represents the permission to access specific resources.

**OIDC is for Authentication.** It's a thin layer built on top of OAuth 2.0. OIDC adds the concept of an *ID token*, which is a JSON Web Token (JWT) that contains information about the authenticated user (like their name, email, and a unique ID). It allows the application to verify the user's identity.

```text
+-------------------+      +-------------------+
|   OAuth 2.0       |      |       OIDC        |
+-------------------+      +-------------------+
|   Authorization   |      |   Authentication  |
| (What you can do) |      |   (Who you are)   |
|   Access Token    |      |     ID Token      |
+-------------------+      +-------------------+
```

In short: use OIDC whenever your application needs to know *who* the user is. Use plain OAuth 2.0 when your application only needs to access resources on behalf of the user, without needing to confirm their identity itself.
