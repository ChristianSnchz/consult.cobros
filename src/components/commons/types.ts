export interface ExampleStore {
  error: boolean;
  fetching: boolean;
  ready: boolean;
}

export interface AppStore {
  example: ExampleStore;
}

export interface RootRouterLocation {
  pathname: string;
  hash: string;
  state?: {
    rootPath: string;
    microfrontPath: string;
    requestedPath: string;
  };
}
