export const combineProviders = (...providers) => ({ children }) => providers.reduceRight(
  (kids, Parent) => <Parent>{kids}</Parent>,
  children,
);
