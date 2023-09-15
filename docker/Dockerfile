ARG ARCH=
ARG TARGETARCH
FROM ${ARCH}node:18.17-bookworm AS build
WORKDIR /app
ENV DOCKER=YES NODE_ENV=production
ADD . .
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends build-essential && \
    npm install --production=false && \
    npm run build && \
    npm install -g --unsafe-perm --production

FROM ${ARCH}node:18.17-bookworm-slim
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
    wget https://github.com/kazuki0824/recisdb-rs/releases/download/1.1.0/recisdb_1.1.0_${TARGETARCH}.deb && \
    dpkg -i recisdb_1.1.0_${TARGETARCH}.deb && \
    apt-get autoremove -y wget && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* && \
    rm -f recisdb_1.1.0_${TARGETARCH}.deb
COPY --from=build /usr/local/lib/node_modules/mirakurun /app
CMD ["./docker/container-init.sh"]
EXPOSE 40772 9229
