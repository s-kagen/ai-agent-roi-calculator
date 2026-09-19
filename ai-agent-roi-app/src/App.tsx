import { useMemo, useState } from "react";
import "./App.css";

type NumberFieldProps = {
  id: string;
  label: string;
  value: number;
  unit: string;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

function NumberField({
  id,
  label,
  value,
  unit,
  min = 0,
  max,
  step = 1,
  onChange,
}: NumberFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>

      <div className="input-with-unit">
        <input
          id={id}
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            onChange(Number.isFinite(nextValue) ? nextValue : 0);
          }}
        />
        <span>{unit}</span>
      </div>
    </div>
  );
}

function App() {
  const [currentMinutes, setCurrentMinutes] = useState(15);
  const [afterMinutes, setAfterMinutes] = useState(3);
  const [monthlyVolume, setMonthlyVolume] = useState(3000);
  const [hourlyRate, setHourlyRate] = useState(4000);
  const [initialCost, setInitialCost] = useState(5000000);
  const [annualOperatingCost, setAnnualOperatingCost] =
    useState(3000000);

  const results = useMemo(() => {
    const savedMinutesPerCase = Math.max(
      currentMinutes - afterMinutes,
      0
    );

    const monthlySavedMinutes =
      savedMinutesPerCase * Math.max(monthlyVolume, 0);

    const monthlySavedHours = monthlySavedMinutes / 60;
    const annualSavedHours = monthlySavedHours * 12;

    const monthlyBenefit =
      monthlySavedHours * Math.max(hourlyRate, 0);

    const annualBenefit = monthlyBenefit * 12;

    const firstYearCost =
      Math.max(initialCost, 0) +
      Math.max(annualOperatingCost, 0);

    const netBenefit = annualBenefit - firstYearCost;

    const roi =
      firstYearCost > 0
        ? (netBenefit / firstYearCost) * 100
        : null;

    const paybackMonths =
      monthlyBenefit > 0
        ? firstYearCost / monthlyBenefit
        : null;

    return {
      savedMinutesPerCase,
      monthlySavedHours,
      annualSavedHours,
      annualBenefit,
      firstYearCost,
      netBenefit,
      roi,
      paybackMonths,
    };
  }, [
    currentMinutes,
    afterMinutes,
    monthlyVolume,
    hourlyRate,
    initialCost,
    annualOperatingCost,
  ]);

  const formatNumber = (value: number) =>
    new Intl.NumberFormat("ja-JP", {
      maximumFractionDigits: 1,
    }).format(value);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
      maximumFractionDigits: 0,
    }).format(value);

  const getEvaluation = () => {
    if (results.roi === null) {
      return {
        label: "評価対象外",
        className: "neutral",
        message: "初年度コストを入力してください。",
      };
    }

    if (results.roi >= 200) {
      return {
        label: "高い投資効果",
        className: "excellent",
        message: "高いROIが期待できる試算です。",
      };
    }

    if (results.roi >= 100) {
      return {
        label: "投資候補",
        className: "good",
        message: "導入を具体的に検討できる試算です。",
      };
    }

    if (results.roi >= 0) {
      return {
        label: "条件を精査",
        className: "caution",
        message: "効果とコストの前提条件を確認してください。",
      };
    }

    return {
      label: "再検討",
      className: "warning",
      message: "現時点の条件ではコストが効果を上回っています。",
    };
  };

  const handleReset = () => {
    setCurrentMinutes(15);
    setAfterMinutes(3);
    setMonthlyVolume(3000);
    setHourlyRate(4000);
    setInitialCost(5000000);
    setAnnualOperatingCost(3000000);
  };

  const evaluation = getEvaluation();

  const hasInvalidTime =
    afterMinutes > currentMinutes;

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Power Apps Code Apps Sample</p>
          <h1>AI Agent ROI Calculator</h1>
          <p className="hero-description">
            AIエージェント導入による作業時間の削減効果と
            初年度ROIを簡単に試算します。
          </p>
        </div>

        <button
          className="secondary-button"
          type="button"
          onClick={handleReset}
        >
          初期値に戻す
        </button>
      </header>

      <section className="content-grid">
        <div className="panel">
          <div className="panel-heading">
            <span className="step-label">STEP 1</span>
            <h2>試算条件を入力</h2>
          </div>

          <div className="form-grid">
            <NumberField
              id="current-minutes"
              label="現在の1件当たり作業時間"
              value={currentMinutes}
              unit="分"
              onChange={setCurrentMinutes}
            />

            <NumberField
              id="after-minutes"
              label="導入後の1件当たり作業時間"
              value={afterMinutes}
              unit="分"
              onChange={setAfterMinutes}
            />

            <NumberField
              id="monthly-volume"
              label="月間処理件数"
              value={monthlyVolume}
              unit="件"
              onChange={setMonthlyVolume}
            />

            <NumberField
              id="hourly-rate"
              label="担当者の時間単価"
              value={hourlyRate}
              unit="円"
              onChange={setHourlyRate}
            />

            <NumberField
              id="initial-cost"
              label="初期導入費用"
              value={initialCost}
              unit="円"
              onChange={setInitialCost}
            />

            <NumberField
              id="annual-operating-cost"
              label="年間運用費用"
              value={annualOperatingCost}
              unit="円"
              onChange={setAnnualOperatingCost}
            />
          </div>

          {hasInvalidTime && (
            <div className="validation-message" role="alert">
              導入後の作業時間が現在の作業時間を上回っています。
              この場合、削減時間は0として計算します。
            </div>
          )}

          <div className="formula-box">
            <strong>計算の考え方</strong>
            <p>
              年間削減額 ＝
              （現在時間 − 導入後時間）
              × 月間件数 × 12 ÷ 60 × 時間単価
            </p>
          </div>
        </div>

        <div className="panel results-panel">
          <div className="panel-heading">
            <span className="step-label">STEP 2</span>
            <h2>試算結果</h2>
          </div>

          <div className={`evaluation ${evaluation.className}`}>
            <span>AI導入判定</span>
            <strong>{evaluation.label}</strong>
            <p>{evaluation.message}</p>
          </div>

          <div className="result-grid">
            <article className="result-card">
              <span>1件当たり削減時間</span>
              <strong>
                {formatNumber(results.savedMinutesPerCase)}
                <small> 分</small>
              </strong>
            </article>

            <article className="result-card">
              <span>月間削減時間</span>
              <strong>
                {formatNumber(results.monthlySavedHours)}
                <small> 時間</small>
              </strong>
            </article>

            <article className="result-card">
              <span>年間削減時間</span>
              <strong>
                {formatNumber(results.annualSavedHours)}
                <small> 時間</small>
              </strong>
            </article>

            <article className="result-card emphasis">
              <span>年間削減額</span>
              <strong>
                {formatCurrency(results.annualBenefit)}
              </strong>
            </article>

            <article className="result-card">
              <span>初年度コスト</span>
              <strong>
                {formatCurrency(results.firstYearCost)}
              </strong>
            </article>

            <article
              className={`result-card ${
                results.netBenefit >= 0 ? "positive" : "negative"
              }`}
            >
              <span>初年度純効果</span>
              <strong>
                {formatCurrency(results.netBenefit)}
              </strong>
            </article>

            <article className="result-card roi-card">
              <span>初年度ROI</span>
              <strong>
                {results.roi === null
                  ? "算出不可"
                  : `${formatNumber(results.roi)}%`}
              </strong>
            </article>

            <article className="result-card">
              <span>投資回収期間</span>
              <strong>
                {results.paybackMonths === null
                  ? "算出不可"
                  : `${formatNumber(results.paybackMonths)}カ月`}
              </strong>
            </article>
          </div>
        </div>
      </section>

      <section className="notice">
        <h2>試算結果の利用について</h2>
        <p>
          この結果は入力値に基づく簡易シミュレーションです。
          実際の投資判断では、利用率、導入定着率、品質、
          リスク、税務・会計上の扱いなども確認してください。
        </p>
      </section>
    </main>
  );
}

export default App;