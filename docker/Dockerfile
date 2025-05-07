ARG ARCH=
FROM ${ARCH}node:22.14.0-bookworm AS build
WORKDIR /app
ENV DOCKER=YES NODE_ENV=production
ADD . .
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends build-essential && \
    npm ci --include=dev && \
    npm run build && \
    npm ci --omit=dev

FROM ${ARCH}node:22.14.0-bookworm-slim
ARG TARGETARCH
WORKDIR /app
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        make \
        gcc \
        g++ \
        pkg-config \
        pcscd \
        libpcsclite-dev \
        libccid \
        libdvbv5-dev \
        pcsc-tools \
        dvb-tools \
        wget \
        && \
    wget https://github.com/kazuki0824/recisdb-rs/releases/download/1.2.3/recisdb_1.2.3-1_${TARGETARCH}.deb && \
    dpkg -i recisdb_1.2.3-1_${TARGETARCH}.deb && \
    apt-get autoremove -y wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -f recisdb_1.2.3-1_${TARGETARCH}.deb
COPY --from=build /app /app
CMD ["./docker/container-init.sh"]
EXPOSE 40772 9229
