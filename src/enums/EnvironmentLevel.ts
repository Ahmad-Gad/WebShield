enum EnvironmentLevel {
  none = 0,
  local = 1,
  development = 2,
  test = 4,
  uat = 8,
  preprod = 16,
  production = 32
};

export default EnvironmentLevel;