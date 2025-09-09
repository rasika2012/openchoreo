export interface ApplyResourceResponse {
  apiVersion?: string;
  kind?: string;
  name?: string;
  namespace?: string;
  operation?: "created" | "updated" | "unchanged";
}

export interface DeleteResourceResponse {
  apiVersion?: string;
  kind?: string;
  name?: string;
  namespace?: string;
  operation?: "deleted" | "not_found";
}
