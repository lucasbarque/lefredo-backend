export const slugify = (str: string, forDisplayingInput?: boolean) => {
  if (!str) {
    return '';
  }

  const s = str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both sides
    .normalize('NFD') // Normalize to decomposed form for handling accents
    .replace(/\p{Diacritic}/gu, '') // Remove any diacritics (accents) from characters
    .replace(/[^.\p{L}\p{N}\p{Zs}\p{Emoji}]+/gu, '-') // Replace any non-alphanumeric characters (including Unicode and except "." period) with a dash
    .replace(/[\s_#]+/g, '-') // Replace whitespace, # and underscores with a single dash
    .replace(/^-+/, '') // Remove dashes from start
    .replace(/\.{2,}/g, '.') // Replace consecutive periods with a single period
    .replace(/^\.+/, '') // Remove periods from the start
    .replace(
      /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
      '',
    ) // Removes emojis
    .replace(/\s+/g, ' ')
    .replace(/-+/g, '-'); // Replace consecutive dashes with a single dash

  return forDisplayingInput ? s : s.replace(/-+$/, '').replace(/\.*$/, ''); // Remove dashes and period from end
};

export const formatCurrency = (
  amount: number | string,
  type: 'to-real' | 'to-decimal',
): string => {
  switch (type) {
    case 'to-real': {
      const numericValue = Number(amount);
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      }).format(numericValue);
    }

    case 'to-decimal': {
      const stringValue = String(amount);
      const normalizedValue = stringValue.replace(/\./g, '').replace(',', '.');
      const numericValue1 = parseFloat(normalizedValue);
      const valueInCents = Math.round(numericValue1);
      return String(valueInCents);
    }

    default: {
      throw new Error(`Tipo de formatação inválido: ${String(type)}`);
    }
  }
};
