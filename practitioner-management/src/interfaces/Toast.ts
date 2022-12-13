export interface Toast {
  id: ReturnType<typeof setTimeout>;
  title: string;
  description: string;
  backgroundColor: string;
  icon: any;
}