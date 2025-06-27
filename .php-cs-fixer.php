<?php

$finder = PhpCsFixer\Finder::create()
    ->in(__DIR__ . '/app')
    ->in(__DIR__ . '/routes')
    ->in(__DIR__ . '/config')
    ->in(__DIR__ . '/database')
    ->in(__DIR__ . '/tests')
    ->notPath('cache');

return (new PhpCsFixer\Config())
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR12' => true, // PSR-12規約に準拠
        'trailing_comma_in_multiline' => ['elements' => ['arrays', 'arguments']], // 配列や関数の引数の末尾にカンマ
        'array_syntax' => ['syntax' => 'short'], // `array()` を `[]` に統一
        'no_unused_imports' => true, // 未使用の `use` を削除
        'single_quote' => true, // 文字列をシングルクォートに統一
        'declare_strict_types' => true, // `declare(strict_types=1);` を追加
        'no_extra_blank_lines' => true, // 余分な空行を削除
        'semicolon_after_instruction' => true, // `;` を自動追加
        'binary_operator_spaces' => [
            'default' => 'align_single_space_minimal', // `=>` を揃える
            'operators' => ['=>' => 'align_single_space']
        ],
        'array_indentation' => true, // 配列のインデントを適正化
    ])
    ->setFinder($finder);
