export interface Config {
  InstanceName: string;
  Users: UserConfig;
}

export interface UserConfig {
  AccountOptions: UserAccountOptions;
}

export interface UserAccountOptions {
  RequireEmail: boolean;
  AcceptEmail: boolean;
  RequirePhoneNumber: boolean;
  AcceptPhoneNumber: boolean;
}
