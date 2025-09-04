



export const Footer = () => {
    return (
        <footer className="bg-lightgreen text-white py-8 mt-4">
            <div className="flex justify-around gap-16 ">
                <ul className="flex flex-col max-w-1/4">
                    <li><h5 className="mb-4 text-2xl">Nyhedsbrev</h5></li>
                    <li className="mb-2"><p className="text-black text-xs">Vil du være med på den grønne front? Tilmeld dig vores nyhedsbrev og få de seneste klima opdateringer direkte i din indbakke</p></li>
                    <li className="flex"><input type="email" placeholder="Indtast din email" className="flex-grow bg-white" /><button className="bg-darkgreen text-white p-2 px-4">Tilmeld</button></li>
                </ul>
                <ul className="flex flex-col max-w-1/4 text-xs text-black">
                    <li><h5 className="mb-4 text-2xl text-white">Kontakt</h5></li>
                    <li><p>Redningen 32</p></li>
                    <li><p>2210 Vinterby Øster</p></li>
                    <li><p>+45 88229422</p></li>
                    <li><p>dga@info.dk</p></li>
                </ul>
                <ul className="flex flex-col max-w-1/4">
                    <li><h5 className="mb-4 text-2xl text-white">FN´s Verdensmål</h5></li>
                    <li><p className="text-black text-xs">Vi støtter på organisatorisk plan op om FN´s verdensmål og har derfor besluttet at en del af overskuddet går direkte til verdensmål nr. 13; Klimahandling</p></li>
                    <li className="mt-auto"><a target="_blank" className="text-xs underline " href="https://www.verdensmaalene.dk/maal">Læs mere om verdensmålene her</a></li>
                </ul>

            </div>
        </footer>
    );
};