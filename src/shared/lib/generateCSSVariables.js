import fs from 'fs';

// 1. Base tokens (실제 값)
const baseTokens = JSON.parse(fs.readFileSync('./baseTokens.json', 'utf-8'));

// 2. Semantic tokens (참조)
const semanticTokens = JSON.parse(fs.readFileSync('./semanticTokens.json', 'utf-8'));

// 변환 함수
function toKebab(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

// 참조 값을 실제 CSS 변수로 변환
function convertRef(value) {
  // "{Lime.99}" → "--lime-99"
  const inner = value.replace(/[{}]/g, '').trim(); // Lime.99
  const parts = inner.split('.');
  let refValue;

  // base token에서 실제 값 가져오기
  let cursor = baseTokens;
  for (const p of parts) {
    if (cursor[p] !== undefined) cursor = cursor[p];
    else {
      cursor = undefined;
      break;
    }
  }

  if (cursor?.value) {
    refValue = cursor.value;
  } else {
    console.warn(`참조를 찾을 수 없음: ${value}`);
    refValue = value; // fallback
  }

  return refValue;
}

// semantic tokens 순회
function traverse(obj, parent = []) {
  let result = [];

  for (const key in obj) {
    const value = obj[key];

    // leaf token: { value: "", type: "" }
    if (value?.value) {
      const cssName = `--${[...parent, key].map(toKebab).join('-')}`;
      const cssValue = convertRef(value.value);
      result.push(`${cssName}: ${cssValue};`);
    }

    // nested object
    else if (typeof value === 'object') {
      result = result.concat(traverse(value, [...parent, key]));
    }
  }

  return result;
}

const cssVars = traverse(semanticTokens);

// 최종 CSS 출력
const css = `:root {\n  ${cssVars.join('\n  ')}\n}`;

fs.writeFileSync('../../app/customTokens.css', css);
console.log('customTokens.css 생성 완료!');
