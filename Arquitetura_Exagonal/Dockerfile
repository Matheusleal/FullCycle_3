FROM golang:1.18

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}"

RUN go install github.com/golang/mock/mockgen@latest && \
    go install github.com/spf13/cobra-cli@latest

RUN apt-get update && apt-get install sqlite3 -y

ARG USERNAME=gouser
ARG USER_UID=1000
ARG USER_GID=$USER_UID

RUN groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME

RUN mkdir -p /var/www/.cache
RUN chown -R $USER_UID:$USER_GID /go
RUN chown -R $USER_UID:$USER_GID /var/www/.cache

USER $USERNAME

CMD ["tail", "-f", "/dev/null"]