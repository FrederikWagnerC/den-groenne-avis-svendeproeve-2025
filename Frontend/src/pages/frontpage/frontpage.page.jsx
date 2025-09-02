import { GreenLineComponent } from "../../components/greenLine/greenLine.component"
import { FrontPageProductCardSection } from "../../components/frontpageProductCardSection/frontpageProductCardSection.component"
import { MissionStatement } from "../../components/missionStatement/missionStatement.component"
import { FrontPageCategories } from "../../components/frontpageCategories/frontpageCategories.component"
import { DonationsBanner } from "../../components/donationsBanner/donationsBanner.component"

export const FrontPage = () => {
    return (
        <div className="max-w-screen max-h-[calc(100%-150px)]">
            <GreenLineComponent />
            <FrontPageProductCardSection />
            <GreenLineComponent />
            <MissionStatement />
            <GreenLineComponent />
            <FrontPageCategories />
            <GreenLineComponent />
            <DonationsBanner />
        </div>
    )
}
