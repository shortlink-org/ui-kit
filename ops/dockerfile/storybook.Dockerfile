# syntax=docker/dockerfile:1.17

###############################################################################
# Global BuildKit options (optional SBOM attestation―leave if you need them)
###############################################################################
ARG BUILDKIT_SBOM_SCAN_STAGE=true
ARG BUILDKIT_SBOM_SCAN_CONTEXT=true

###############################################################################
# Build-stage arguments
###############################################################################
ARG NODE_VERSION=24-alpine

########################
# 1️⃣  Builder stage
########################
FROM --platform=$BUILDPLATFORM node:${NODE_VERSION} AS builder

# CI metadata (build-time only)
ARG CI_COMMIT_SHA
ARG CI_COMMIT_TAG
ARG CI_PIPELINE_URL
ARG BUILD_DATE

# pnpm only needed here
ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:${PATH}"
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Private registry for the Shortlink scope
RUN echo '@shortlink-org:registry=https://gitlab.com/api/v4/packages/npm/' >> .npmrc

# Copy the whole mono-repo / workspace
COPY ./ ./

# Install & build with cache for pnpm store
RUN --mount=type=cache,id=pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile \
 && pnpm run build-storybook

########################
# 2️⃣  Runtime stage
########################
FROM ghcr.io/nginxinc/nginx-unprivileged:1.27-alpine AS runtime

###############################################################################
# Build-time args (re-declared so we can inject them into labels)
###############################################################################
ARG CI_COMMIT_SHA
ARG CI_COMMIT_TAG
ARG BUILD_DATE

###############################################################################
# OCI labels (single instruction = single layer)
###############################################################################
LABEL \
  org.opencontainers.image.title="ui-kit" \
  org.opencontainers.image.description="Shortlink UI component library" \
  org.opencontainers.image.url="https://shortlink.best/" \
  org.opencontainers.image.source="https://github.com/shortlink-org/shortlink" \
  org.opencontainers.image.licenses="MIT" \
  org.opencontainers.image.vendor="Shortlink" \
  org.opencontainers.image.authors="Viktor Login <batazor111@gmail.com>" \
  org.opencontainers.image.version="${CI_COMMIT_TAG:-${CI_COMMIT_SHA}}" \
  org.opencontainers.image.revision="${CI_COMMIT_SHA}" \
  org.opencontainers.image.created="${BUILD_DATE}"

###############################################################################
# Layer that needs root (package install + removing default config)
###############################################################################
USER root
RUN apk add --no-cache curl \
 && rm /etc/nginx/conf.d/default.conf \
 && adduser -D -u 1001 -g '' nginx-user
USER nginx-user  # switch to non-root user for security

###############################################################################
# NGINX configuration & static assets
###############################################################################
COPY ./ops/dockerfile/conf/ui.local     /etc/nginx/conf.d/default.conf
COPY ./ops/dockerfile/conf/nginx.conf   /etc/nginx/nginx.conf
COPY ./ops/dockerfile/conf/templates    /etc/nginx/template

# Storybook build from the builder stage
COPY --from=builder /app/storybook-static /usr/share/nginx/html

###############################################################################
# Health-check, port & runtime user
###############################################################################
HEALTHCHECK --interval=5s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:8080/ || exit 1

EXPOSE 8080
USER nginx-user
