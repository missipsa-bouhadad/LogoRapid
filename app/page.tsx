"use client";

import Image from "next/image";
import { useState } from "react";
import IconPicker from "./components/IconPicker";
import { Download, icons } from "lucide-react";
import ColorPicker from "./components/ColorPicker";

type IconName = keyof typeof icons;

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string>("Smile");
  const SelectedIconComponent =
    selectedIcon && icons[selectedIcon as IconName]
      ? icons[selectedIcon as IconName]
      : null;
  const [iconSize, setIconSize] = useState<number>(220);
  const [iconStrokeWidth, setIconStrokeWidth] = useState<number>(1);
  const [iconRotation, setIconRotation] = useState<number>(0);
  const [shadow, setShadow] = useState<string>("shadow-none");
  const [shadowNumber, setShadowNumber] = useState<number>(0);
  const [radius, setRadius] = useState<number>(12);
  const [activeTab, setActiveTab] = useState<"stroke" | "background" | "fill">(
    "stroke",
  );
  const [iconStrokeColor, setIconStrokeColor] = useState<string>("#260707");
  const [backgroundColor, setBackgroundColor] = useState<string>("#535F78");
  const [fillColor, setFillColor] = useState<string>("#DEDEDE");

  const handleShadowNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setShadowNumber(value);
    switch (value) {
      case 20:
        setShadow("shadow-sm");
        break;
      case 40:
        setShadow("shadow-md");
        break;
      case 60:
        setShadow("shadow-lg");
        break;
      case 80:
        setShadow("shadow-xl");
        break;
      case 100:
        setShadow("shadow-2xl");
        break;
      default:
        setShadow("shadow-none");
    }
  };

  const getBackgroundStyle = () => {
    return backgroundColor.startsWith("linear-gradient") ? {background: backgroundColor} : {backgroundColor: backgroundColor}
  }

  return (
    <div>
      <section className="flex flex-col md:flex-row md:justify-between">
        <div className="md:w-1/4 p-5">
          <div className="flex items-center justify-center space-x-2 w-full mb-5">
            <button
              className={`btn w-1/3 ${activeTab === "stroke" ? "btn-primary" : ""}`}
              onClick={() => {
                setActiveTab("stroke");
              }}
            >
              Bordure
            </button>
            <button
              className={`btn w-1/3 ${activeTab === "background" ? "btn-primary" : ""}`}
              onClick={() => {
                setActiveTab("background");
              }}
            >
              Arrière-plan
            </button>
            <button
              className={`btn w-1/3 ${activeTab === "fill" ? "btn-primary" : ""}`}
              onClick={() => {
                setActiveTab("fill");
              }}
            >
              Remplissage
            </button>
          </div>

          <div>
            {activeTab === "stroke" && (
              <ColorPicker
                color={iconStrokeColor}
                onColorChange={setIconStrokeColor}
                allowGradient={false}
              />
            )}

            {activeTab === "background" && (
              <ColorPicker
                color={backgroundColor}
                onColorChange={setBackgroundColor}
                allowGradient={true}
              />
            )}

            {activeTab === "fill" && (
              <ColorPicker
                color={fillColor}
                onColorChange={setFillColor}
                allowGradient={false}
              />
            )}
          </div>
        </div>

        <div
          className="md:w-2/4 flex justify-center items-center h-screen bg-cover bg-center border border-base-200 pt-4 relative"
          style={{ backgroundImage: "url('/file.svg')" }}
        >
          {/* Logo + Select icon + Download btn */}
          <div className="flex w-full justify-between p-3 z-50 absolute top-0 left-0 bg-base-100">
            <div className="flex items-center italic font-bold text-2xl">
              <Image
                src="/logo.png"
                alt="logo"
                width={800}
                height={800}
                className="w-10 h-10"
              />
              <span>LogoRapid</span>
            </div>
            <div className="flex items-center">
              <IconPicker
                onIconSelect={setSelectedIcon}
                selected={selectedIcon}
              />
              <button className="btn ml-4">
                Télécharger <Download className="w-4" />{" "}
              </button>
            </div>
          </div>

          {/* Logo preview */}
          <div className="text-5xl bg-neutral-content/10 hover:bg-neutral-content/20 aspect-square border-2 border-base-300 hover:border-neutral/15 border-dashed p-5 md:p-13">
            <div
              id="iconContainer"
              className={`w-112.5 h-112.5 flex justify-center items-center ${shadow}`}
              style={{ borderRadius: `${radius}px`, ...getBackgroundStyle()}}
            >
              {SelectedIconComponent && (
                <SelectedIconComponent
                  size={iconSize}
                  style={{
                    display: "block",
                    fill: fillColor,
                    stroke: iconStrokeColor,
                    strokeWidth: iconStrokeWidth,
                    transform: `rotate(${iconRotation}deg)`,
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <div className="md:w-1/4 p-5">
          {/* Icon size  */}
          <div className="mt-4">
            <div className="flex justify-between mb-3">
              <label className="badge badge-ghost">Taille</label>
              <span>{iconSize} px</span>
            </div>

            <input
              type="range"
              min="95"
              max="300"
              value={iconSize}
              className="range range-primary"
              onChange={(e) => {
                setIconSize(Number(e.target.value));
              }}
            />
          </div>

          {/* Border */}
          <div className="mt-4">
            <div className="flex justify-between mb-3">
              <label className="badge badge-ghost">Bordure</label>
              <span>{iconStrokeWidth}</span>
            </div>

            <input
              type="range"
              min="1"
              max="4"
              value={iconStrokeWidth}
              className="range range-primary"
              onChange={(e) => {
                setIconStrokeWidth(Number(e.target.value));
              }}
            />
          </div>

          {/* Rotation */}
          <div className="mt-4">
            <div className="flex justify-between mb-3">
              <label className="badge badge-ghost">Rotation</label>
              <span>{iconRotation} °</span>
            </div>

            <input
              type="range"
              min="0"
              max="360"
              value={iconRotation}
              className="range range-primary"
              onChange={(e) => {
                setIconRotation(Number(e.target.value));
              }}
            />
          </div>

          {/* Shadow */}
          <div className="mt-4">
            <div className="flex justify-between mb-3">
              <label className="badge badge-ghost">Shadow</label>
              <span>{shadow.replace("shadow-", "")}</span>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step={20}
              value={shadowNumber}
              className="range range-primary"
              onChange={handleShadowNumberChange}
            />
          </div>

          {/* Radius */}
          <div className="mt-4">
            <div className="flex justify-between mb-3">
              <label className="badge badge-ghost">Arondi</label>
              <span>{radius} px</span>
            </div>

            <input
              type="range"
              min="0"
              max="300"
              value={radius}
              className="range range-primary"
              onChange={(e) => {
                setRadius(Number(e.target.value));
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
