export interface Screen {
  key: number;
  node: React.ReactNode;
}

export interface BottomSheetNavigationContextType {
  stack: Screen[];
  push: (node: React.ReactNode) => void;
  pop: () => void;
}
