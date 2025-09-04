import { useState } from "react";
import { useAuth } from "../providers/auth.provider";

export const ProfileDetails = ({ user }) => {
    const { logout } = useAuth();
    const [formData, setFormData] = useState({
        firstName: user?.firstname || '',
        lastName: user?.lastname || '',
        address: user?.address || '',
        zipCode: user?.zipcode || '',
        phone: user?.phone || '',
        email: user?.email || '',
        newsletter: user?.hasNewsletter || false,
        notifications: user?.hasNotification || false
    });

    console.log(user);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSave = () => {
        // Handle save logic here
        console.log("Saving profile:", formData);
        alert("Profil gemt!");
    };

    const handleLogout = () => {
        logout();
        // Navigate to home or login page
    };

    return (
        <div className="flex flex-col min-h-full">
            <div className="flex-grow">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Fornavn
                            </label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-full p-2 border-2 border-lightgreen bg-input-bg rounded-sm"
                                placeholder="Dit navn..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Efternavn
                            </label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-full p-2 border-2 border-lightgreen bg-input-bg rounded-sm"
                                placeholder="Dit efternavn..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Adresse
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="w-full p-2 border-2 border-lightgreen bg-input-bg rounded-sm"
                                placeholder="Din adresse..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Postnummer
                            </label>
                            <input
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleInputChange}
                                className="w-full p-2 border-2 border-lightgreen bg-input-bg rounded-sm"
                                placeholder="Dit postnummer..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Telefon
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                className="w-full p-2 border-2 border-lightgreen bg-input-bg rounded-sm"
                                placeholder="Dit telefon nummer..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border-2 border-lightgreen bg-input-bg rounded-sm"
                                placeholder="Din email adresse..."
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6 flex flex-col justify-between h-full">
                        <div className="space-y-4 pt-6">
                            <div className="flex items-start gap-3">
                                <label htmlFor="newsletter" className="text-xs text-gray-700 leading-relaxed">
                                    Jeg ønsker at modtage nyhedsbrev om klima initiativer, gode tilbud,
                                    eksklusive rabatter og lignende promoveringsmailer fra den grønne
                                    avis og samarbejdspartnere?
                                </label>
                                <div className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        id="newsletter"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleInputChange}
                                        className="peer appearance-none cursor-pointer transition-all bg-white h-4 w-4 mt-1 accent-darkgreen hover:accent-lightgreen outline-darkgreen rounded-none border-darkgreen border-2 checked:bg-lightgreen checked:border-lightgreen"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#ffffff" stroke="#ffffff" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <label htmlFor="notifications" className="text-xs text-gray-700 leading-relaxed">
                                    Jeg ønsker at modtage notifikationer i form af emails når der
                                    sker en opdatering på en af mine annoncer eller jeg modtager en
                                    ny henvendelse?
                                </label>
                                <div className="flex items-center cursor-pointer relative">
                                    <input
                                        type="checkbox"
                                        id="notifications"
                                        name="notifications"
                                        checked={formData.notifications}
                                        onChange={handleInputChange}
                                        className="peer appearance-none cursor-pointer transition-all bg-white h-4 w-4 mt-1 accent-darkgreen hover:accent-lightgreen outline-darkgreen rounded-none border-darkgreen border-2 checked:bg-lightgreen checked:border-lightgreen"
                                    />
                                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="#ffffff" stroke="#ffffff" strokeWidth="1">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                        </svg>
                                    </span>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col gap-3 md:flex-row md:justify-end mt-8 pt-4">
                            <button
                                onClick={handleLogout}
                                className="bg-brown text-white px-6 py-2 rounded font-medium hover:bg-brown transition-colors"
                            >
                                Log ud
                            </button>
                            <button
                                onClick={handleSave}
                                className="bg-lightgreen text-white px-6 py-2 rounded font-medium hover:bg-lightgreen/90 transition-colors"
                            >
                                Gem ændringer
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};