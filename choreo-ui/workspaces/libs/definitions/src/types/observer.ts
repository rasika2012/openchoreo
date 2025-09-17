export interface ComponentObserver {
  observerUrl?: string;
  connectionMethod?: ObserverConnectionMethod;
  message?: string;
}

export interface ObserverConnectionMethod {
  type?: string;
  username?: string;
  password?: string;
  bearerToken?: string;
}
