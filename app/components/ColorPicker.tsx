"use client"

import React, { useState } from 'react'
import dynamic from "next/dynamic";

const GradientColorPicker = dynamic(
  () => import("react-best-gradient-color-picker"),
  { ssr: false },
);

interface ColorPickerProps {
  color: string
  onColorChange: (color:string) => void
  allowGradient: boolean
}

const ColorPicker : React.FC<ColorPickerProps> = ({color, onColorChange, allowGradient}) => {
  const [currentColor, setCurrentColor] = useState<string>(color) 

  const handleColorChange = (color:string) =>{
    setCurrentColor(color)
    onColorChange(color)
  }

  return (
    <div>
      <GradientColorPicker value={currentColor} width={300} onChange={handleColorChange} hideColorTypeBtns = {!allowGradient}/>
    </div>
  )
}

export default ColorPicker