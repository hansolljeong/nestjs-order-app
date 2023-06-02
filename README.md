# Order Management API App
## 📍 Introduction
NestJS 프레임워크를 사용하여 만든 간단한 주문 관리 App입니다.

현재는 로컬 환경에서 사용 및 테스트가 가능합니다.
## 📍 Description
### 구현 사항
1. 아래 4가지 API를 구현했습니다.
    - 주문 접수처리 : `user_id`와 `total_price`를 입력하여 주문을 생성합니다.
    - 주문 완료처리 : 주문의 완료 상태를 `true`로 변경합니다.
    - 단일 주문조회 : `id`값으로 주문을 불러옵니다.
    - 주문 목록조회 : 주문 전체를 `Array` 타입으로 불러옵니다.
2. Unit Test, e2e Test 코드를 작성했습니다.
3. 테스트를 위한 DB를 docker compose로 간단히 생성할 수 있게 script를 작성하여 세팅했습니다.
4. 실제 API 구동 테스트는 아래 Start Guide를 따라 Swagger에서 할 수 있습니다.

## 📍 Start Guide
### Installation

```bash
$ npm install
```
### Setting for test in `localhost`
```bash
# init database
$ npm run db:docker-up

# .env setting
$ mv .env_sample .env
```
> 13306 포트를 사용하여 테스트할 수 있도록 세팅해놓았습니다.
다른 포트 번호 사용을 원할 경우 `docker/DB/docker-compose.yml`의 `ports` 부분과 `.env`의 `port`를 원하는 포트 번호로 변경하면 됩니다.

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
### Swagger API Docs
`localhost:3000/api`
