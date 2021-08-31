/* eslint-disable no-undef */
import { Status } from 'jest-allure/dist/Reporter';
import testStatusId from './testStatusIds';

function log(target, name, descriptor) {
    const original = descriptor.value;
    if (typeof original === 'function') {
      descriptor.value = function(...args) {
        reporter.startStep(`${name}: ${args}`)
        try {
          const result = original.apply(this, args);
          reporter.endStep()
          return result;
        } catch (e) {
          reporter.endStep()
          throw e;
        }
      }
    }
    return descriptor;
  }

async function setData(data, logAction) {
  if (typeof data !== 'undefined') {
    await logAction();
  }
}

async function addData(parameterName, data) {
  await setData(data, async () => reporter.addLabel(parameterName, data));
}

async function addSeverity(severity) {
  await addData('severity', severity);
}

async function addFeature(feature) {
    await addData('feature', feature);
}

async function addDescription(description) {
  await addData('description', description);
}

async function addEpic(epic) {
  await addData('epic', epic);
}

async function addStory(story) {
  await addData('story', story);
}

async function addIssueLink(issue) {
  await addData('issue', issue);
}

async function addTestIdLink(testId) {
  await addData('testId', testId);
}

async function addTag(tag) {
  await addData('tag', tag);
}

async function addArguments(testArguments) {
  await setData(testArguments, async () => {
    await testArguments.forEach(async (argument) => {
      await reporter.addParameter('argument', argument.name, argument.value);
    });
  });
}

async function addEnvironment(environmentName, value) {
  await reporter.addEnvironment(environmentName, value);
}

async function logScreenshot() {
  await reporter.addAttachment('Screenshot', await global.page.screenshot(), 'image/png');
}

async function setDefaultEnvironmentData() {
  await addEnvironment('Browser Version', await global.page.browser().version());
}

async function startStep(stepName) {
  await reporter.startStep(stepName);
}

async function endStep(status = Status.Passed) {
  await reporter.endStep(status);
}

async function logStep(stepName, status) {
  await startStep(stepName);
  await endStep(status);
}

async function logError(error, stepMessage = 'Test failed', status = Status.Failed) {
  const puppeteerErrorsRegex = /(Connection|Session|Target) closed/g;
  await startStep(stepMessage);
  if (!error.message.match(puppeteerErrorsRegex)) {
    await logScreenshot();
  } else {
    console.warn('Page closed. Unable to log screenshot.');
  }
  await endStep(status);
}

/**
 * Add reporting using allure. Check https://www.npmjs.com/package/jest-allure for more features
 */
async function addReportingData({ severity, feature, story, description, epic, issue, testId, tag, argument }) {
  await setDefaultEnvironmentData();
  await addSeverity(severity);
  await addFeature(feature);
  await addStory(story);
  await addDescription(description);
  await addEpic(epic);
  await addIssueLink(issue);
  await addTestIdLink(testId);
  await addTag(tag);
  await addArguments(argument);
}

async function updateReport(testResults) {
  if (testResults.status === testStatusId.warning) {
    await logStep('Warning', Status.Broken);
  }

  if (testResults.status === testStatusId.failed) {
    await logError(testResults.error);
    throw testResults.error;
  }
}

export {
  addReportingData,
  logScreenshot,
  logStep,
  endStep,
  startStep,
  logError,
  Status,
  updateReport,
  log,
};
