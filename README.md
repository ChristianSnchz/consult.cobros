# pe-fe-debt-consult

Micro-front for debt records section.


> Some IDE's use `Ctrl + Shift + F` or `Ctrl + Shift + R` or `Ctrl + F` or `Ctrl + H`, to search in all resolution.
>
> List of modified files after replacement:
> ```
> .ci-variables.yml
> README.md
> okd/deploy-image.yml
> okd/development.yml
> okd/production.yml
> okd/staging.yml
> package-lock.json
> package.json
> public/index.html
> public/manifest.json
> src/sagas/example.ts
> src/set-public-path.ts
> src/utils/errorBoundary.tsx
> webpack.config.build.js
> webpack.config.dev.js
> ```

> These `.env` files are used in GitLab's pipelines:
>
> `.env.development` uses in `development` branch.
>
> `.env.staging` uses in `staging` branch.
>
> `.env.production` uses in `production` branch.

## Available commands

### `npm start`

Run project in dev mode.

### `npm run build-development`

Build project for development environment (no minification).

### `npm run build-staging`

Build project for staging environment (no minification).

### `npm run build-production`

Build project for production environment.

### `npm run serve`

Run a static server to expose content of `dist` folder.

### `npm run lint`

Run Eslint.

### `npm test`

Run Jest and Enzyme.

## Browsers compatibility

This app is configured with `defaults` option in `.browserslistrc` and it's works on the following browsers:

```
and_chr 85
and_ff 79
and_qq 10.4
and_uc 12.12
android 81
baidu 7.12
chrome 86
chrome 85
chrome 84
edge 86
edge 85
firefox 81
firefox 80
firefox 78
ie 11
ios_saf 14
ios_saf 13.4-13.7
ios_saf 13.3
ios_saf 12.2-12.4
kaios 2.5
op_mini all
op_mob 59
opera 71
opera 70
safari 14
safari 13.1
samsung 12.0
samsung 11.1-11.2
```

This configuration polyfill `.js` and `.css` files. For more information
visit [browserslist](https://github.com/browserslist/browserslist).

> You can do your own test with different versions, only you need to modify `.browserslistrc` file.
