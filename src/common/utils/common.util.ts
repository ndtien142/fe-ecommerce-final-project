import dayjs from 'dayjs';

export function toQueryString(objParams: Object) {
  const str = [];
  for (const p in objParams) {
    if (
      Object.prototype.hasOwnProperty.call(objParams, p) &&
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      objParams[p]
    ) {
      str.push(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        decodeURIComponent(`${encodeURIComponent(p)}=${encodeURIComponent(objParams[p])}`)
      );
    }
  }

  return str.join('&');
}

export function toUrl(url: string, query: object) {
  return `${url}?${toQueryString(query)}`;
}

export function getMessError(message: string | string[]) {
  if (typeof message === 'string') {
    return message;
  }
  return message[0] || 'Lỗi không xác định!';
}

export function getUniqueArray(originArray: (string | number)[]) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [...new Set(originArray)];
}

export function formatDate(date?: string, format?: string) {
  return dayjs(date).format(format || 'DD/MM/YYYY HH:mm');
}

export function formatDateNoTime(date?: string, format?: string) {
  return dayjs(date).format(format || 'DD/MM/YYYY');
}

export function isValidURL(url: string) {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(url);
}

export function slugify(str: string) {
  // Vietnamese character mapping
  const vietnameseMap: { [key: string]: string } = {
    à: 'a',
    á: 'a',
    ạ: 'a',
    ả: 'a',
    ã: 'a',
    â: 'a',
    ầ: 'a',
    ấ: 'a',
    ậ: 'a',
    ẩ: 'a',
    ẫ: 'a',
    ă: 'a',
    ằ: 'a',
    ắ: 'a',
    ặ: 'a',
    ẳ: 'a',
    ẵ: 'a',
    è: 'e',
    é: 'e',
    ẹ: 'e',
    ẻ: 'e',
    ẽ: 'e',
    ê: 'e',
    ề: 'e',
    ế: 'e',
    ệ: 'e',
    ể: 'e',
    ễ: 'e',
    ì: 'i',
    í: 'i',
    ị: 'i',
    ỉ: 'i',
    ĩ: 'i',
    ò: 'o',
    ó: 'o',
    ọ: 'o',
    ỏ: 'o',
    õ: 'o',
    ô: 'o',
    ồ: 'o',
    ố: 'o',
    ộ: 'o',
    ổ: 'o',
    ỗ: 'o',
    ơ: 'o',
    ờ: 'o',
    ớ: 'o',
    ợ: 'o',
    ở: 'o',
    ỡ: 'o',
    ù: 'u',
    ú: 'u',
    ụ: 'u',
    ủ: 'u',
    ũ: 'u',
    ư: 'u',
    ừ: 'u',
    ứ: 'u',
    ự: 'u',
    ử: 'u',
    ữ: 'u',
    ỳ: 'y',
    ý: 'y',
    ỵ: 'y',
    ỷ: 'y',
    ỹ: 'y',
    đ: 'd',
    À: 'a',
    Á: 'a',
    Ạ: 'a',
    Ả: 'a',
    Ã: 'a',
    Â: 'a',
    Ầ: 'a',
    Ấ: 'a',
    Ậ: 'a',
    Ẩ: 'a',
    Ẫ: 'a',
    Ă: 'a',
    Ằ: 'a',
    Ắ: 'a',
    Ặ: 'a',
    Ẳ: 'a',
    Ẵ: 'a',
    È: 'e',
    É: 'e',
    Ẹ: 'e',
    Ẻ: 'e',
    Ẽ: 'e',
    Ê: 'e',
    Ề: 'e',
    Ế: 'e',
    Ệ: 'e',
    Ể: 'e',
    Ễ: 'e',
    Ì: 'i',
    Í: 'i',
    Ị: 'i',
    Ỉ: 'i',
    Ĩ: 'i',
    Ò: 'o',
    Ó: 'o',
    Ọ: 'o',
    Ỏ: 'o',
    Õ: 'o',
    Ô: 'o',
    Ồ: 'o',
    Ố: 'o',
    Ộ: 'o',
    Ổ: 'o',
    Ỗ: 'o',
    Ơ: 'o',
    Ờ: 'o',
    Ớ: 'o',
    Ợ: 'o',
    Ở: 'o',
    Ỡ: 'o',
    Ù: 'u',
    Ú: 'u',
    Ụ: 'u',
    Ủ: 'u',
    Ũ: 'u',
    Ư: 'u',
    Ừ: 'u',
    Ứ: 'u',
    Ự: 'u',
    Ử: 'u',
    Ữ: 'u',
    Ỳ: 'y',
    Ý: 'y',
    Ỵ: 'y',
    Ỷ: 'y',
    Ỹ: 'y',
    Đ: 'd',
  };

  return (
    str
      .toLowerCase()
      // Replace Vietnamese characters
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      // Replace any remaining special characters with their mapped values
      .split('')
      .map((char) => vietnameseMap[char] || char)
      .join('')
      // Replace non-alphanumeric characters with hyphens
      .replace(/[^a-z0-9]+/g, '-')
      // Remove leading and trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Collapse multiple consecutive hyphens
      .replace(/-+/g, '-')
  );
}
