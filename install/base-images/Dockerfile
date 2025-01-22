FROM alpine:3.20

SHELL ["/bin/sh", "-o", "pipefail", "-c"]

RUN apk update && \
   apk add --no-cache \
   curl=8.11.1-r0 \
   podman=5.2.5-r0 \
   fuse-overlayfs=1.14-r0 && \
   rm -rf /var/cache/apk/*

ENV DOCKER_HOST=unix:///run/podman/podman.sock

# Install Buildpacks CLI
RUN curl -sSL "https://github.com/buildpacks/pack/releases/download/v0.36.2/pack-v0.36.2-linux-arm64.tgz" | \
   tar -C /usr/local/bin -xzv pack

WORKDIR /usr/src/app
