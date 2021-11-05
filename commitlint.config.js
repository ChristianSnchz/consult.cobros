module.exports = {
  plugins: ['commitlint-plugin-jira-rules'],
  extends: ['jira'],
  rules: {
    'body-leading-blank': [1, 'always'],
    'footer-leading-blank': [1, 'always'],
    'header-max-length': [2, 'always', 72],
    'body-max-line-length': [2, 'always', 80],
    'footer-max-line-length': [2, 'always', 80],
    'scope-case': [2, 'always', 'camel-case'],
    'subject-full-stop': [2, 'never', '.'],
    'type-case': [2, 'always', 'lower-case'],
    'jira-task-id-project-key': [2, 'always', 'COBEMP'],
    'jira-task-id-max-length': [1, 'always', 10],
    'jira-task-id-min-length': [1, 'always', 8]
  }
};
