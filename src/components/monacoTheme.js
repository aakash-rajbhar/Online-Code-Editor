export const defineNeutralDarkTheme = (monaco) => {
  monaco.editor.defineTheme('neutral-dark', {
    base: 'vs-dark',
    inherit: true,

    colors: {
      'editor.background': '#111111',
      'editor.foreground': '#D4D4D4',

      'editorCursor.foreground': '#E5E5E5',

      'editorLineNumber.foreground': '#525252',
      'editorLineNumber.activeForeground': '#A3A3A3',

      'editor.lineHighlightBackground': '#171717',
      'editor.lineHighlightBorder': '#1F1F1F',

      'editor.selectionBackground': '#404040',
      'editor.inactiveSelectionBackground': '#292929',

      'editorIndentGuide.background1': '#1F1F1F',
      'editorIndentGuide.activeBackground1': '#404040',

      'editorGutter.background': '#111111',

      'minimap.background': '#0D0D0D',

      'scrollbarSlider.background': '#3A3A3A',
      'scrollbarSlider.hoverBackground': '#525252',
      'scrollbarSlider.activeBackground': '#666666',
    },

    rules: [
      { token: '', foreground: 'D4D4D4' },
      { token: 'comment', foreground: '737373', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'C084FC' },
      { token: 'string', foreground: 'A3E635' },
      { token: 'number', foreground: 'FBBF24' },
      { token: 'constant', foreground: 'FBBF24' },
      { token: 'entity.name.function', foreground: '60A5FA' },
      { token: 'support.function', foreground: '60A5FA' },
      { token: 'entity.name.type', foreground: '67E8F9' },
      { token: 'entity.name.class', foreground: '67E8F9' },
      { token: 'variable.parameter', foreground: 'FDBA74' },
      { token: 'tag', foreground: 'F472B6' },
      { token: 'attribute.name', foreground: '60A5FA' },
    ],
  });
};
