import React, { useState } from "react"
import "../../styles/Dropdown.scss"
type DropdownProps = {
  title: string
  items: {
    id: number
    value: string
  }[]
  multiSelect?: boolean
  onSelect?: Function
}

type ItemType = {
  id: number
  value: string
}

export function Dropdown({
  title,
  items,
  multiSelect = false,
  onSelect,
}: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [selection, setSelection] = useState<ItemType[]>([])
  const toggle = () => setOpen(prev => !prev)

  function handleOnClick(item: ItemType) {
    if (!selection.some((current: ItemType) => current.id === item.id)) {
      if (!multiSelect) {
        setSelection([item])
        onSelect && onSelect(item)
      } else if (multiSelect) {
        setSelection([...selection, item])
        onSelect && onSelect(item)
      }
    } else {
      let selectionAfterRemoval = selection
      selectionAfterRemoval = selectionAfterRemoval.filter(
        (current: ItemType) => current.id !== item.id
      )
      setSelection([...selectionAfterRemoval])
    }
  }

  function isItemInSelection(item: ItemType) {
    if (selection.some((current: ItemType) => current.id === item.id)) {
      return true
    }
    return false
  }

  return (
    <div className="dd-wrapper">
      <div
        tabIndex={0}
        className="dd-header"
        role="button"
        onKeyPress={() => toggle()}
        onClick={() => toggle()}
      >
        {selection.length > 0 ? (
          <div className="dd-header__title">
            {selection.map((item: ItemType) => (
              <p key={item.id} className="dd-header__value">
                {item.value}
              </p>
            ))}
          </div>
        ) : (
          <div className="dd-header__title">
            <p className="dd-header__title--bold">{title}</p>
          </div>
        )}
        <div className="dd-header__action">
          <p>{open ? "Close" : "Open"}</p>
        </div>
      </div>
      {open && (
        <ul className="dd-list">
          {items.map(item => (
            <li className="dd-list-item" key={item.id}>
              <button type="button" onClick={() => handleOnClick(item)}>
                <span>{item.value}</span>
                <span>{isItemInSelection(item) && "Selected"}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
