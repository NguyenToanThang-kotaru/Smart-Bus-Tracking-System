import React from "react";
import "./ToggleSwitch.css"; // nhớ tạo file CSS bên cạnh

export default function Switch({ checked, onChange }) {
  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="slider" />
    </label>
  );
}