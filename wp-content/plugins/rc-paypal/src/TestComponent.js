import React from "react"
import DonationRow from './Components/DonationRow'
function TestComponent() {
    return (

        <div>
            <h2>Donate Row</h2>
            <div className={"donation-container"}>
                <DonationRow id="individual" label="Individual" amount="25" />
                <DonationRow id="corporate" label="Corporate" amount="100" />
                <DonationRow id="vip" label="VIP" amount="500" />
            </div>
        </div>
    )
}
export default TestComponent