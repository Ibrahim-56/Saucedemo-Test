# Saucedemo Playwright Test Suite

## Overview
Automates the end-to-end happy-path for https://www.saucedemo.com:
- login as `standard_user`
- add 3 random items to cart
- complete checkout
- verify order confirmation

## Setup
```bash
npm install
npx playwright install
```

## Run tests
- Run headless: `npm test`
- Run headed: `npm run test:headed`
- Show report: `npm run test:report`
