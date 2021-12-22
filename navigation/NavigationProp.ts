type NavigationProp = {
  goBack?: () => void;
  openDrawer?: () => void;
  navigate: (route: string) => void;
  setParams: ({ tabId }: { tabId: string }) => void;
};
export default NavigationProp;
