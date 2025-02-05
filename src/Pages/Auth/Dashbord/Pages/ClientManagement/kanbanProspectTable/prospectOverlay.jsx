import React from 'react';

const ProspectOverlay = ({ prospect }) => {
    if (!prospect) return null;

    return (
        <div
            className="p-2 bg-white rounded-md shadow-md cursor-pointer flex flex-col"
            style={{
                width: '150px',   // ✅ Ensure fixed width
                height: '10px',   // ✅ Ensure fixed height
                transform: 'scale(1)',  // ✅ Prevent unexpected scaling
            }}
        >
            <h3 className="font-semibold text-xs">{prospect.name} {prospect.lastName}</h3>
            <p className="text-[2px] text-gray-500">Email: {prospect.email}</p>
            <p className="text-[2px] text-gray-500">Telephone: {prospect.telephone}</p>
        </div>
    );
};

export default ProspectOverlay;
