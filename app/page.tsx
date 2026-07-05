"use client";

import Image from "next/image";
import { useState } from "react";
import IconPicker from "./components/IconPicker";
import { Download, icons } from "lucide-react";
import ColorPicker from "./components/ColorPicker";
import React from "react";
import { toPng, toSvg } from "html-to-image";

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
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);

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
    return backgroundColor.startsWith("linear-gradient")
      ? { background: backgroundColor }
      : { backgroundColor: backgroundColor };
  };

  const getBackgroundPresetStyle = (color: string) => {
    return color.startsWith("linear-gradient")
      ? { background: color }
      : { backgroundColor: color };
  };

  const handlePresetSelected = (logoPreset: (typeof logoPresets)[0]) => {
    setSelectedIcon(logoPreset.icon);
    setIconSize(logoPreset.iconSize);
    setIconStrokeWidth(logoPreset.iconStrokeWidth);
    setIconRotation(logoPreset.iconRotation);
    setRadius(logoPreset.radius * 7);
    setIconStrokeColor(logoPreset.iconStrokeColor);
    setBackgroundColor(logoPreset.backgroundColor);
    setFillColor(logoPreset.fillColor);
  };

  const handleDownloadImage = (format: "png" | "svg") => {
    setIsDownloading(true);
    setDownloadCompleted(false);
    const element = document.getElementById("iconContainer");
    if (element) {
      let imagePromise;
      if (format == "svg") {
        imagePromise = toSvg(element, { cacheBust: true });
      } else {
        imagePromise = toPng(element, { cacheBust: true, pixelRatio: 2 });
      }

      imagePromise
        .then((dataUrl: string) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = `logo.${format}`;
          link.click();
          setDownloadCompleted(true);
          setIsDownloading(false);
        })
        .catch((error: any) => {
          console.log(error);
          setIsDownloading(false);
        });
    }
  };

  const logoPresets = [
    {
      id: 1,
      backgroundColor: "linear-gradient(45deg, #11998e 0%, #38ef7d 100%)",
      radius: 14,
      fillColor: "#ffffff",
      iconRotation: 45,
      iconStrokeColor: "#11998e",
      iconStrokeWidth: 3,
      iconSize: 210,
      icon: "Rocket",
    },
    {
      id: 2,
      backgroundColor: "linear-gradient(45deg, #8e2de2 0%, #4a00e0 100%)",
      radius: 20,
      fillColor: "#f1c40f",
      iconRotation: 0,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 2,
      iconSize: 240,
      icon: "Sparkles",
    },
    {
      id: 3,
      backgroundColor: "linear-gradient(45deg, #ff416c 0%, #ff4b2b 100%)",
      radius: 10,
      fillColor: "transparent",
      iconRotation: 15,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 4,
      iconSize: 200,
      icon: "Shield",
    },
    {
      id: 4,
      backgroundColor: "linear-gradient(45deg, #1f4037 0%, #99f2c8 100%)",
      radius: 32,
      fillColor: "#1f4037",
      iconRotation: -30,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 3,
      iconSize: 260,
      icon: "Flame",
    },
    {
      id: 5,
      backgroundColor: "linear-gradient(45deg, #ffe259 0%, #ffa751 100%)",
      radius: 24,
      fillColor: "#ffffff",
      iconRotation: 90,
      iconStrokeColor: "#d35400",
      iconStrokeWidth: 3,
      iconSize: 230,
      icon: "Crown",
    },
    {
      id: 6,
      backgroundColor: "#130f40",
      radius: 16,
      fillColor: "#e74c3c",
      iconRotation: 60,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 2,
      iconSize: 250,
      icon: "Compass",
    },
    {
      id: 7,
      backgroundColor: "linear-gradient(45deg, #00c6ff 0%, #0072ff 100%)",
      radius: 50,
      fillColor: "#00c6ff",
      iconRotation: 120,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 4,
      iconSize: 220,
      icon: "Cpu",
    },
    {
      id: 8,
      backgroundColor: "#2c3e50",
      radius: 12,
      fillColor: "transparent",
      iconRotation: -45,
      iconStrokeColor: "#1abc9c",
      iconStrokeWidth: 3,
      iconSize: 215,
      icon: "Globe",
    },
    {
      id: 9,
      backgroundColor: "#ff7675",
      radius: 30,
      fillColor: "#2d3436",
      iconRotation: 0,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 4,
      iconSize: 270,
      icon: "TrendingUp",
    },
    {
      id: 10,
      backgroundColor: "linear-gradient(45deg, #f857a6 0%, #ff5858 100%)",
      radius: 18,
      fillColor: "#ffffff",
      iconRotation: 10,
      iconStrokeColor: "#2c3e50",
      iconStrokeWidth: 2,
      iconSize: 235,
      icon: "Briefcase",
    },
    {
      id: 11,
      backgroundColor: "#6c5ce7",
      radius: 45,
      fillColor: "#fdcb6e",
      iconRotation: -15,
      iconStrokeColor: "#ffffff",
      iconStrokeWidth: 3,
      iconSize: 280,
      icon: "Gift",
    },
    {
      id: 12,
      backgroundColor: "#2ed573",
      radius: 8,
      fillColor: "#ffffff",
      iconRotation: 180,
      iconStrokeColor: "#2f3542",
      iconStrokeWidth: 3,
      iconSize: 245,
      icon: "Lightbulb",
    },
  ];

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
                src="/logo_app.png"
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
              <button
                className="btn ml-4"
                onClick={() => {
                  const modal = document.getElementById(
                    "my_modal_1",
                  ) as HTMLDialogElement;

                  if (modal) {
                    modal.showModal();
                    setDownloadCompleted(false)
                  }
                }}
              >
                Télécharger <Download className="w-4" />{" "}
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>

                  {isDownloading ? (
                    <div className="flex justify-center">
                      <progress className="progress progress-primary w-full"></progress>
                    </div>
                  ) : downloadCompleted ? (
                    <div className="flex justify-center text-center">
                      <p className="text-lg font-bold">Le téléchargement a été terminé avec succés !</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-bold text-lg text-center mb-4">
                        Choisisez un format{" "}
                      </h3>
                      <div className="space-x-3 flex justify-center">
                        <button
                          className="btn"
                          onClick={() => handleDownloadImage("png")}
                        >
                          PNG
                        </button>
                        <button
                          className="btn"
                          onClick={() => handleDownloadImage("svg")}
                        >
                          SVG
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </dialog>
            </div>
          </div>

          {/* Logo preview */}
          <div className="text-5xl bg-neutral-content/10 hover:bg-neutral-content/20 aspect-square border-2 border-base-300 hover:border-neutral/15 border-dashed p-5 md:p-13">
            <div
              id="iconContainer"
              className={`w-112.5 h-112.5 flex justify-center items-center ${shadow}`}
              style={{ borderRadius: `${radius}px`, ...getBackgroundStyle() }}
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
              className="range range-primary w-full"
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
              className="range range-primary w-full"
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
              className="range range-primary w-full"
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
              className="range range-primary w-full"
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
              className="range range-primary w-full"
              onChange={(e) => {
                setRadius(Number(e.target.value));
              }}
            />
          </div>

          <div className="mt-5">
            <h1 className="font-bold text-lg mb-4">Préréglages</h1>

            <div className="flex flex-wrap gap-2 justify-center">
              {logoPresets.map((logoPreset) => (
                <div
                  key={logoPreset.id}
                  className="cursor-pointer"
                  onClick={() => handlePresetSelected(logoPreset)}
                >
                  <div
                    className={"w-16 h-16 flex justify-center items-center"}
                    style={{
                      borderRadius: `${logoPreset.radius}px`,
                      ...getBackgroundPresetStyle(logoPreset.backgroundColor),
                    }}
                  >
                    {icons[logoPreset.icon as IconName] &&
                      React.createElement(icons[logoPreset.icon as IconName], {
                        size: 30,
                        style: {
                          display: "block",
                          fill: logoPreset.fillColor,
                          stroke: logoPreset.iconStrokeColor,
                          strokeWidth: logoPreset.iconStrokeWidth,
                          transform: `rotate(${logoPreset.iconRotation}deg)`,
                        },
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
