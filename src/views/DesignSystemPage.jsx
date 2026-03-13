'use client'
import { useSyncExternalStore, useEffect } from "react";
import Sidebar from "../components/design-system/Sidebar";
import PrinciplesSection from "../components/design-system/PrinciplesSection";
import ColorScalesSection from "../components/design-system/ColorScalesSection";
import ColorSection from "../components/design-system/ColorSection";
import TypographySection from "../components/design-system/TypographySection";
import ButtonsSection from "../components/design-system/ButtonsSection";
import SpacingSection from "../components/design-system/SpacingSection";
import GridSection from "../components/design-system/GridSection";
import IconsSection from "../components/design-system/IconsSection";
import ShadowsSection from "../components/design-system/ShadowsSection";
import BadgesSection from "../components/design-system/BadgesSection";
import NotesSection from "../components/design-system/NotesSection";
import CardsSection from "../components/design-system/CardsSection";
import CollapseSection from "../components/design-system/CollapseSection";
import CodeBlocksSection from "../components/design-system/CodeBlocksSection";
import ToastsSection from "../components/design-system/ToastsSection";
import NavigationSection from "../components/design-system/NavigationSection";
import StatsSection from "../components/design-system/StatsSection";
import MarkersSection from "../components/design-system/MarkersSection";
import ResponsiveSection from "../components/design-system/ResponsiveSection";
import FormInputsSection from "../components/design-system/FormInputsSection";
import ScoreSystemSection from "../components/design-system/ScoreSystemSection";
import GaugesSection from "../components/design-system/GaugesSection";
import StatusIndicatorsSection from "../components/design-system/StatusIndicatorsSection";
import { MONO } from "../components/design-system/constants";

// External store for theme preference (localStorage-backed)
const themeListeners = new Set();
function emitThemeChange() {
  themeListeners.forEach((l) => l());
}
function subscribeTheme(callback) {
  themeListeners.add(callback);
  return () => themeListeners.delete(callback);
}
function getThemeSnapshot() {
  const stored = localStorage.getItem("ds-theme");
  if (stored) return stored === "dark";
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}
function getServerThemeSnapshot() {
  return false;
}

export default function DesignSystemPage() {
  const dark = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);

  const toggleDark = () => {
    localStorage.setItem("ds-theme", dark ? "light" : "dark");
    emitThemeChange();
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    document.documentElement.classList.remove("dark");
    return () => document.documentElement.removeAttribute("data-theme");
  }, [dark]);

  return (
    <div
      className="min-h-screen transition-colors"
      style={{
        fontFamily: '"Geist Sans", sans-serif',
        background: "var(--mr-bg-page)",
        color: "var(--mr-text-primary)",
      }}
    >
      <Sidebar dark={dark} onToggle={toggleDark} />

      <main className="ml-[240px]">
        <div className="max-w-[1280px] mx-auto px-12">
          {/* Page header */}
          <header className="pt-16 pb-8">
            <h1
              className="text-[56px] font-medium leading-[1.2] tracking-tight mb-3"
              style={{ color: "var(--mr-text-primary)" }}
            >
              Leading Intelligence
            </h1>
            <p
              className="text-[17px] leading-[1.6] max-w-[640px] mb-6"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Living visual reference for all design tokens, color scales,
              typography, and component patterns. Built to keep the team aligned
              across marketing pages and product UI.
            </p>
            <div
              className="flex gap-6 text-[14px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              <span>v2.0</span>
              <span>2026-03-13</span>
              <span>Geist Sans + Geist Mono</span>
            </div>
          </header>

          {/* Overview */}
          <PrinciplesSection />

          {/* Foundations */}
          <ColorScalesSection />
          <ColorSection />
          <TypographySection />
          <SpacingSection />
          <GridSection />
          <IconsSection />
          <ShadowsSection />

          {/* Components */}
          <ButtonsSection />
          <BadgesSection />
          <NotesSection />
          <CardsSection />
          <CollapseSection />
          <CodeBlocksSection />
          <ToastsSection />
          <NavigationSection />

          {/* Data Visualization */}
          <ScoreSystemSection />
          <GaugesSection />
          <StatusIndicatorsSection />

          {/* Patterns */}
          <StatsSection />
          <MarkersSection />
          <ResponsiveSection />
          <FormInputsSection />
        </div>

        {/* Page footer */}
        <footer
          className="mt-20 py-8 px-12"
          style={{
            borderTop: "1px solid var(--mr-border-default)",
            background: "var(--mr-bg-card)",
          }}
        >
          <div className="max-w-[1280px] mx-auto flex justify-between items-center">
            <span
              className="text-[14px]"
              style={{ color: "var(--mr-text-muted)" }}
            >
              Leading Intelligence &mdash; Design System Reference v2.0
            </span>
            <span
              className="text-[14px]"
              style={{ ...MONO, color: "var(--mr-text-muted)" }}
            >
              2026-03-13
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
