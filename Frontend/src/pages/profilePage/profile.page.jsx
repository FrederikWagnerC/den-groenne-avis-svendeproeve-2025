import { useAuth } from "../../components/providers/auth.provider"
import { useState } from "react"
import spinner from "../../assets/spinner.svg"
import { GreenLineComponent } from "../../components/greenLine/greenLine.component";
import { ProfileDetails } from "../../components/profileDetails/profileDetails.component";
import { useFetch } from "../../utils/fetch/fetch";

export const ProfilePage = () => {
    const { loginData, loading } = useAuth();
    const [isProfile, setIsProfile] = useState(true);


    if (loading) {
        return <div><img src={spinner} alt="Loading..." /></div>;
    }

    

    return (
        <div>
            <GreenLineComponent />
            <div className="flex my-16">
                <button 
                className={`border-lightgreen border-2 flex-grow p-2  ${isProfile ? 'bg-lightgreen text-white' : 'cursor-pointer'}`}
                onClick={() => { setIsProfile(true); }}
                >
                    Min profil
                </button>
                <button 
                className={`border-lightgreen border-2 flex-grow p-2 ${!isProfile ? 'bg-lightgreen text-white' : 'cursor-pointer'}`}
                onClick={() => { setIsProfile(false); }}
                >
                    Mine annoncer
                </button>
            </div>
            
                <div>
                    {isProfile && <ProfileDetails /> }
                    {!isProfile && <div className="p-4">Her kommer dine annoncer (ikke implementeret endnu)</div>}
                </div>

        </div>
    )
}