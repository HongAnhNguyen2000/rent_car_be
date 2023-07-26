## For backend

```
cd docker
cp .env.default .env
cp nginx.conf/nginx.conf.local.default nginx.conf/nginx.conf
./exec build
./exec restart
./exec bserver
```

## Configure domain

```
vim /etc/hosts
```

Append content

```
127.0.0.1       rent.car.test
```
