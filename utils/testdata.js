const testdata = {
  user: {
    username: 'Admin',
    password: 'admin123',
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
