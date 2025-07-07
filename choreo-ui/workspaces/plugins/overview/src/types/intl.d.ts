// Type declaration to support formatRange method for react-intl compatibility
declare global {
  interface Intl {
    DateTimeFormat: {
      new (
        locales?: string | string[],
        options?: Intl.DateTimeFormatOptions,
      ): Intl.DateTimeFormat;
      formatRange(start: Date | number, end: Date | number): string;
    };
  }
}

declare module "intl" {
  interface DateTimeFormat {
    formatRange(start: Date | number, end: Date | number): string;
  }
}

export {};
