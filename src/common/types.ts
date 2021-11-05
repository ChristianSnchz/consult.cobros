export interface RootRouterLocation {
  pathname: string;
  state?: {
    rootPath: string;
    microfrontPath: string;
    requestedPath: string;
  };
}
