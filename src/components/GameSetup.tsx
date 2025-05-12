import "./ShadowGame.css";
import colors from "../global/styles/colors";
import sizes from "../global/styles/sizes";
import buttons from "../global/styles/buttons";

const modeButtonStyle = {
  ...buttons.likebutton,
  backgroundColor: colors.white,
  color: colors.dark,
  border: "2px solid",
  borderColor: colors.gray,
};

const selectedButtonStyle = {
  backgroundColor: colors.brightgray,
  color: colors.dark,
  border: "2px solid",
  borderColor: colors.dark,
  fontWeight: "bold",
};

const miniButtonStyle = {
  backgroundColor: colors.secondary,
  color: colors.dark,
  fontWeight: "bold",
};

type GameSetupProps = {
  mode: "input" | "choice" | null;
  setMode: (mode: "input" | "choice") => void;
  numQuestions: number;
  setNumQuestions: (count: number) => void;
  onStart: () => void;
};

export default function GameSetup({
  mode,
  setMode,
  numQuestions,
  setNumQuestions,
  onStart,
}: GameSetupProps) {
  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>
        <strong>🕹️모드를 선택해주세요</strong>
      </h2>

      <div className="mode-buttons">
        <button
          onClick={() => setMode("input")}
          style={
            mode === "input"
              ? { ...modeButtonStyle, ...selectedButtonStyle }
              : modeButtonStyle
          }
        >
          직접 입력
        </button>
        <button
          onClick={() => setMode("choice")}
          style={
            mode === "choice"
              ? { ...modeButtonStyle, ...selectedButtonStyle }
              : modeButtonStyle
          }
        >
          4지선다형
        </button>
      </div>

      <h3 style={{ marginTop: 40, marginBottom: 30 }}>
        🎯 <strong>몇 문제에 도전하시나요</strong> ❓
      </h3>
      <select
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        style={{ fontSize: sizes.small, padding: "6px" }}
      >
        <option value={10}>10문제 풀기</option>
        <option value={20}>20문제 풀기</option>
        <option value={30}>30문제 풀기</option>
        <option value={50}>50문제 풀기</option>
      </select>

      {mode && (
        <>
          <br />
          <br />
          <button
            onClick={onStart}
            style={{
              ...buttons.likebutton,
              ...miniButtonStyle,
              fontSize: sizes.tiny,
            }}
          >
            도전하기
          </button>
        </>
      )}
    </div>
  );
}
