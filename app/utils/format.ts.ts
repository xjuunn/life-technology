/**
 * 将数字格式化为中文单位（个、万、亿）
 * @param value 输入数字
 * @param digits 保留小数位（默认 2）
 */
export function formatChineseNumber(
  value: number | bigint,
  digits: number = 2
): string {
  // 转换为 BigInt 处理大整数
  const num = typeof value === "bigint" ? value : BigInt(Math.floor(value));

  const UNITS = [
    { unit: "亿", value: 100000000n },
    { unit: "万", value: 10000n },
  ];

  for (const { unit, value: base } of UNITS) {
    if (num >= base) {
      const main = Number(num) / Number(base);
      return `${main.toFixed(digits)} ${unit}`;
    }
  }

  // 不到 1 万的直接输出
  return num.toString();
}


import type { ClassValue } from "clsx"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并多个 CSS class，并自动处理 Tailwind CSS 类名冲突。
 *
 * 该函数结合了 `clsx` 与 `tailwind-merge`：
 * - `clsx()` 用于将字符串、数组、对象等多种格式的 class 输入规范化。
 * - `twMerge()` 用于自动合并并去除互相冲突的 Tailwind 工具类。
 *
 * @param inputs - 需要合并的类名列表，可以是字符串、数组或对象等 clsx 支持的类型。
 * @returns 合并并去重后的最终 class 字符串。
 *
 * @example
 * cn("p-2", "p-4") // "p-4"
 *
 * @example
 * cn("bg-red-500", condition && "bg-blue-500") // "bg-blue-500"
 *
 * @example
 * cn("btn", ["btn-primary", { active: isActive }])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
