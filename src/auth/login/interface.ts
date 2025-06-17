import { IUser } from 'src/common/@types/user/user.interface';

export type IAuth = {
  username: string;
  password: string;
};

export type ILoginCallback = {
  onSuccess: VoidFunction;
  onError: (message: string) => void;
};

export type FormValuesProps = {
  email: string;
};

export type IForgotPassword = {
  email: string;
};

export interface IResForgotPass {
  meta: {
    status: number;
    msg: string;
  };
  response: boolean;
}

export interface IResLogin {
  data: {
    metadata: {
      code: number;
      tokens: {
        accessToken: string;
        refreshToken: string;
      };
      user: IUser;
    };
  };
}

export interface IResInfo {
  message: string;
  status: number;
  metadata: {
    code: number;
    user: {
      userCode: string;
      username: string;
      role: string;
      isActive: boolean;
      isBlock: boolean;
    };
  };
}

export interface IGroupPoliciesRes {
  metadata: {
    policies: string[];
  };
}
export interface IUserLogin {
  id: number;
  type: string;
  groupPolicies: IGroupPolicies[];
}

export interface IGroupPolicies {
  id: number;
  name: string;
  key: string;
  description: string;
  userId: number;
  createdAt: string;
  status: string;
  type: string;
  policies: IPolicies[];
}

export interface IPolicies {
  id: number;
  name: string;
  action: DEFAULT_ACTION;
  resource: DEFAULT_SUBJECT;
  actionAbility: string;
}

export type DEFAULT_ACTION = 'manage' | 'create' | 'read' | 'update' | 'delete';

export type DEFAULT_SUBJECT =
  | 'all'
  | 'admin'
  | 'merchant'
  | 'customer'
  | 'group_policy'
  | 'gift'
  | 'event'
  | 'event_code'
  | 'product'
  | 'file_request'
  | 'user_request_download'
  | 'cron_job'
  | 'agent'
  | 'cart'
  | 'order'
  | 'category'
  | 'tag'
  | 'survey'
  | 'system_config'
  | 'secret'
  | 'system_config_point'
  | 'add_point_code'
  | 'export'
  | 'tier_config';

export interface IRules {
  action: string;
  resource: string;
  name: string;
  id: number;
  actionAbility: string;
}
