# Puppeteer Framework

## Description
- Puppeteer Automation tests done in a demo site: https://opensource-demo.orangehrmlive.com/

## Environment

| NAME                           | DESCRIPTION
| -------------------------------| ---------------------------
| HEADLESS                       | Puppeteer browser parameter. Default true in docker. |
| APP_USERNAME                   | Demo account username.            |
| APP_PASSWORD                   | Demo account password.            |
| TESTRAIL_HOST                  | TestRail host. Example: https://company.testrail.com/           |
| TESTRAIL_USER                  | TestRail username.            |
| TESTRAIL_API_KEY               | TestRail account API key.     |
| TESTRAIL_UPDATE_RESULTS        | Activates TestRail integration. Default false since there is no demo testrail host.           |

## Setup

### Clone .env.example

``` bash
cp .env.example .env
```
### Installation

``` bash
npm install
```

## Run Tests
``` bash
npm run test
```

## Run Tests with Docker
``` bash
docker-compose run test
```
