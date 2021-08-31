import { addReportingData, updateReport } from './allure';
import testStatusId from './testStatusIds';
import ConsoleMessages from './consoleMessages';

async function runTestSteps(testSteps) {
  const testResults = { status: undefined, error: undefined };
  try {
    await testSteps();
    testResults.status = testStatusId.pass;
  } catch (error) {
    testResults.status = testStatusId.failed;
    testResults.error = error;
  }
  return testResults;
}

async function updateResults(testResults) {
  ConsoleMessages.displayErrorMessages();
  await updateReport(testResults);
}

function run({ epic, testSteps, severity, feature, story, description, issue, testId, tag, argument }) {
  return async () => {
    await addReportingData({ severity, feature, story, description, epic, issue, testId, tag, argument });
    ConsoleMessages.startRegistryConsoleLog();
    const testResults = await runTestSteps(testSteps);
    await updateResults(testResults);
  };
}

export default run;
