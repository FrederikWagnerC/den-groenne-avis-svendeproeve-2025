


export const DonationsBanner = () => {
    return (
        <section className="grid md:grid-cols-2 grid-cols-1 gap-4 text-white">
            <div className="bg-[url(http://localhost:3000/assets/images/banners/banner_image2.jpg)] bg-cover bg-center px-8 py-4 flex flex-col gap-2">
                <h3 className="text-3xl font-normal">Donationer til Dato</h3>
                <p>Sammen med dig har vi siden starten indsamlet:</p>
                <h3 className="text-lightgreen text-right text-4xl">452.231,50 kr</h3>
                <p className="font-light text-xs">Tak fordi du handler brugt, med omtanke for klimaet</p>
            </div>
            <div className="bg-[url(http://localhost:3000/assets/images/banners/banner_image3.jpg)] bg-cover bg-center px-8 py-4 flex flex-col gap-2">
                <h3 className="text-3xl font-normal">Donationer i år</h3>
                <p>Sammen med dig har vi i år indsamlet:</p>
                <h3 className="text-lightgreen text-right text-4xl">112.452,75 kr</h3>
                <p className="font-light text-xs">Tak fordi du handler brugt, med omtanke for jorden</p>
            </div>
        </section>
    )
}