# Deprecation notice
 DEPRECATED - This projects has been retired. 

# generator-jhipster-javaee
[![NPM version][npm-image]][npm-url] [![Actions Status](https://github.com/hostops/generator-jhipster-javaee/workflows/Build/badge.svg)](https://github.com/hostops/jhipster-generator-javaee/actions) [![Dependency Status][daviddm-image]][daviddm-url] ![Maintenance](https://img.shields.io/maintenance/yes/2021.svg)
> JHipster blueprint, Jhipster blueprint for JavaEE instead of spring. It supports MicroProfile and KumuluzEE

# Introduction

This is a [JHipster](https://www.jhipster.tech/) blueprint, that is meant to be used in a JHipster application.
This blueprint with jhipster project allows you to generate code for microservice with backup written in JavaEE framework.
We will try to provide support for all JavaEE modules using best industrial practices.
Forget about hard setup of JavaEE project and jump directly into coding.

When you will start generating project you will be asked few questions about your preffered architecture and we will generate whole project for you.
For more information please check [JHipster](https://www.jhipster.tech/)



# Prerequisites

As this is a [JHipster](https://www.jhipster.tech/) blueprint, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://www.jhipster.tech/installation/)

# Installation

## With NPM

To install this blueprint:

```bash
npm install -g generator-jhipster-javaee
```

To update this blueprint:

```bash
npm update -g generator-jhipster-javaee
```

## With Yarn

To install this blueprint:

```bash
yarn global add generator-jhipster-javaee
```

To update this blueprint:

```bash
yarn global upgrade generator-jhipster-javaee
```

# Usage

To use this blueprint, run the below command

```bash
jhipster --blueprint javaee
```


## Running local Blueprint version for development

During development of blueprint, please note the below steps. They are very important.

1. Link your blueprint globally 

Note: If you do not want to link the blueprint(step 3) to each project being created, use NPM instead of Yarn as yeoman doesn't seem to fetch globally linked Yarn modules. On the other hand, this means you have to use NPM in all the below steps as well.

```bash
cd javaee
npm link
```

2. Link a development version of JHipster to your blueprint (optional: required only if you want to use a non-released JHipster version, like the master branch or your own custom fork)

You could also use Yarn for this if you prefer

```bash
cd generator-jhipster
npm link

cd javaee
npm link generator-jhipster
```

3. Create a new folder for the app to be generated and link JHipster and your blueprint there

```bash
mkdir my-app && cd my-app

npm link generator-jhipster-javaee
npm link generator-jhipster (Optional: Needed only if you are using a non-released JHipster version)

jhipster -d --blueprint javaee

```

# License

Apache-2.0 © [HostOps](https://jakob.hostnik.si)


[npm-image]: https://img.shields.io/npm/v/generator-jhipster-javaee.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-javaee
[travis-image]: https://travis-ci.org/hostops/generator-jhipster-javaee.svg?branch=master
[travis-url]: https://travis-ci.org/hostops/generator-jhipster-javaee
[daviddm-image]: https://david-dm.org/hostops/generator-jhipster-javaee.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/hostops/generator-jhipster-javaee
