export function applyCustomTheme() {
    const primaryColor = '#463a3c';
    const secondaryColor = '#b9a5a6';
    const tertiaryColor = '#804f7b';
    const quaternaryColor = '#d97aa6';
    const prefix = 'gjs-';
    let cssString = '';

    [
        ['one', primaryColor],
        ['two', secondaryColor],
        ['three', tertiaryColor],
        ['four', quaternaryColor],
    ].forEach(([cnum, ccol]) => {
        cssString += `
      .${prefix}${cnum}-bg {
        background-color: ${ccol};
      }
      .${prefix}${cnum}-color {
        color: ${ccol};
      }
      .${prefix}${cnum}-color-h:hover {
        color: ${ccol};
      }
    `;
    });

    const style = document.createElement('style');
    style.innerText = cssString;
    document.head.appendChild(style);
}