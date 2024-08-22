# Synthetic Monitoring Unpacked
Synthetic monitoring in Elastic allows you to track user pathways using global testing infrastructure to gauge the influence of web and front-end performance on user experience. This code sample aims to walk you through how to get started with synthetic monitoring.

## Demo application
The [demo application](https://demo-store-ivory.vercel.app/products) is a simple example application that emulates a web store. The code used to create it is in [this repository](https://github.com/JessicaGarson/demo-store).

## Montioring code
The code has been adopted from the process outlined in the [getting started documentation](https://www.elastic.co/guide/en/observability/current/synthetics-get-started-project.html). It can be found in the projects-test [folder](/projects-test).

To run synthetic tests locally:

```bash
npm run test
```

To push monitors to Kibana: 

```bash
SYNTHETICS_API_KEY=<value> npm run push
```

## Recorded code
Code generated from the [Elastic Synthetics Recorder](https://www.elastic.co/guide/en/observability/current/synthetics-recorder.html) can be found in [here.](https://github.com/JessicaGarson/Synthetic-Monitoring-Unpacked/blob/main/projects-test/journeys/recorded.journey.js)

## Slides
You can find slides from versions of this talk in the folder entitled [slides](/slides).

## Resources
- [Documention on the subject](https://www.elastic.co/guide/en/observability/current/monitor-uptime-synthetics.html)
- [Two sides of the same coin: Uniting testing and monitoring with Synthetic Monitoring](https://www.elastic.co/observability-labs/blog/testing-monitoring-synthetic-monitoring) 
- [My coworker Carly’s talk from DevOps.js](https://portal.gitnation.org/contents/synthetic-monitoring-and-e2e-testing-2-sides-of-the-same-coin-1979)
- [Synthetics advent calendar](https://discuss.elastic.co/t/dec-8th-2023-en-authentication-in-synthetic-monitoring-with-playwright-and-elastic-synthetics/347290)
