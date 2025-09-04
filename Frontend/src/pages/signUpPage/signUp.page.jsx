import FormComponent from "../../components/loginForm/loginForm.component"
import { GreenLineComponent } from "../../components/greenLine/greenLine.component"
import { DonationsBanner } from "../../components/donationsBanner/donationsBanner.component"


export const SignUpPage = () => {
    return (
        <>
            <GreenLineComponent />
            <div className="min-h-[50vh] py-12 px-4">
                <h2 className="text-center text-3xl mb-8">Opret en konto</h2>
                <FormComponent isSignUp={true} />
            </div>
            
            <GreenLineComponent />
            <DonationsBanner />
        </>
    )
}