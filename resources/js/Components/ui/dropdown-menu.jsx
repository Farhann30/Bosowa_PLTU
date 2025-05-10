import React from "react";
import { useState, useRef, useEffect } from "react";

export function DropdownMenu({ children }) {
  return <div className="relative inline-block">{children}</div>;
}

export function DropdownMenuTrigger({ asChild, children, ...props }) {
  // Jika asChild true dan children adalah elemen React, clone dengan props
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, { ...props });
  }
  // Default: bungkus dengan button
  return (
    <button type="button" {...props}>
      {children}
    </button>
  );
}

export function DropdownMenuContent({ children, align = "end", ...props }) {
  // Sederhana: Selalu tampil (tidak ada animasi/close otomatis)
  return (
    <div {...props} className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-50">
      {children}
    </div>
  );
}

export function DropdownMenuItem({ children, ...props }) {
  return (
    <div {...props} className={"px-4 py-2 hover:bg-gray-100 cursor-pointer " + (props.className || "") }>
      {children}
    </div>
  );
} 