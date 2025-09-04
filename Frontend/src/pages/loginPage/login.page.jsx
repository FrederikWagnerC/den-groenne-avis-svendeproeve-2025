import FormComponent from "../../components/loginForm/loginForm.component"
import { GreenLineComponent } from "../../components/greenLine/greenLine.component"
import { DonationsBanner } from "../../components/donationsBanner/donationsBanner.component"


export const LoginPage = () => {
    return (
        <>
            
            <GreenLineComponent />
            <div className="min-h-[50vh] py-12 px-4">
                <h2 className="text-center text-3xl mb-8">Velkommen tilbage</h2>
                <FormComponent isSignUp={false} />
            </div>
            
            <GreenLineComponent />
            <DonationsBanner />
        </>
    )
}