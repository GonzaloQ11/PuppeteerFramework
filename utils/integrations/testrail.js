/* eslint-disable no-console */
const Testrail = require('testrail-api');

const testrail = new Testrail({
  host: process.env.TESTRAIL_HOST,
  user: process.env.TESTRAIL_USER,
  password: process.env.TESTRAIL_API_KEY,
});

const TESTRAIL_PROJECT_ID = 0;

async function verifySuccessfulLogin() {
  let sucessfullLogin = true;
  await testrail.getRuns(TESTRAIL_PROJECT_ID).catch((error) => {
    if (error.response.statusCode === 401) {
      console.error('TestRail authentication failed. Please check that the TESTRAIL_API_KEY variable in the .env file is valid.');
      sucessfullLogin = false;
    }
  });
  return sucessfullLogin;
}

async function verifyValidData() {
  return process.env.TESTRAIL_UPDATE_RESULTS === 'true' && verifySuccessfulLogin();
}

async function getCurrentTestRuns() {
  const currentTestRuns = await testrail
    .getRuns(TESTRAIL_PROJECT_ID, { is_completed: 0 })
    .then((result) => result.body);
  return currentTestRuns[0];
}

async function getCurrentTest(testId) {
  const currentRun = await getCurrentTestRuns();
  const allTestCases = await testrail
    .getTests(currentRun.id)
    .then((result) => result.body);
  const currentTestCase = allTestCases.find((testCase) => testCase.case_id === testId);
  return currentTestCase;
}

async function updateTestCase({ testId, status } = {}) {
  if (await verifyValidData()) {
    const currentTestCase = await getCurrentTest(testId);
    await testrail.addResult(currentTestCase.id, { status_id: status, comment: 'Test case executed by automation e2e suite.' });
  }
}
export default {
  updateTestCase,
};
