import React from 'react';
import { useState } from '@wordpress/element';
import "./DonateRow.scss"

const DonationRow = ({ id, label, amount }) => {
    const [active, setActive] = useState(false);

    return (
        <div className="bpc-donate__row" data-id={id} style={{ '--amount': amount }}>
            <a href="#">
                <span className="bpc-donate__row-label">{label}</span>
                <span
                    className={`bpc-donate__row-btn-sm bpc-donate__${amount}`}
                    style={{width: amount}}
                    onClick={() => setActive(!active)}
                >
          {`$${amount}`}
        </span>
            </a>
            {active && "Component"}
        </div>
    );
};

export default DonationRow;