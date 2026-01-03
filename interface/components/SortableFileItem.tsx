"use client"

import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import React from "react"

interface SortableFileItemProps {
  id: string
  children: React.ReactNode
  className?: string
}

export function SortableFileItem({
  id,
  children,
  className,
}: SortableFileItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),

    // ✅ SAME transition for both directions
    transition: isDragging
      ? transition
      : "transform 480ms cubic-bezier(0.4, 0, 0.2, 1)",

    zIndex: isDragging ? 50 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        select-none
        cursor-grab
        will-change-transform
        ${isDragging ? "cursor-grabbing scale-[1.03] shadow-lg opacity-80" : ""}
        ${className ?? ""}
      `}
    >
      {children}
    </div>
  )
}
