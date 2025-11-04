import type { ReactNode } from "react";

interface TabContainerProps {
  activeTab: "inference" | "all";
  onTabChange: (tab: "inference" | "all") => void;
  children: ReactNode;
}

export function TabContainer({
  activeTab,
  onTabChange,
  children,
}: TabContainerProps) {
  return (
    <div className="tab-container">
      <div className="tab-buttons">
        <button
          className={`tab-button ${activeTab === "inference" ? "active" : ""}`}
          onClick={() => onTabChange("inference")}
        >
          Inference
        </button>
        <button
          className={`tab-button ${activeTab === "all" ? "active" : ""}`}
          onClick={() => onTabChange("all")}
        >
          All List
        </button>
      </div>

      <div className="tab-content">{children}</div>
    </div>
  );
}
