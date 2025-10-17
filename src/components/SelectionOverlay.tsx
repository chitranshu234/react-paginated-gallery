import React, { type RefObject } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';

interface SelectionOverlayProps {
    op: RefObject<OverlayPanel | null>; // ✅ FIXED — allow null
    selectionCount: number | null;
    onSelectionCountChange: (value: number | null) => void;
    onSubmit: () => void;
    totalSelectedCount: number;
}

const SelectionOverlay: React.FC<SelectionOverlayProps> = ({
    op,
    selectionCount,
    onSelectionCountChange,
    onSubmit,
    totalSelectedCount,
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || value === '-') {
            onSelectionCountChange(null);
        } else {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue)) {
                onSelectionCountChange(numValue);
            }
        }
    };

    return (
        <OverlayPanel ref={op} id="overlay_panel" style={{ width: '300px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <input
                    type="number"
                    placeholder="Select rows..."
                    value={selectionCount ?? ''}
                    onChange={handleInputChange}
                    min="1"
                    style={{
                        width: '100%',
                        padding: '8px 12px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        fontSize: '14px'
                    }}
                />
                <button
                    onClick={onSubmit}
                    style={{
                        width: '100%',
                        padding: '8px 16px',
                        backgroundColor: '#fff',
                        border: '2px solid #3B82F6',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '14px',
                        color: '#3B82F6'
                    }}
                >
                    submit
                </button>
                <hr style={{ margin: '8px 0' }} />
                <div style={{ textAlign: 'center', fontWeight: '600', color: '#111' }}>
                    Total Selected: {totalSelectedCount}
                </div>
            </div>
        </OverlayPanel>
    );
};

export default SelectionOverlay;
