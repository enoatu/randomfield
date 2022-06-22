FROM golang:1.19-rc-bullseye as dev

COPY ./randomfield /go/src/randomfield
WORKDIR /go/src/randomfield

# タイムゾーン設定
RUN ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata

RUN go mod download
RUN go mod tidy \
  && go install github.com/cespare/reflex@v0.3.1 \
  && go build

CMD ["/go/bin/reflex", "-s", "/usr/local/go/bin/go", "run", "./main.go"]

FROM alpine:latest AS build

COPY --from=builder /go/src/randomfield /usr/local/bin/randomfield
WORKDIR /usr/local/bin
