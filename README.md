# Nx-DOS

&nbsp;  
[![PestoSaaS](https://dl.circleci.com/status-badge/img/circleci/EEitR3ZgjiaHKy1jJubVxP/JsxczUrDWCK8A3uAis4W9G/tree/main.svg?style=shield)](https://dl.circleci.com/status-badge/redirect/circleci/EEitR3ZgjiaHKy1jJubVxP/JsxczUrDWCK8A3uAis4W9G/tree/main)
[![codecov](https://codecov.io/gh/PestoSaaS/Nx-DOS/graph/badge.svg?token=D1GAJAF0Q9)](https://codecov.io/gh/PestoSaaS/Nx-DOS)
[![lighthouse accessibility](.badges/lighthouse_accessibility.svg)](https://github.com/GoogleChrome/lighthouse)
[![lighthouse best-practices](.badges/lighthouse_best-practices.svg)](https://github.com/GoogleChrome/lighthouse)
[![commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/PestoSaaS/Nx-DOS/issues)
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

<hr>

Nx-DOS is a project inspired by the [monorepo management tool Nx](https://nx.dev/getting-started/intro).

It's a starter template for small teams and solo founders to help build their online businesses. Our main objective is to save time, effort and costs for developers in the seed stage.

## Pre-release disclaimer

Please note this repo is under development and doesn't currently include a generator to create a copy of the template application using a CLI command. Pending a beta release, please manually duplicate the sample application to modify as you need.

# Special Thanks

Nx is the unifying tool in the center of this project. It allows us automation and control over our monorepo in order to encourage design patterns cherished by the dev community. It will be a powerful tool in our palette with immediate practical benefits and time savings.

We would also like to express special thanks for all the good advice, new ideas and libraries shared by the awesome folk below;

- [Nrwl](https://nx.app/company), [Nx confs](https://nx.dev/conf) & [community](https://go.nrwl.io/join-slack?utm_source=nx.dev)
- [Jamstack conf](https://jamstack.org/conf/) & [community](https://jamstack.org/)
- [Next.js conf](https://nextjs.org/conf) & Vercel community
- [App.js conf](https://appjs.co/) & Expo community
- Theo and [create-t3-app](https://github.com/t3dotgg)
- Lee Robinson's [Leerob.io](https://github.com/leerob/leerob.io)

# Contributing

If you use or like Nx-DOS, please consider providing feedback. This is an open-source project and we would love to hear from you!

## Roadmap for v1.0

Your engagement helps motivate our efforts, validate the time spent on development and guide our trajectory.

✅ _available_, 🚧 _work in progress_, ⏳ _backlogged_

**Boilerplate features**  
 [🚧] Authentication  
 [⏳] Account management  
 [⏳] Email & SMS  
 [⏳] Push notifications  
 [⏳] Payments

**Universal client management**  
 [🚧] Web, mobile & desktop clients  
 [🚧] URL routing & handoffs  
 [🚧] Mirrored state management  
 [🚧] Server components & SSR  
 [⏳] Bundle & SEO optimizations

**Improved DX via Nx tooling**  
 [⏳] Storybook component library  
 [⏳] State machine visualization  
 [✅] Dependency graph visualization  
 [✅] Modular architecture  
 [✅] Customizable target configurations  
 [✅] Self-hostable technology stack

**Improved accessibility**  
 [⏳] Internationalization & localization  
 [✅] Documentation viewer & markdoc support  
 [✅] Search integrated documentation segments  
 [✅] Cross browser reader mode improvements

**Integrated devops & monitoring**  
 [✅] Product analytics  
 [✅] Commitizen friendly repo  
 [✅] Automated changelog generation  
 [✅] Codecov test coverage monitoring  
 [✅] Lighthouse audits & budget assertions  
 [✅] CI backbone & vercel deployment  
 [✅] Containerization  
 [⏳] Feature flags

Thank you all for taking the time to use and support Nx-DOS. We're looking forward to your feedback.

Comments from fellow developers, small teams and especially solo-founders are immensely valuable for us. We'll do our best to get back in touch with you the soonest we can, and are genuinely interested to find out more about your specific needs.

## Learn about Nx

Remaining instructions below are the default essentials provided by the Nx generator. For further details please refer to [Nx documentation](https://nx.dev/getting-started/intro).

<hr>
   
# Nx - general usage instructions

This project was generated using [Nx](https://nx.dev). Usage instructions about Nx are referenced below regarding basic tasks, for further details please refer to official Nx documentation. While developing and maintaining clones of this repo, it's suggested to follow Nrwl's guidelines and Nx community channels on Nx best practices.

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

## Generate an application

Run `nx g @nx/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nx/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@nxdos/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nx/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
