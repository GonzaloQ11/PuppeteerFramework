# Puppeteer Framework

## Description
- Puppeteer Automation tests done in a demo site: https://opensource-demo.orangehrmlive.com/

## Environment

| NAME                           | DESCRIPTION
| -------------------------------| ---------------------------
| HEADLESS                       | Puppeteer browser parameter. Default true in docker. |
| APP_USERNAME                   | Demo account username.            |
| APP_PASSWORD                   | Demo account password.            |
| TESTRAIL_HOST                  | Testrail host. Example: https://company.testrail.com/           |
| TESTRAIL_USER                  | Testrail username.            |
| TESTRAIL_API_KEY               | Testrail account API key.     |
| TESTRAIL_UPDATE_RESULTS        | Activates testrail integration. Default false since there is no demo testrail host.           |

## Installation

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
