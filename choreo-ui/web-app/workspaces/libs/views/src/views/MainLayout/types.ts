export interface MenuItem {
  label: string;
  icon: React.ReactNode;
  filledIcon?: React.ReactNode;
}

export interface MainMenuItem extends MenuItem {
  path: string;
  id: string;
}
