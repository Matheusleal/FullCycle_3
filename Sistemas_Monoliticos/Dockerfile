FROM node:19

WORKDIR /app/src

RUN apt-get update --fix-missing && apt-get upgrade -y
RUN npm i -g pnpm

CMD ["tail", "-f", "/dev/null"]