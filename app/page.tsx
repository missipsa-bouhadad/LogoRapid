"use client"

import Image from "next/image";
import { useState } from "react";
import IconPicker from "./components/IconPicker";

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string>("Smile")
  return (
    <div>
      <IconPicker onIconSelect={setSelectedIcon} selected={selectedIcon}/>
      {selectedIcon}
    </div>
  );
}
