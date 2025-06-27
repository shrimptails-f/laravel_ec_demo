import * as tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettier from 'eslint-plugin-prettier';

export default [
    {
        ignores: ['node_modules', 'dist', 'build', 'public'], // 無視するフォルダ
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'], // ESLint を適用するファイル
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            parser: tsParser, // TypeScript 用のパーサーを設定
        },
        plugins: {
            react,
            import: importPlugin,
            prettier: prettier,
            '@typescript-eslint': tseslint,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
        },
        settings: {
            react: {
                version: 'detect', // 自動で React のバージョンを検出
            },
            'import/resolver': {
                typescript: {}, // TypeScript のパス解決をサポート
            },
        },
        rules: {
            ...tseslint.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...importPlugin.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            'prettier/prettier': 'error',
            'no-restricted-imports': ['error', { patterns: ['./', '../'] }], // 相対パスの import を制限
            'no-console': 'warn', // console.log の使用を警告
            'no-debugger': 'warn', // debugger の使用を警告
            'prefer-const': 'error', // 変更しない変数は `const` を強制
            'react/react-in-jsx-scope': 'off', // Next.js なら `import React` 不要
            'react-hooks/rules-of-hooks': 'error', // Hooks のルール違反をエラーに
            'react-hooks/exhaustive-deps': 'warn', // `useEffect` の依存配列を適切に
            'react/prop-types': 'off',
        },
    },
];
