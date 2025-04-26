export function kebabToPascalCase(kebabString: string): string {
  return kebabString
    .split('-') // 按横杠分割成数组 ["chart", "no", "axes", "column"]
    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // 每个单词首字母大写
    .join(''); // 合并成字符串
}
