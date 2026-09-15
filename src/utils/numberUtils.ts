/**
 * Number utilities for Persian digits, formatting, and calculation
 */

// Persian digits
const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

/**
 * Converts Persian and Arabic digits to standard English digits and strips non-numeric characters.
 */
export function cleanDigits(input: string): string {
  let cleaned = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const persianIndex = persianDigits.indexOf(char);
    if (persianIndex !== -1) {
      cleaned += persianIndex.toString();
      continue;
    }
    const arabicIndex = arabicDigits.indexOf(char);
    if (arabicIndex !== -1) {
      cleaned += arabicIndex.toString();
      continue;
    }
    if (char >= '0' && char <= '9') {
      cleaned += char;
    }
  }
  return cleaned;
}

/**
 * Formats a raw digit string or number with thousands comma separators.
 * e.g. "1500000" -> "1,500,000"
 */
export function formatThousands(value: string | number): string {
  if (value === '' || value === null || value === undefined) return '';
  const str = typeof value === 'number' ? Math.round(value).toString() : cleanDigits(value);
  if (!str) return '';
  return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Parses cleaned digits to integer number.
 */
export function parseNumber(text: string): number {
  const digits = cleanDigits(text);
  if (!digits) return 0;
  const num = parseInt(digits, 10);
  return isNaN(num) ? 0 : num;
}

/**
 * Converts number or digit string to Persian digits with thousands separators.
 */
export function toPersianDigits(value: string | number): string {
  const formatted = formatThousands(value);
  return formatted.replace(/\d/g, (d) => persianDigits[parseInt(d, 10)]);
}

/**
 * Helper to display Persian currency words (تومان به حروف)
 */
export function numberToWordsPersian(num: number): string {
  if (!num || num <= 0) return '';
  
  const units = ['', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه'];
  const teens = ['ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده'];
  const tens = ['', '', 'بیست', 'سی', 'چهل', 'پنجاه', 'شصت', 'هفتاد', 'هشتاد', 'نود'];
  const hundreds = ['', 'صد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد'];
  const scales = ['', 'هزار', 'میلیون', 'میلیارد', 'تریلیون'];

  function convertChunk(n: number): string {
    const parts: string[] = [];
    const h = Math.floor(n / 100);
    const remainder = n % 100;
    const t = Math.floor(remainder / 10);
    const u = remainder % 10;

    if (h > 0) parts.push(hundreds[h]);

    if (remainder >= 10 && remainder <= 19) {
      parts.push(teens[remainder - 10]);
    } else {
      if (t > 0) parts.push(tens[t]);
      if (u > 0) parts.push(units[u]);
    }

    return parts.join(' و ');
  }

  const chunks: string[] = [];
  let temp = num;
  let scaleIndex = 0;

  while (temp > 0 && scaleIndex < scales.length) {
    const chunk = temp % 1000;
    if (chunk > 0) {
      const chunkStr = convertChunk(chunk);
      const scaleStr = scales[scaleIndex];
      chunks.unshift(scaleStr ? `${chunkStr} ${scaleStr}` : chunkStr);
    }
    temp = Math.floor(temp / 1000);
    scaleIndex++;
  }

  return chunks.join(' و ') + ' تومان';
}
