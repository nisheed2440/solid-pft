import { Component, For, Accessor, createEffect } from 'solid-js';
import { nanoid } from 'nanoid';
import './SelectionGroup.css';

export interface ISelectionGroupItem {
    key: string;
    name: string;
    src: string;
}
export interface ISelectionGroupProps {
    onClick: (key: string) => void;
    label: string;
    items: ISelectionGroupItem[];
    selectedKey?: any;
}

const SelectionGroup: Component<ISelectionGroupProps> = ({
    label,
    items,
    onClick,
    selectedKey,
}) => {
    const id = nanoid();
    return (
        <div aria-labelledby={id} role='group' class='selection-group'>
            <label class='text-base-content my-2' id={id}>{label}</label>
            <ul class='selection-group-list mb-2'>
                <For each={items}>
                    {(item) => (<li class='selection-group-list-item'>
                        <button class={`selection-group-button py-2 ${ selectedKey && selectedKey() === item.key? 'is-selected' : ''}`} onClick={() => onClick(item.key)} title={`Select ${item.name}`}>
                            <div class='selection-group-button-img-wrapper'><img class='w-12 h-12' src={item.src} alt={item.name} /></div>
                            <span class='text-xs grow'>{item.name}</span>
                        </button>
                    </li>)}
                </For>
            </ul>
        </div>
    );
};

export default SelectionGroup;