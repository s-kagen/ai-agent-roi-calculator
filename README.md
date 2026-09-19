# AI Agent ROI Calculator

Power Apps Code Appsで作成した、AIエージェント導入時の投資対効果を試算するシンプルなWebアプリです。

現在の作業時間、AIエージェント導入後の作業時間、月間処理件数、人件費、導入費用などを入力すると、年間削減時間、年間削減額、初年度ROI、投資回収期間を自動計算します。

Microsoft Learnの「Forecast the Return on Investment (ROI) of AI Agents」を参考に、GitHub Codespaces、React、TypeScriptを使用して作成しました。

## スクリーンショット

<!--
リポジトリ内に docs/images/app-overview.png を配置した場合は、
次のコメントを解除してください。
-->

<!--
![AI Agent ROI Calculatorの画面](docs/# 主な機能

- 1件当たりの削減時間を計算
- 月間および年間の削減時間を計算
- 削減時間を人件費相当額へ換算
- 初年度コストを計算
- 初年度純効果を計算
- 初年度ROIを計算
- 投資回収期間を計算
- ROIに基づく簡易的なAI導入判定を表示
- 入力値の変更に応じて結果を即時更新
- PC、タブレット、スマートフォンに対応したレスポンシブ表示

## アプリの入力項目

| 入力項目 | 説明 |
|---|---|
| 現在の1件当たり作業時間 | AIエージェント導入前の作業時間を分単位で入力します |
| 導入後の1件当たり作業時間 | AIエージェント導入後に見込まれる作業時間を分単位で入力します |
| 月間処理件数 | 対象業務を1カ月に処理する件数を入力します |
| 担当者の時間単価 | 対象業務を担当する従業員の時間単価を入力します |
| 初期導入費用 | 開発、設計、データ準備などの初期費用を入力します |
| 年間運用費用 | ライセンス、AIサービス、保守、改善などの年間費用を入力します |

## アプリの出力項目

| 出力項目 | 説明 |
|---|---|
| 1件当たり削減時間 | 導入前後の作業時間の差です |
| 月間削減時間 | 1件当たり削減時間と月間処理件数から算出します |
| 年間削減時間 | 月間削減時間を12カ月分に換算します |
| 年間削減額 | 年間削減時間を人件費相当額に換算します |
| 初年度コスト | 初期導入費用と年間運用費用の合計です |
| 初年度純効果 | 年間削減額から初年度コストを差し引いた値です |
| 初年度ROI | 初年度コストに対する純効果の割合です |
| 投資回収期間 | 初年度コストを月間削減額で回収するまでの期間です |

## 計算式

### 1件当たり削減時間

```text
1件当たり削減時間
= 現在の作業時間 - 導入後の作業時間
```

計算結果がマイナスになる場合は、0分として扱います。

### 月間削減時間

```text
月間削減時間
= 1件当たり削減時間 × 月間処理件数 ÷ 60
```

### 年間削減時間

```text
年間削減時間
= 月間削減時間 × 12
```

### 年間削減額

```text
年間削減額
= 年間削減時間 × 時間単価
```

### 初年度コスト

```text
初年度コスト
= 初期導入費用 + 年間運用費用
```

### 初年度純効果

```text
初年度純効果
= 年間削減額 - 初年度コスト
```

### 初年度ROI

```text
初年度ROI（%）
=（年間削減額 - 初年度コスト）
  ÷ 初年度コスト
  × 100
```

初年度コストが0円の場合、ROIは算出不可として表示します。

### 投資回収期間

```text
投資回収期間（月）
= 初年度コスト ÷ 月間削減額
```

月間削減額が0円の場合、投資回収期間は算出不可として表示します。

## 初期値による計算例

アプリには、動作確認用として次の初期値を設定しています。

| 項目 | 初期値 |
|---|---:|
| 現在の作業時間 | 15分 |
| 導入後の作業時間 | 3分 |
| 月間処理件数 | 3,000件 |
| 担当者の時間単価 | 4,000円 |
| 初期導入費用 | 5,000,000円 |
| 年間運用費用 | 3,000,000円 |

この条件では、次の結果になります。

| 結果 | 試算値 |
|---|---:|
| 1件当たり削減時間 | 12分 |
| 月間削減時間 | 600時間 |
| 年間削減時間 | 7,200時間 |
| 年間削減額 | 28,800,000円 |
| 初年度コスト | 8,000,000円 |
| 初年度純効果 | 20,800,000円 |
| 初年度ROI | 260% |
| 投資回収期間 | 約3.3カ月 |

## 使用技術

- Power Apps Code Apps
- React
- TypeScript
- Vite
- CSS
- Power Apps CLI
- GitHub Codespaces
- GitHub

## 前提条件

このアプリを開発、実行、公開するには、次の環境が必要です。

### GitHub

- GitHubアカウント
- GitHub Codespacesを利用できること

### Power Platform

- Power Platform環境
- 対象環境でPower Apps Code Appsが有効になっていること
- 対象環境でアプリを作成できる権限
- 必要なPower Appsライセンス

### 開発ツール

- Node.js LTS
- npm
- Git
- Power Apps CLI

## GitHub Codespacesでの実行手順

### 1. リポジトリを開く

GitHubでこのリポジトリを開きます。

### 2. Codespaceを作成する

GitHubのリポジトリ画面で、次の順番に選択します。

1. `Code`
2. `Codespaces`
3. `Create codespace on main`

### 3. プロジェクトフォルダーへ移動する

プロジェクトがサブフォルダーに配置されている場合は、対象フォルダーへ移動します。

```bash
cd ai-agent-roi-app
```

リポジトリのルートに`package.json`がある場合、この操作は不要です。

### 4. 依存パッケージをインストールする

```bash
npm install
```

### 5. TypeScriptを確認する

```bash
npx tsc --noEmit
```

エラーが表示されずに終了すれば、型チェックは成功です。

### 6. アプリをビルドする

```bash
npm run build
```

### 7. Code Appを実行する

```bash
pa app run
```

ターミナルに表示される`Local Play`のURLを開きます。

GitHub Codespacesでポートが自動転送されない場合は、画面下部の`PORTS`タブを開き、表示されたポート番号を手動で追加してください。

## Power Appsへの公開手順

最初に、公開対象の最新コードをビルドします。

```bash
npm run build
```

続いて、Power Appsへ公開します。

```bash
pa app push
```

公開に成功すると、Power Appsでアプリを実行するためのURLが表示されます。

公開後は、Power Appsのアプリ一覧からアプリの実行、詳細確認、共有を行います。

## Power Apps CLIが未導入の場合

Power Apps CLIをグローバルインストールします。

```bash
npm install --global @microsoft/power-apps-cli
npm install --global @microsoft/power-apps
```

インストール結果を確認します。

```bash
pa --version
pa app --help
```

## Code Appを新規作成する場合

Microsoftが提供するViteテンプレートから、新しいプロジェクトを作成できます。

```bash
npx degit github:microsoft/PowerAppsCodeApps/templates/vite ai-agent-roi-app
cd ai-agent-roi-app
npm install
```

Code Appを初期化します。

```bash
pa app init
```

環境IDを指定する場合は、次の形式で実行します。

```bash
pa app init \
  --display-name "AI Agent ROI Calculator" \
  --environment-id "<Environment ID>"
```

`<Environment ID>`は、実際に使用するPower Platform環境のIDに置き換えてください。

## プロジェクト構成

代表的なファイルは次のとおりです。

```text
ai-agent-roi-app/
├── public/
├── src/
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

### `src/App.tsx`

次の処理を実装しています。

- 入力値の状態管理
- ROIなどの計算ロジック
- 入力フィールド
- 試算結果カード
- AI導入判定
- 入力値のリセット
- 0除算への対応
- 日本円および数値の書式設定

### `src/App.css`

次のスタイルを実装しています。

- アプリ全体のレイアウト
- 入力パネル
- 結果カード
- AI導入判定
- 警告メッセージ
- レスポンシブ表示

### `src/index.css`

HTMLと`body`要素に対する最小限の共通スタイルを定義しています。

## 入力値に関する制御

### 導入後の時間が現在の時間より長い場合

削減時間がマイナスにならないよう、0分として計算します。

画面には、入力条件を確認するための警告を表示します。

### 初年度コストが0円の場合

ROIの計算では初年度コストを分母に使用するため、0円の場合は`算出不可`と表示します。

### 月間削減額が0円の場合

投資回収期間を計算できないため、`算出不可`と表示します。

## AI導入判定

計算されたROIをもとに、簡易的な判定を表示します。

| ROI | 判定 |
|---:|---|
| 200%以上 | 高い投資効果 |
| 100%以上、200%未満 | 投資候補 |
| 0%以上、100%未満 | 条件を精査 |
| 0%未満 | 再検討 |
| 算出不可 | 評価対象外 |

この判定はサンプルアプリ独自の簡易的な表示です。正式な投資基準ではありません。

## 開発時によく使用するコマンド

### 依存パッケージのインストール

```bash
npm install
```

### TypeScriptの型チェック

```bash
npx tsc --noEmit
```

### ビルド

```bash
npm run build
```

### Code Appのローカル実行

```bash
pa app run
```

### Power Appsへの公開

```bash
pa app push
```

### Gitの状態確認

```bash
git status
```

### 変更内容のコミット

```bash
git add .
git commit -m "Update AI Agent ROI Calculator"
git push
```

## 今回実装していない機能

このリポジトリは、Power Apps Code Appsを短時間で体験するためのMVPです。

次の機能は実装していません。

- NPVの計算
- 割引率の設定
- 複数年度のキャッシュフロー
- 感度分析
- 利用率や定着率の変動
- Dataverseへの保存
- 複数案件の比較
- Copilot Studioの実績値取得
- Power BIとの連携
- PDFやWordへのレポート出力

## 今後の拡張案

- 複数年のROIを計算する
- NPVを計算する
- 利用率別の感度分析を追加する
- グラフで効果とコストを比較する
- Dataverseへ試算結果を保存する
- AIエージェント案件を一覧管理する
- Copilot Studioの実績データと連携する
- ROIレポートを出力する
- 複数言語および複数通貨に対応する

## 注意事項

このアプリが表示する結果は、入力値に基づく簡易シミュレーションです。

年間削減額は、削減された作業時間を人件費相当額へ換算した値であり、同額の現金支出削減を保証するものではありません。

実際の投資判断では、必要に応じて次の要素も考慮してください。

- 実際の利用率
- 利用者への定着率
- AIエージェントの回答品質
- 人による確認や修正に必要な時間
- 導入後の保守および改善費用
- セキュリティとガバナンス
- 法務、税務、会計上の扱い
- 定量化しにくい戦略的価値
- 導入に伴うリスク

本アプリは、学習、技術検証、概算試算を目的としたサンプルです。

## 解説記事

開発手順の詳細は、次のnote記事で解説しています。

<!-- 公開後、次のURLを実際のnote記事URLへ置き換えてください。 -->

NOTE_ARTICLE_URL

## 参考資料

- [Power Apps Code Appsの概要](https://learn.microsoft.com/ja-jp/power-apps/developer/code-apps/overview)
- [Power Apps Code Appsのドキュメント](https://learn.microsoft.com/ja-jp/power-apps/developer/code-apps/)
- [Power Apps CLIを使用してCode Appを作成する](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)
- [AIエージェントのROIを予測する](https://learn.microsoft.com/en-us/training/modules/forecast-agent-return-investment/)
- [GitHub Codespacesでポートを転送する](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)

## License

このサンプルを公開する場合は、リポジトリの利用方針に合わせてライセンスを設定してください。

MIT Licenseを使用する場合は、リポジトリに`LICENSE`ファイルを追加し、このセクションを次のように変更できます。

```text
This project is licensed under the MIT License.
See the LICENSE file for details.
```

## Disclaimer

このリポジトリは学習および技術検証を目的としたサンプルです。

Microsoft Corporationによる公式製品または公式リポジトリではありません。製品の仕様、コマンド、ライセンス要件、利用条件は変更される可能性があります。実際に利用する際は、Microsoft Learnおよび各製品の公式ドキュメントを確認してください。