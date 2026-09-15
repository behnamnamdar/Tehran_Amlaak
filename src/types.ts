export type ScreenType = 'welcome' | 'calculator' | 'features';

export type CalculationTab = 'mortgage_rent' | 'sale';

export interface MortgageRentCalculation {
  mortgageAmount: number;
  rentAmount: number;
  commissionFee: number;
  vatTax: number;
  totalPayable: number;
}

export interface SaleCalculation {
  propertyPrice: number;
  commissionFee: number;
  vatTax: number;
  totalPayable: number;
}
