FROM golang:rc-buster

WORKDIR /go/src/app

COPY backend .

ENV PORT=8005

EXPOSE $PORT

RUN go build api.go

CMD ["./lunar"]