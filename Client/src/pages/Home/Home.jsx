

export default function Home({children}) {

    return (
        <section className="home">
            <div className="home-sub home-content">
                <div className="variant-cont">
                    <div className="variant">
                        <p>Following</p>
                    </div>
                </div>
               {children}
            </div>
        </section>
    )
}

