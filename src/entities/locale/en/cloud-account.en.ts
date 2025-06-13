export const cloudAccountEn = {
  label: {
    clientId: 'Client account ID',
    tenantId: 'Tenant ID',
    clientSecret: 'Client Secret',
    subscriptionId: 'Subscription ID',
    awsRegion: 'Region',
    token: 'Access Token',
    fileUrl: 'File URL',
    awsAccessKeyId: 'AWS Access Key ID',
    awsSecretAccessKey: 'AWS Secret Access Key',
    name: 'Account Label',
    provider: 'Cloud Account Provider',
  },
  placeholder: {
    awsRegion: 'Enter Geographical location of infrastructure',
    clientId: 'Enter Account ID',
    tenantId: 'Enter Azure AD tenant ID',
    clientSecret: 'Enter Service Key',
    subscriptionId: 'Enter Subscription ID',
    token: 'Enter Unique Token',
    fileUrl: 'File URL',
    awsAccessKeyId: 'Enter Unique Keys',
    awsSecretAccessKey: 'Enter Unique Keys',
    name: 'dev-aws-account',
    provider: 'Select cloud provider',
  },
  button: {
    submit: 'Connect',
  },
  or: 'OR',
  status: {
    CONNECTED: 'Connected',
    PENDING: 'Pending',
    PERMISSION_ISSUE: 'Permission Issue',
    INTEGRATION_ISSUE: 'Integration Issue',
    RESCAN: 'Rescan',
  },

  gcpFormInfo: {
    label: 'Account Label',
    placeholder: 'E.g. New-dev-account',
    billingLabel: 'Billing Dataset (optional)',
    billingPlaceholder: 'Enter Dataset',
    accountText: 'Service Account Key',
  },
  awsConsoleFormInfo: {
    title: 'IAM Role set-up',
    accountText:
      'To grant Costimizer read access, create an IAM Role with the appropriate trust relationship and inline policy.',
  },

  roleLabel: 'Using IAM Role',
  credentialLabel: 'Using credentials',
}
