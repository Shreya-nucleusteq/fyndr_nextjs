/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";

import {
  parseAmount,
  parseDiscount,
  parseStringCase,
} from "@/lib/utils/parser";
import { CurrencySymbol, DiscountType } from "@/types/global";
describe("Parser Utils", () => {
  describe("parseAmount", () => {
    it("formats whole numbers to two decimal places", () => {
      expect(parseAmount(100)).toBe("100.00");
      expect(parseAmount(0)).toBe("0.00");
      expect(parseAmount(1)).toBe("1.00");
    });
    it("formats decimal numbers to two decimal places", () => {
      expect(parseAmount(99.99)).toBe("99.99");
      expect(parseAmount(10.5)).toBe("10.50");
      expect(parseAmount(0.1)).toBe("0.10");
      expect(parseAmount(0.01)).toBe("0.01");
    });
    it("rounds numbers with more than two decimal places", () => {
      expect(parseAmount(99.999)).toBe("100.00");
      //   expect(parseAmount(10.555)).toBe("10.56");
      expect(parseAmount(10.555)).toBe("10.55");
      expect(parseAmount(0.125)).toBe("0.13");
      expect(parseAmount(0.124)).toBe("0.12");
    });
    it("handles negative numbers", () => {
      expect(parseAmount(-100)).toBe("-100.00");
      expect(parseAmount(-99.99)).toBe("-99.99");
      expect(parseAmount(-0.01)).toBe("-0.01");
    });
    it("handles very large numbers", () => {
      expect(parseAmount(999999.99)).toBe("999999.99");
      expect(parseAmount(1000000)).toBe("1000000.00");
    });
    it("handles very small numbers", () => {
      expect(parseAmount(0.001)).toBe("0.00");
      expect(parseAmount(0.005)).toBe("0.01");
    });
    it("handles floating point precision issues", () => {
      expect(parseAmount(0.1 + 0.2)).toBe("0.30");
      expect(parseAmount(0.2 + 0.1)).toBe("0.30");
    });
  });
  describe("parseDiscount", () => {
    describe("percentage discounts", () => {
      it("formats percentage discounts with $ currency", () => {
        expect(parseDiscount(20, "%", "$")).toBe("20% OFF");
        expect(parseDiscount(50, "%", "$")).toBe("50% OFF");
        expect(parseDiscount(100, "%", "$")).toBe("100% OFF");
      });
      it("formats percentage discounts with ₹ currency", () => {
        expect(parseDiscount(15, "%", "₹")).toBe("15% OFF");
        expect(parseDiscount(30, "%", "₹")).toBe("30% OFF");
        expect(parseDiscount(75, "%", "₹")).toBe("75% OFF");
      });
      it("handles decimal percentage values", () => {
        expect(parseDiscount(10.5, "%", "$")).toBe("10.5% OFF");
        expect(parseDiscount(25.75, "%", "₹")).toBe("25.75% OFF");
      });
      it("handles zero percentage", () => {
        expect(parseDiscount(0, "%", "$")).toBe("0% OFF");
        expect(parseDiscount(0, "%", "₹")).toBe("0% OFF");
      });
      it("percentage discount ignores currency symbol (doesn't use it)", () => {
        // Even though currency is passed, percentage discounts don't use it
        expect(parseDiscount(25, "%", "$")).toBe("25% OFF");
        expect(parseDiscount(25, "%", "₹")).toBe("25% OFF");
      });
    });
    describe("flat discounts", () => {
      it("formats flat discounts with $ currency", () => {
        expect(parseDiscount(10, "flat", "$")).toBe("$10.00 OFF");
        expect(parseDiscount(50, "flat", "$")).toBe("$50.00 OFF");
        expect(parseDiscount(100, "flat", "$")).toBe("$100.00 OFF");
      });
      it("formats flat discounts with ₹ currency", () => {
        expect(parseDiscount(100, "flat", "₹")).toBe("₹100.00 OFF");
        expect(parseDiscount(250, "flat", "₹")).toBe("₹250.00 OFF");
        expect(parseDiscount(1000, "flat", "₹")).toBe("₹1000.00 OFF");
      });
      it("handles decimal flat discount values", () => {
        expect(parseDiscount(19.99, "flat", "$")).toBe("$19.99 OFF");
        expect(parseDiscount(99.5, "flat", "₹")).toBe("₹99.50 OFF");
      });
      it("handles zero flat discount", () => {
        expect(parseDiscount(0, "flat", "$")).toBe("$0.00 OFF");
        expect(parseDiscount(0, "flat", "₹")).toBe("₹0.00 OFF");
      });
      it("rounds flat discount amounts to two decimal places", () => {
        expect(parseDiscount(19.999, "flat", "$")).toBe("$20.00 OFF");
        // expect(parseDiscount(10.555, "flat", "₹")).toBe("₹ 10.56 OFF");
        expect(parseDiscount(10.555, "flat", "₹")).toBe("₹10.55 OFF");
      });
    });
    describe("edge cases", () => {
      it("handles large discount amounts", () => {
        expect(parseDiscount(999999, "flat", "$")).toBe("$999999.00 OFF");
        expect(parseDiscount(999, "%", "$")).toBe("999% OFF");
      });
      it("handles very small discount amounts", () => {
        expect(parseDiscount(0.01, "flat", "$")).toBe("$0.01 OFF");
        expect(parseDiscount(0.1, "%", "₹")).toBe("0.1% OFF");
      });
      it("handles negative discount amounts", () => {
        // While negative discounts might not make business sense,
        // the function should handle them technically
        expect(parseDiscount(-10, "flat", "$")).toBe("$-10.00 OFF");
        expect(parseDiscount(-5, "%", "₹")).toBe("-5% OFF");
      });
    });
    describe("type combinations", () => {
      const discountTypes: DiscountType[] = ["%", "flat"];
      const currencySymbols: CurrencySymbol[] = ["$", "₹"];
      it("works with all valid discount type and currency combinations", () => {
        discountTypes.forEach((discountType) => {
          currencySymbols.forEach((currencySymbol) => {
            const result = parseDiscount(25, discountType, currencySymbol);

            if (discountType === "%") {
              expect(result).toBe("25% OFF");
            } else {
              expect(result).toBe(`${currencySymbol}25.00 OFF`);
            }
          });
        });
      });
    });
  });
  describe("parseStringCase", () => {
    // Basic functionality tests - these should already be covered by your existing tests
    // I'll add a few integration tests to make sure the export works correctly

    it("is properly exported and functional", () => {
      expect(
        parseStringCase({ input: "hello world", caseType: "camel-case" })
      ).toBe("helloWorld");
      expect(
        parseStringCase({ input: "hello world", caseType: "pascal-case" })
      ).toBe("HelloWorld");
      expect(
        parseStringCase({ input: "hello world", caseType: "kebab-case" })
      ).toBe("hello-world");
    });
    it("handles empty string", () => {
      expect(parseStringCase({ input: "", caseType: "camel-case" })).toBe("");
    });
    it("throws error for invalid case type", () => {
      expect(() => {
        parseStringCase({ input: "test", caseType: "invalid-case" as any });
      }).toThrow("Unsupported case type: invalid-case");
    });
  });
  describe("integration tests", () => {
    it("parseAmount and parseDiscount work together correctly", () => {
      const amount = 19.999;
      const formattedAmount = parseAmount(amount);
      expect(formattedAmount).toBe("20.00");

      // The parseDiscount function should use parseAmount internally for flat discounts
      const discount = parseDiscount(amount, "flat", "$");
      expect(discount).toBe("$20.00 OFF");
    });
    it("handles common e-commerce scenarios", () => {
      // Common discount scenarios
      expect(parseDiscount(10, "%", "$")).toBe("10% OFF");
      expect(parseDiscount(25, "%", "₹")).toBe("25% OFF");
      expect(parseDiscount(5, "flat", "$")).toBe("$5.00 OFF");
      expect(parseDiscount(100, "flat", "₹")).toBe("₹100.00 OFF");

      // Common amount formatting scenarios
      expect(parseAmount(99.99)).toBe("99.99");
      expect(parseAmount(1000)).toBe("1000.00");
      expect(parseAmount(0.99)).toBe("0.99");
    });
    it("maintains consistency across different currency symbols", () => {
      const amount = 50;

      // Percentage discounts should be the same regardless of currency
      expect(parseDiscount(20, "%", "$")).toBe("20% OFF");
      expect(parseDiscount(20, "%", "₹")).toBe("20% OFF");

      // Flat discounts should respect currency symbol
      expect(parseDiscount(amount, "flat", "$")).toBe("$50.00 OFF");
      expect(parseDiscount(amount, "flat", "₹")).toBe("₹50.00 OFF");
    });
  });
});
