const testdata = {
  user: {
    username: process.env.APP_USERNAME,
    password: process.env.APP_PASSWORD,
    invalidPassword: '123456',
    employeeName: 'Paul Collings',
  },
  roles: {
    ess: 'ESS',
    admin: 'Admin',
  },
  statuses: {
    enabled: 'Enabled',
    disabled: 'Disabled',
  },
  errorMessages: {
    emptyUsername: 'Username cannot be empty',
    emptyPassword: 'Password cannot be empty',
    invalidCredentials: 'Invalid credentials',
  },
};

export default testdata;
